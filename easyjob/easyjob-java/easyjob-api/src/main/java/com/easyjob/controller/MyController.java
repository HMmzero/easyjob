package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.config.AppConfig;
import com.easyjob.entity.constants.Constants;
import com.easyjob.entity.dto.AppUserLoginDto;
import com.easyjob.entity.enums.*;
import com.easyjob.entity.po.*;
import com.easyjob.entity.query.*;
import com.easyjob.entity.vo.PaginationResultVO;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.entity.vo.app.AppUserInfoVO;
import com.easyjob.entity.vo.app.ExamQuestionVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.service.*;
import com.easyjob.utils.CopyTools;
import com.easyjob.utils.ScaleFilter;
import com.easyjob.utils.StringTools;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @Description 个人中心
 * @Author 程序员老罗
 * @Date 2023/10/15 16:28
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("myController")
@RequestMapping("/my")
public class MyController extends ABaseController {

    @Resource
    private AppUserCollectService appUserCollectService;

    @Resource
    private QuestionInfoService questionInfoService;

    @Resource
    private AppExamService appExamService;

    @Resource
    private AppExamQuestionService appExamQuestionService;

    @Resource
    private ShareInfoService shareInfoService;

    @Resource
    private AppConfig appConfig;

    @Resource
    private AppUserInfoService appUserInfoService;

    @Resource
    private AppFeedbackService appFeedbackService;

    @RequestMapping("/getUserInfo")
    @GlobalInterceptor
    public ResponseVO getUserInfo(@RequestHeader(value = "token", required = false) String token) {
        AppUserLoginDto userLoginDto = getAppUserLoginfoFromToken(token);
        if (null == userLoginDto) {
            return getSuccessResponseVO(null);
        }
        AppUserInfo appUserInfo = appUserInfoService.getAppUserInfoByUserId(userLoginDto.getUserId());
        if (appUserInfo == null) {
            return getSuccessResponseVO(null);
        }
        return getSuccessResponseVO(CopyTools.copy(appUserInfo, AppUserInfoVO.class));
    }

    @RequestMapping("/loadCollect")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO loadCollect(@RequestHeader(value = "token", required = false) String token,
                                  @VerifyParam(required = true) Integer collectType) {
        CollectTypeEnum collectTypeEnum = CollectTypeEnum.getByType(collectType);
        if (collectTypeEnum == null) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }
        AppUserCollectQuery query = new AppUserCollectQuery();
        query.setCollectType(collectType);
        AppUserLoginDto userLoginDto = getAppUserLoginfoFromToken(token);
        query.setUserId(userLoginDto.getUserId());
        query.setOrderBy("collect_id desc");
        PaginationResultVO resultVO = appUserCollectService.findListByPage(query);
        List<AppUserCollect> appUserCollectList = resultVO.getList();
        List<String> objectIdList = appUserCollectList.stream().map(item -> item.getObjectId()).collect(Collectors.toList());
        if (objectIdList.isEmpty()) {
            return getSuccessResponseVO(resultVO);
        }
        Map<Integer, AppUserCollect> objectIdMap = appUserCollectList.stream()
                .collect(Collectors.toMap(item -> Integer.parseInt(item.getObjectId()), Function.identity(), (data1, data2) -> data2));

        switch (collectTypeEnum) {
            case SHARE:
                ShareInfoQuery shareInfoQuery = new ShareInfoQuery();
                shareInfoQuery.setShareIds(objectIdList.toArray(new String[objectIdList.size()]));
                shareInfoQuery.setOrderBy("field(share_id," + StringUtils.join(objectIdList, ",") + ")");
                List<ShareInfo> shareInfoList = shareInfoService.findListByParam(shareInfoQuery);
                for (ShareInfo item : shareInfoList) {
                    AppUserCollect collect = objectIdMap.get(item.getShareId());
                    item.setCollectId(collect.getCollectId());
                }
                resultVO.setList(shareInfoList);
                break;
            case QUESTION:
                QuestionInfoQuery questionInfoQuery = new QuestionInfoQuery();
                questionInfoQuery.setQuestionIds(objectIdList.toArray(new String[objectIdList.size()]));
                questionInfoQuery.setOrderBy("field(question_id," + StringUtils.join(objectIdList, ",") + ")");
                List<QuestionInfo> questionInfoList = questionInfoService.findListByParam(questionInfoQuery);
                for (QuestionInfo item : questionInfoList) {
                    AppUserCollect collect = objectIdMap.get(item.getQuestionId());
                    item.setCollectId(collect.getCollectId());
                }
                resultVO.setList(questionInfoList);
                break;
            case EXAM:
                AppExamQuestionQuery appExamQuestionQuery = new AppExamQuestionQuery();
                appExamQuestionQuery.setUserId(userLoginDto.getUserId());
                appExamQuestionQuery.setShowUserAnswer(true);
                appExamQuestionQuery.setQuestionIds(objectIdList);
                List<ExamQuestionVO> examQuestionList = appExamService.getAppExamQuestion(appExamQuestionQuery);
                resultVO.setList(examQuestionList);
        }
        return getSuccessResponseVO(resultVO);
    }


    @RequestMapping("/getCollectNext")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO getCollectNext(@RequestHeader(value = "token", required = false) String token,
                                     @VerifyParam(required = true) Integer currentId,
                                     @VerifyParam(required = true) Integer collectType,
                                     Integer nextType) {
        AppUserLoginDto userLoginDto = getAppUserLoginfoFromToken(token);
        CollectTypeEnum collectTypeEnum = CollectTypeEnum.getByType(collectType);
        if (collectTypeEnum == null) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }

        AppUserCollectQuery query = new AppUserCollectQuery();
        query.setUserId(userLoginDto.getUserId());
        query.setCollectType(collectType);
        AppUserCollect appUserCollect = appUserCollectService.showDetailNext(query, nextType, currentId);
        Integer objectId = Integer.parseInt(appUserCollect.getObjectId());
        switch (collectTypeEnum) {
            case SHARE:
                ShareInfo shareInfo = shareInfoService.getShareInfoByShareId(objectId);
                shareInfo.setCollectId(appUserCollect.getCollectId());
                return getSuccessResponseVO(shareInfo);
            case QUESTION:
                QuestionInfo questionInfo = questionInfoService.getQuestionInfoByQuestionId(objectId);
                questionInfo.setCollectId(appUserCollect.getCollectId());
                return getSuccessResponseVO(questionInfo);
        }
        return getSuccessResponseVO(null);
    }


    @RequestMapping("/loadMyExam")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO loadMyExam(@RequestHeader(value = "token", required = false) String token,
                                 Integer pageNo) {

        AppUserLoginDto userLoginDto = getAppUserLoginfoFromToken(token);
        AppExamQuery appExamQuery = new AppExamQuery();
        appExamQuery.setPageNo(pageNo);
        appExamQuery.setUserId(userLoginDto.getUserId());
        appExamQuery.setOrderBy("exam_id desc");
        PaginationResultVO resultVO = appExamService.findListByPage(appExamQuery);
        return getSuccessResponseVO(resultVO);
    }

    @RequestMapping("/loadWrongQuestion")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO loadWrongQuestion(@RequestHeader(value = "token", required = false) String token,
                                        Integer pageNo) {

        AppUserLoginDto userLoginDto = getAppUserLoginfoFromToken(token);

        AppExamQuestionQuery appExamQuestionQuery = new AppExamQuestionQuery();
        appExamQuestionQuery.setPageNo(pageNo);
        appExamQuestionQuery.setOrderBy("exam_id desc");
        appExamQuestionQuery.setUserId(userLoginDto.getUserId());
        appExamQuestionQuery.setAnswerResult(AnswerResultEnum.WRONG.getResult());
        PaginationResultVO resultVO = appExamQuestionService.findListByPage(appExamQuestionQuery);

        List<AppExamQuestion> appExamQuestionList = resultVO.getList();

        List<String> questionIds = appExamQuestionList.stream().map(item -> item.getQuestionId().toString()).collect(Collectors.toList());
        if (questionIds.isEmpty()) {
            return getSuccessResponseVO(resultVO);
        }
        appExamQuestionQuery = new AppExamQuestionQuery();
        appExamQuestionQuery.setShowUserAnswer(true);
        appExamQuestionQuery.setQuestionIds(questionIds);
        appExamQuestionQuery.setAnswerResult(AnswerResultEnum.WRONG.getResult());
        List<ExamQuestionVO> examQuestionVOList = appExamService.getAppExamQuestion(appExamQuestionQuery);

        for (ExamQuestionVO item : examQuestionVOList) {
            item.setQuestion(resetContentImg(item.getQuestionAnswer()));
            item.setAnswerAnalysis(resetContentImg(item.getAnswerAnalysis()));
        }
        resultVO.setList(examQuestionVOList);
        return getSuccessResponseVO(resultVO);
    }

    @RequestMapping("/uploadAvatar")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO uploadAvatar(@RequestHeader(value = "token", required = false) String token,
                                   MultipartFile file) throws IOException {
        AppUserLoginDto userLoginDto = getAppUserLoginfoFromToken(token);
        String folderName = appConfig.getProjectFolder() + Constants.FOLDER_AVATAR;
        File folder = new File(folderName);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        String avatarName = userLoginDto.getUserId() + StringTools.getFileSuffix(file.getOriginalFilename());
        File avatarFileName = new File(folder.getPath() + "/" + avatarName);

        file.transferTo(avatarFileName);

        ScaleFilter.createThumbnail(avatarFileName, Constants.LENGTH_70, Constants.LENGTH_70, avatarFileName);

        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setAvatar(Constants.FOLDER_AVATAR + avatarName);
        appUserInfoService.updateAppUserInfoByUserId(appUserInfo, userLoginDto.getUserId());
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/updateUserInfo")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO updateUserInfo(@RequestHeader(value = "token", required = false) String token,
                                     @VerifyParam(required = true) Integer sex,
                                     @VerifyParam(regex = VerifyRegexEnum.PASSWORD) String passwrd) {
        AppUserLoginDto userLoginDto = getAppUserLoginfoFromToken(token);

        AppUserInfo updateInfo = new AppUserInfo();
        updateInfo.setSex(sex);
        if (!StringTools.isEmpty(passwrd)) {
            updateInfo.setPassword(StringTools.encodeByMD5(passwrd));
        }
        appUserInfoService.updateAppUserInfoByUserId(updateInfo, userLoginDto.getUserId());
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/loadFeedback")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO loadFeedback(@RequestHeader(value = "token", required = false) String token,
                                   Integer pageNo) {

        AppFeedbackQuery appFeedbackQuery = new AppFeedbackQuery();
        appFeedbackQuery.setOrderBy("feedback_id desc");
        appFeedbackQuery.setUserId(getAppUserLoginfoFromToken(token).getUserId());
        appFeedbackQuery.setPageNo(pageNo);
        appFeedbackQuery.setpFeedbackId(0);
        PaginationResultVO resultVO = appFeedbackService.findListByPage(appFeedbackQuery);
        return getSuccessResponseVO(resultVO);
    }

    @RequestMapping("/loadFeedbackReply")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO loadFeedbackReply(@RequestHeader(value = "token", required = false) String token,
                                        @VerifyParam(required = true) Integer pFeedbackId) {
        AppFeedbackQuery appFeedbackQuery = new AppFeedbackQuery();
        appFeedbackQuery.setOrderBy("feedback_id asc");
        appFeedbackQuery.setUserId(getAppUserLoginfoFromToken(token).getUserId());
        appFeedbackQuery.setpFeedbackId(pFeedbackId);
        List<AppFeedback> feedbackList = appFeedbackService.findListByParam(appFeedbackQuery);
        return getSuccessResponseVO(feedbackList);
    }

    @RequestMapping("/sendFeedback")
    @GlobalInterceptor(checkLogin = true, frequencyType = RequestFrequencyTypeEnum.DAY, requestFrequencyThreshold = 10)
    public ResponseVO sendFeedback(@RequestHeader(value = "token", required = false) String token,
                                   @VerifyParam(required = true, max = 500) String content,
                                   @VerifyParam(required = true) Integer pFeedbackId) {

        AppUserLoginDto appUserLoginDto = getAppUserLoginfoFromToken(token);
        AppFeedback appFeedback = new AppFeedback();
        appFeedback.setUserId(appUserLoginDto.getUserId());
        appFeedback.setNickName(appUserLoginDto.getNickName());
        appFeedback.setContent(content);
        appFeedback.setpFeedbackId(pFeedbackId);
        appFeedbackService.saveFeedBack4Client(appFeedback);
        return getSuccessResponseVO(appFeedback);
    }
}