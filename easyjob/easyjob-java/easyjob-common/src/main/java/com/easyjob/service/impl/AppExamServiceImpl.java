package com.easyjob.service.impl;

import com.easyjob.entity.dto.AppExamPostDto;
import com.easyjob.entity.dto.AppUserLoginDto;
import com.easyjob.entity.enums.*;
import com.easyjob.entity.po.*;
import com.easyjob.entity.query.*;
import com.easyjob.entity.vo.PaginationResultVO;
import com.easyjob.entity.vo.app.ExamQuestionVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.mappers.*;
import com.easyjob.service.AppExamService;
import com.easyjob.utils.CopyTools;
import com.easyjob.utils.StringTools;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;


/**
 * 用户在线考试 业务接口实现
 */
@Service("appExamService")
public class AppExamServiceImpl implements AppExamService {

    @Resource
    private AppExamMapper<AppExam, AppExamQuery> appExamMapper;

    @Resource
    private AppExamQuestionMapper<AppExamQuestion, AppExamQuestionQuery> appExamQuestionMapper;

    @Resource
    private ExamQuestionMapper<ExamQuestion, ExamQuestionQuery> examQuestionMapper;

    @Resource
    private ExamQuestionItemMapper<ExamQuestionItem, ExamQuestionItemQuery> examQuestionItemMapper;

    @Resource
    private AppUserCollectMapper<AppUserCollect, AppUserCollectQuery> appUserCollectMapper;

    /**
     * 根据条件查询列表
     */
    @Override
    public List<AppExam> findListByParam(AppExamQuery param) {
        return this.appExamMapper.selectList(param);
    }

    /**
     * 根据条件查询列表
     */
    @Override
    public Integer findCountByParam(AppExamQuery param) {
        return this.appExamMapper.selectCount(param);
    }

    /**
     * 分页查询方法
     */
    @Override
    public PaginationResultVO<AppExam> findListByPage(AppExamQuery param) {
        int count = this.findCountByParam(param);
        int pageSize = param.getPageSize() == null ? PageSize.SIZE15.getSize() : param.getPageSize();

        SimplePage page = new SimplePage(param.getPageNo(), count, pageSize);
        param.setSimplePage(page);
        List<AppExam> list = this.findListByParam(param);
        PaginationResultVO<AppExam> result = new PaginationResultVO(count, page.getPageSize(), page.getPageNo(), page.getPageTotal(), list);
        return result;
    }

    /**
     * 新增
     */
    @Override
    public Integer add(AppExam bean) {
        return this.appExamMapper.insert(bean);
    }

    /**
     * 批量新增
     */
    @Override
    public Integer addBatch(List<AppExam> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.appExamMapper.insertBatch(listBean);
    }

    /**
     * 批量新增或者修改
     */
    @Override
    public Integer addOrUpdateBatch(List<AppExam> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.appExamMapper.insertOrUpdateBatch(listBean);
    }

    /**
     * 多条件更新
     */
    @Override
    public Integer updateByParam(AppExam bean, AppExamQuery param) {
        StringTools.checkParam(param);
        return this.appExamMapper.updateByParam(bean, param);
    }

    /**
     * 多条件删除
     */
    @Override
    public Integer deleteByParam(AppExamQuery param) {
        StringTools.checkParam(param);
        return this.appExamMapper.deleteByParam(param);
    }

    /**
     * 根据ExamId获取对象
     */
    @Override
    public AppExam getAppExamByExamId(Integer examId) {
        return this.appExamMapper.selectByExamId(examId);
    }

    /**
     * 根据ExamId修改
     */
    @Override
    public Integer updateAppExamByExamId(AppExam bean, Integer examId) {
        return this.appExamMapper.updateByExamId(bean, examId);
    }

    /**
     * 根据ExamId删除
     */
    @Override
    public Integer deleteAppExamByExamId(Integer examId) {
        return this.appExamMapper.deleteByExamId(examId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public AppExam createExam(String categoryIds, AppUserLoginDto userLoginDto) {
        AppExamQuestionQuery appExamQuestionQuery = new AppExamQuestionQuery();
        appExamQuestionQuery.setUserId(userLoginDto.getUserId());
        appExamQuestionQuery.setAnswerResult(AnswerResultEnum.RIGHT.getResult());
        List<AppExamQuestion> dbAppExamQuestionList = appExamQuestionMapper.selectList(appExamQuestionQuery);

        List<Integer> excludeQuestionIdList = dbAppExamQuestionList.stream().map(item -> item.getQuestionId()).collect(Collectors.toList());

        ExamQuestionQuery examQuestionQuery = new ExamQuestionQuery();
        examQuestionQuery.setCategoryIds(categoryIds.split(","));
        examQuestionQuery.setExcludeQuestionIdList(excludeQuestionIdList);
        examQuestionQuery.setOrderBy("rand()");
        examQuestionQuery.setStatus(PostStatusEnum.POST.getStatus());
        examQuestionQuery.setPageNo(1);
        examQuestionQuery.setSimplePage(new SimplePage(0, PageSize.SIZE50.getSize()));
        List<ExamQuestion> examQuestionList = examQuestionMapper.selectList(examQuestionQuery);
        if (examQuestionList.isEmpty()) {
            throw new BusinessException("该分类下木有题目了");
        }

        /**
         * 记录考试
         */
        AppExam appExam = new AppExam();
        appExam.setUserId(userLoginDto.getUserId());
        appExam.setNickName(userLoginDto.getNickName());
        appExam.setCreateTime(new Date());
        appExam.setStatus(AppExamStatusEnum.INIT.getStatus());
        appExamMapper.insert(appExam);


        /**
         * 记录考试的题目
         */

        List<AppExamQuestion> appExamQuestionList = new ArrayList<>();
        for (ExamQuestion examQuestion : examQuestionList) {
            AppExamQuestion appExamQuestion = new AppExamQuestion();
            appExamQuestion.setExamId(appExam.getExamId());
            appExamQuestion.setQuestionId(examQuestion.getQuestionId());
            appExamQuestion.setUserId(userLoginDto.getUserId());
            appExamQuestion.setAnswerResult(AnswerResultEnum.INIT.getResult());
            appExamQuestionList.add(appExamQuestion);
        }
        if (!appExamQuestionList.isEmpty()) {
            appExamQuestionMapper.insertBatch(appExamQuestionList);
        }
        return appExam;
    }

    @Override
    public List<ExamQuestionVO> getAppExamQuestion(AppExamQuestionQuery appExamQuestionQuery) {
        List<AppExamQuestion> appExamQuestionList = appExamQuestionMapper.selectList(appExamQuestionQuery);

        Map<Integer, AppExamQuestion> appExamQuestionMap = new HashMap<>();
        if (appExamQuestionQuery.getShowUserAnswer() != null && appExamQuestionQuery.getShowUserAnswer()) {
            appExamQuestionMap = appExamQuestionList.stream().
                    collect(Collectors.toMap(item -> item.getQuestionId(), Function.identity(), (data1, data2) -> data2));
        }

        /**
         * 考题问题ID
         */
        List<String> questionIdList = appExamQuestionList.stream().map(item -> item.getQuestionId().toString())
                .collect(Collectors.toList());

        /**
         * 查询题目
         */
        ExamQuestionQuery examQuestionQuery = new ExamQuestionQuery();
        examQuestionQuery.setQueryAnswer(appExamQuestionQuery.getShowUserAnswer());
        examQuestionQuery.setQuestionIds(questionIdList.toArray(new String[questionIdList.size()]));
        List<ExamQuestion> examQuestionList = examQuestionMapper.selectList(examQuestionQuery);

        List<ExamQuestionVO> examQuestionVOList = CopyTools.copyList(examQuestionList, ExamQuestionVO.class);

        /**
         * 查询考题选项
         */
        ExamQuestionItemQuery examQuestionItemQuery = new ExamQuestionItemQuery();
        examQuestionItemQuery.setQuestionIdList(questionIdList);
        List<ExamQuestionItem> examQuestionItemList = examQuestionItemMapper.selectList(examQuestionItemQuery);

        Map<Integer, List<ExamQuestionItem>> temExamItemMap = examQuestionItemList.stream()
                .collect(Collectors.groupingBy(item -> item.getQuestionId()));

        /**
         * 查询用户是否收藏
         */
        AppUserCollectQuery appUserCollectQuery = new AppUserCollectQuery();
        appUserCollectQuery.setObjectIdList(questionIdList);
        appUserCollectQuery.setUserId(appExamQuestionQuery.getUserId());
        appUserCollectQuery.setCollectType(CollectTypeEnum.EXAM.getType());
        List<AppUserCollect> appUserCollectList = appUserCollectMapper.selectList(appUserCollectQuery);

        Map<String, AppUserCollect> appUserCollectMap = appUserCollectList.stream().collect
                (Collectors.toMap(item -> item.getObjectId(), Function.identity(), (data1, data2) -> data2));


        for (ExamQuestionVO item : examQuestionVOList) {
            /**
             * 记录收藏
             */
            if (appUserCollectMap.get(String.valueOf(item.getQuestionId())) != null) {
                item.setHaveCollect(true);
            } else {
                item.setHaveCollect(false);
            }

            item.setExamId(appExamQuestionQuery.getExamId());

            //问题选项
            List<ExamQuestionItem> questionItemList = temExamItemMap.get(item.getQuestionId());

            item.setQuestionItemList(questionItemList);
            if (!appExamQuestionQuery.getShowUserAnswer()) {
                continue;
            }
            AppExamQuestion appExamQuestion = appExamQuestionMap.get(item.getQuestionId());
            if (appExamQuestion != null) {
                item.setAnswerResult(appExamQuestion.getAnswerResult());
                item.setUserAnswer(appExamQuestion.getUserAnswer());
            }
        }
        return examQuestionVOList;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public AppExam postExam(AppUserLoginDto appDto, AppExamPostDto appExamPostDto) {
        Date curDate = new Date();

        AppExam appExam = appExamMapper.selectByExamId(appExamPostDto.getExamId());
        if (null == appExam || !appExam.getUserId().equals(appDto.getUserId())) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }

        if (!appExam.getStatus().equals(AppExamStatusEnum.INIT.getStatus())) {
            throw new BusinessException("考试已经提交");
        }

        List<AppExamQuestion> appExamQuestionList = appExamPostDto.getAppExamQuestionList();
        if (appExamQuestionList.isEmpty()) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }

        /**
         * 查询考试的所有题目
         */
        AppExamQuestionQuery appExamQuestionQuery = new AppExamQuestionQuery();
        appExamQuestionQuery.setExamId(appExamPostDto.getExamId());
        List<AppExamQuestion> dbAppExamQuestionList = appExamQuestionMapper.selectList(appExamQuestionQuery);
        List<String> dbQuestionIdList = dbAppExamQuestionList.stream().map(item -> item.getQuestionId().toString()).collect(Collectors.toList());

        /**
         * 查询题库问题
         */
        ExamQuestionQuery examQuestionQuery = new ExamQuestionQuery();
        examQuestionQuery.setQueryAnswer(true);
        examQuestionQuery.setQuestionIds(dbQuestionIdList.toArray(new String[dbQuestionIdList.size()]));
        List<ExamQuestion> examQuestionList = examQuestionMapper.selectList(examQuestionQuery);
        Map<Integer, ExamQuestion> tempExamItemMap = examQuestionList.stream()
                .collect(Collectors.toMap(item -> item.getQuestionId(), Function.identity(), (data1, data2) -> data2));

        for (AppExamQuestion item : appExamQuestionList) {
            ExamQuestion examQuestion = tempExamItemMap.get(item.getQuestionId());
            if (examQuestion == null) {
                throw new BusinessException(ResponseCodeEnum.CODE_600);
            }
            item.setExamId(appExam.getExamId());
            item.setUserId(appDto.getUserId());
            if (examQuestion.getQuestionAnswer().equals(item.getUserAnswer())) {
                item.setAnswerResult(AnswerResultEnum.RIGHT.getResult());
            } else {
                item.setAnswerResult(AnswerResultEnum.WRONG.getResult());
            }
        }
        appExamQuestionMapper.insertOrUpdateBatch(appExamQuestionList);

        AppExam updateExam = new AppExam();
        updateExam.setStatus(AppExamStatusEnum.FINISHED.getStatus());
        updateExam.setEndTime(curDate);
        updateExam.setRemark(appExamPostDto.getRemark());

        AppExamQuery appExamQuery = new AppExamQuery();
        appExamQuery.setExamId(appExamPostDto.getExamId());
        appExamQuery.setUserId(appDto.getUserId());
        appExamQuery.setStatus(AppExamStatusEnum.INIT.getStatus());
        Integer count = appExamMapper.updateByParam(updateExam, appExamQuery);
        if (count == 0) {
            throw new BusinessException("考试提交失败");
        }
        return appExam;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delExam4Api(String userId, Integer examId) {
        appExamMapper.deleteByExamId(examId);

        AppExamQuestionQuery params = new AppExamQuestionQuery();
        params.setExamId(examId);
        params.setUserId(userId);
        appExamQuestionMapper.deleteByParam(params);
    }
}