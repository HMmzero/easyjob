package com.easyjob.service.impl;

import com.easyjob.entity.constants.Constants;
import com.easyjob.entity.dto.ImportErrorItem;
import com.easyjob.entity.dto.SessionUserAdminDto;
import com.easyjob.entity.enums.*;
import com.easyjob.entity.po.Category;
import com.easyjob.entity.po.QuestionInfo;
import com.easyjob.entity.query.QuestionInfoQuery;
import com.easyjob.entity.query.SimplePage;
import com.easyjob.entity.vo.PaginationResultVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.mappers.ACommonMapper;
import com.easyjob.mappers.QuestionInfoMapper;
import com.easyjob.service.CategoryService;
import com.easyjob.service.QuestionInfoService;
import com.easyjob.utils.ExcelUtils;
import com.easyjob.utils.StringTools;
import com.easyjob.utils.VerifyUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;


/**
 * 问题 业务接口实现
 */
@Service("questionInfoService")
public class QuestionInfoServiceImpl implements QuestionInfoService {

    @Resource
    private QuestionInfoMapper<QuestionInfo, QuestionInfoQuery> questionInfoMapper;

    @Resource
    private CategoryService categoryService;

    @Resource
    private ACommonMapper aCommonMapper;

    /**
     * 根据条件查询列表
     */
    @Override
    public List<QuestionInfo> findListByParam(QuestionInfoQuery param) {
        return this.questionInfoMapper.selectList(param);
    }

    /**
     * 根据条件查询列表
     */
    @Override
    public Integer findCountByParam(QuestionInfoQuery param) {
        return this.questionInfoMapper.selectCount(param);
    }

    /**
     * 分页查询方法
     */
    @Override
    public PaginationResultVO<QuestionInfo> findListByPage(QuestionInfoQuery param) {
        int count = this.findCountByParam(param);
        int pageSize = param.getPageSize() == null ? PageSize.SIZE15.getSize() : param.getPageSize();

        SimplePage page = new SimplePage(param.getPageNo(), count, pageSize);
        param.setSimplePage(page);
        List<QuestionInfo> list = this.findListByParam(param);
        PaginationResultVO<QuestionInfo> result = new PaginationResultVO(count, page.getPageSize(), page.getPageNo(), page.getPageTotal(), list);
        return result;
    }

    /**
     * 新增
     */
    @Override
    public Integer add(QuestionInfo bean) {
        return this.questionInfoMapper.insert(bean);
    }

    /**
     * 批量新增
     */
    @Override
    public Integer addBatch(List<QuestionInfo> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.questionInfoMapper.insertBatch(listBean);
    }

    /**
     * 批量新增或者修改
     */
    @Override
    public Integer addOrUpdateBatch(List<QuestionInfo> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.questionInfoMapper.insertOrUpdateBatch(listBean);
    }

    /**
     * 多条件更新
     */
    @Override
    public Integer updateByParam(QuestionInfo bean, QuestionInfoQuery param) {
        StringTools.checkParam(param);
        return this.questionInfoMapper.updateByParam(bean, param);
    }

    /**
     * 多条件删除
     */
    @Override
    public Integer deleteByParam(QuestionInfoQuery param) {
        StringTools.checkParam(param);
        return this.questionInfoMapper.deleteByParam(param);
    }

    /**
     * 根据QuestionId获取对象
     */
    @Override
    public QuestionInfo getQuestionInfoByQuestionId(Integer questionId) {
        return this.questionInfoMapper.selectByQuestionId(questionId);
    }

    /**
     * 根据QuestionId修改
     */
    @Override
    public Integer updateQuestionInfoByQuestionId(QuestionInfo bean, Integer questionId) {
        return this.questionInfoMapper.updateByQuestionId(bean, questionId);
    }

    /**
     * 根据QuestionId删除
     */
    @Override
    public Integer deleteQuestionInfoByQuestionId(Integer questionId) {
        return this.questionInfoMapper.deleteByQuestionId(questionId);
    }

    @Override
    public void saveQuestion(QuestionInfo questionInfo, Boolean isAdmin) {
        Category category = categoryService.getCategoryByCategoryId(questionInfo.getCategoryId());
        questionInfo.setCategoryName(category.getCategoryName());
        if (null == questionInfo.getQuestionId()) {
            questionInfo.setCreateTime(new Date());
            this.questionInfoMapper.insert(questionInfo);
        } else {
            QuestionInfo dbInfo = this.questionInfoMapper.selectByQuestionId(questionInfo.getQuestionId());
            if (!dbInfo.getCreateUserId().equals(questionInfo.getCreateUserId()) && !isAdmin) {
                throw new BusinessException(ResponseCodeEnum.CODE_600);
            }
            questionInfo.setCreateUserId(null);
            questionInfo.setCreateUserName(null);
            questionInfo.setCreateTime(null);
            this.questionInfoMapper.updateByQuestionId(questionInfo, questionInfo.getQuestionId());
        }
    }

    @Override
    public void delQuestionBatch(String questionIds, Integer userId) {
        String[] questionIdArray = questionIds.split(",");
        if (userId != null) {
            QuestionInfoQuery infoQuery = new QuestionInfoQuery();
            infoQuery.setQuestionIds(questionIdArray);
            List<QuestionInfo> questionInfoList = this.questionInfoMapper.selectList(infoQuery);
            List<QuestionInfo> currentUserDataList = questionInfoList.stream().filter(a -> !a.getCreateUserId().equals(String.valueOf(userId))).collect(Collectors.toList());
            if (!currentUserDataList.isEmpty()) {
                throw new BusinessException(ResponseCodeEnum.CODE_600);
            }
        }
        questionInfoMapper.deleteBatchByQuestionId(questionIdArray, PostStatusEnum.NO_POST.getStatus(), userId);
    }

    @Override
    public List<ImportErrorItem> importQuestion(MultipartFile file, SessionUserAdminDto userAdminDto) {
        List<Category> categoryList = categoryService.loadAllCategoryByType(CategoryTypeEnum.QUESTION.getType());
        Map<String, Category> categoryMap = categoryList.stream().collect(Collectors.toMap(Category::getCategoryName, Function.identity(), (data1, data2) -> data2));
        List<List<String>> dataList = ExcelUtils.readExcel(file, Constants.EXCEL_TITLE_QUESTION, 1);

        /**
         * 错误列
         */
        List<ImportErrorItem> errorList = new ArrayList<>();
        /**
         * 数据列
         */
        List<QuestionInfo> questionList = new ArrayList<>();

        Integer dataRowNum = 2;
        for (List<String> row : dataList) {
            if (errorList.size() > Constants.LENGTH_50) {
                throw new BusinessException("错误数据超过" + Constants.LENGTH_50 + "行，请认真检查数据后再导入");
            }
            dataRowNum++;
            List<String> errorItemList = new ArrayList<>();
            Integer index = 0;
            String title = row.get(index++);
            if (StringTools.isEmpty(title) || title.length() > Constants.LENGTH_150) {
                errorItemList.add("标题不能为空，且长度不能超过" + Constants.LENGTH_150);
            }
            String categoryName = row.get(index++);
            Category category = categoryMap.get(categoryName);
            if (category == null) {
                errorItemList.add("分类名称不存在");
            }
            String diffficultyLevel = row.get(index++);
            Integer diffficultyLevelInt = null;
            if (VerifyUtils.verify(VerifyRegexEnum.POSITIVE_INTEGER, diffficultyLevel)) {
                diffficultyLevelInt = Integer.parseInt(diffficultyLevel);
                if (diffficultyLevelInt > 5) {
                    errorItemList.add("难度只能是1到5的数字");
                }
            } else {
                errorItemList.add("难度必须是正整数");
            }

            String question = row.get(index++);
            String answerAnalysis = row.get(index++);
            if (StringTools.isEmpty(answerAnalysis)) {
                errorItemList.add("答案解析不能为空");
            }
            if (!errorItemList.isEmpty() || !errorList.isEmpty()) {
                ImportErrorItem errorItem = new ImportErrorItem();
                errorItem.setRowNum(dataRowNum);
                errorItem.setErrorItemList(errorItemList);
                errorList.add(errorItem);
                continue;
            }

            QuestionInfo questionInfo = new QuestionInfo();
            questionInfo.setTitle(title);
            questionInfo.setCategoryId(category.getCategoryId());
            questionInfo.setCategoryName(category.getCategoryName());
            questionInfo.setDifficultyLevel(diffficultyLevelInt);
            questionInfo.setQuestion(question);
            questionInfo.setAnswerAnalysis(answerAnalysis);
            questionInfo.setCreateTime(new Date());
            questionInfo.setStatus(PostStatusEnum.NO_POST.getStatus());
            questionInfo.setCreateUserId(String.valueOf(userAdminDto.getUserId()));
            questionInfo.setCreateUserName(userAdminDto.getUserName());
            questionList.add(questionInfo);
        }
        if (questionList.isEmpty()) {
            return errorList;
        }
        this.questionInfoMapper.insertBatch(questionList);
        return errorList;
    }

    @Override
    public QuestionInfo showDetailNext(QuestionInfoQuery query, Integer nextType, Integer currentId, Boolean updateReadCount) {
        if (nextType == null) {
            query.setQuestionId(currentId);
        } else {
            query.setNextType(nextType);
            query.setCurrentId(currentId);
        }
        QuestionInfo questionInfo = questionInfoMapper.showDetailNext(query);
        if (questionInfo == null && nextType == null) {
            throw new BusinessException("内容不存在");
        } else if (questionInfo == null && nextType == -1) {
            throw new BusinessException("已经是第一条了");
        } else if (questionInfo == null && nextType == 1) {
            throw new BusinessException("已经是最后一条了");
        }
        if (updateReadCount && questionInfo != null) {
            aCommonMapper.updateCount(Constants.TABLE_NAME_QUESTION_INFO, 1, null, currentId);
            questionInfo.setReadCount((questionInfo.getReadCount() == null ? 0 : questionInfo.getReadCount()) + 1);
        }
        return questionInfo;
    }
}