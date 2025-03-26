package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.enums.PostStatusEnum;
import com.easyjob.entity.enums.RequestFrequencyTypeEnum;
import com.easyjob.entity.enums.ResponseCodeEnum;
import com.easyjob.entity.enums.SearchTypeEnum;
import com.easyjob.entity.po.ExamQuestion;
import com.easyjob.entity.po.ExamQuestionItem;
import com.easyjob.entity.po.QuestionInfo;
import com.easyjob.entity.po.ShareInfo;
import com.easyjob.entity.query.ExamQuestionItemQuery;
import com.easyjob.entity.query.ExamQuestionQuery;
import com.easyjob.entity.query.QuestionInfoQuery;
import com.easyjob.entity.query.ShareInfoQuery;
import com.easyjob.entity.vo.PaginationResultVO;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.service.ExamQuestionItemService;
import com.easyjob.service.ExamQuestionService;
import com.easyjob.service.QuestionInfoService;
import com.easyjob.service.ShareInfoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @Description 搜索
 * @Author 程序员老罗
 * @Date 2023/9/29 20:55
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("searchController")
@RequestMapping("/search")
public class SearchController extends ABaseController {

    @Resource
    private QuestionInfoService questionInfoService;

    @Resource
    private ExamQuestionService examQuestionService;

    @Resource
    private ExamQuestionItemService examQuestionItemService;

    @Resource
    private ShareInfoService shareInfoService;

    @RequestMapping("/search")
    @GlobalInterceptor(frequencyType = RequestFrequencyTypeEnum.MINUTE, requestFrequencyThreshold = 20)
    public ResponseVO search(@VerifyParam(required = true, min = 3) String keyword,
                             @VerifyParam(required = true) Integer type,
                             Integer pageNo) {
        SearchTypeEnum searchTypeEnum = SearchTypeEnum.getByType(type);
        if (null == searchTypeEnum) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }

        switch (searchTypeEnum) {
            case QUESTION:
                QuestionInfoQuery query = new QuestionInfoQuery();
                query.setPageNo(pageNo);
                query.setTitleFuzzy(keyword);
                query.setOrderBy("question_id desc");
                query.setQueryTextContent(false);
                query.setStatus(PostStatusEnum.POST.getStatus());
                PaginationResultVO<QuestionInfo> questionInfoVo = questionInfoService.findListByPage(query);
                for (QuestionInfo item : questionInfoVo.getList()) {
                    item.setQuestion(resetContentImg(item.getQuestion()));
                    item.setAnswerAnalysis(resetContentImg(item.getAnswerAnalysis()));
                }
                return getSuccessResponseVO(questionInfoVo);
            case EXAM_QUESTION:
                ExamQuestionQuery examQuestionQuery = new ExamQuestionQuery();
                examQuestionQuery.setPageNo(pageNo);
                examQuestionQuery.setTitleFuzzy(keyword);
                examQuestionQuery.setOrderBy("question_id desc");
                examQuestionQuery.setStatus(PostStatusEnum.POST.getStatus());
                examQuestionQuery.setQueryAnswer(true);
                examQuestionQuery.setQueryQuestionItem(true);
                PaginationResultVO<ExamQuestion> examQuestionVo = examQuestionService.findListByPage(examQuestionQuery);

                //获取当前页的所有问题的问题选项
                List<String> questionIdList = examQuestionVo.getList().stream().map(item -> item.getQuestionId().toString()).collect(Collectors.toList());
                ExamQuestionItemQuery itemQuery = new ExamQuestionItemQuery();
                itemQuery.setQuestionIdList(questionIdList);
                List<ExamQuestionItem> examQuestionItemList = examQuestionItemService.findListByParam(itemQuery);
                Map<Integer, List<ExamQuestionItem>> tempExamItemMap = examQuestionItemList.stream()
                        .collect(Collectors.groupingBy(item -> item.getQuestionId()));
                for (ExamQuestion item : examQuestionVo.getList()) {
                    item.setQuestion(resetContentImg(item.getQuestion()));
                    item.setAnswerAnalysis(resetContentImg(item.getAnswerAnalysis()));
                    item.setQuestionItemList(tempExamItemMap.get(item.getQuestionId()));
                }
                return getSuccessResponseVO(examQuestionVo);
            case SHARE:
                ShareInfoQuery shareInfoQuery = new ShareInfoQuery();
                shareInfoQuery.setTitleFuzzy(keyword);
                shareInfoQuery.setPageNo(pageNo);
                shareInfoQuery.setOrderBy("share_id desc");
                shareInfoQuery.setStatus(PostStatusEnum.POST.getStatus());
                shareInfoQuery.setQueryTextContent(false);
                PaginationResultVO<ShareInfo> shareVo = shareInfoService.findListByPage(shareInfoQuery);
                for (ShareInfo item : shareVo.getList()) {
                    item.setContent(resetContentImg(item.getContent()));
                }
                return getSuccessResponseVO(shareVo);
            default:
                throw new BusinessException(ResponseCodeEnum.CODE_600);
        }
    }
}
