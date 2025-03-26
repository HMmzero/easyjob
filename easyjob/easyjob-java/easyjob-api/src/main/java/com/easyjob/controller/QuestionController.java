package com.easyjob.controller;

import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.dto.AppUserLoginDto;
import com.easyjob.entity.enums.CollectTypeEnum;
import com.easyjob.entity.enums.PostStatusEnum;
import com.easyjob.entity.po.AppUserCollect;
import com.easyjob.entity.po.QuestionInfo;
import com.easyjob.entity.query.QuestionInfoQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.AppUserCollectService;
import com.easyjob.service.QuestionInfoService;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Description 八股文
 * @Author 程序员老罗
 * @Date 2023/9/29 20:55
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("questionController")
@RequestMapping("/question")
public class QuestionController extends ABaseController {

    @Resource
    private QuestionInfoService questionInfoService;

    @Resource
    private AppUserCollectService appUserCollectService;

    @RequestMapping("/loadQuestion")
    public ResponseVO loadQuestion(Integer pageNo, Integer categoryId) {
        QuestionInfoQuery query = new QuestionInfoQuery();
        query.setPageNo(pageNo);
        query.setCategoryId(categoryId);
        query.setOrderBy("question_id desc");
        if (query.getCategoryId() != null && query.getCategoryId() == 0) {
            query.setCategoryId(null);
        }
        query.setQueryTextContent(false);
        query.setStatus(PostStatusEnum.POST.getStatus());
        return getSuccessResponseVO(questionInfoService.findListByPage(query));
    }

    @RequestMapping("/getQuestionDetailNext")
    public ResponseVO getQuestionDetailNext(@RequestHeader(value = "token", required = false) String token,
                                            @VerifyParam(required = true) Integer currentId, Integer nextType) {
        QuestionInfoQuery query = new QuestionInfoQuery();
        query.setStatus(PostStatusEnum.POST.getStatus());
        QuestionInfo questionInfo = questionInfoService.showDetailNext(query, nextType, currentId, true);

        AppUserLoginDto userLoginDto = getAppUserLoginfoFromToken(token);
        if (null != userLoginDto) {
            AppUserCollect appUserCollect = appUserCollectService.getAppUserCollectByUserIdAndObjectIdAndCollectType(userLoginDto.getUserId(), questionInfo.getQuestionId().toString(), CollectTypeEnum.QUESTION.getType());
            if (appUserCollect != null) {
                questionInfo.setHaveCollect(true);
            }
        }
        questionInfo.setQuestion(resetContentImg(questionInfo.getQuestion()));
        questionInfo.setAnswerAnalysis(resetContentImg(questionInfo.getAnswerAnalysis()));
        return getSuccessResponseVO(questionInfo);
    }
}
