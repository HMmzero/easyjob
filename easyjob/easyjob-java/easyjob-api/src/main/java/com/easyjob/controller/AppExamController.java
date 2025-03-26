package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.dto.AppExamPostDto;
import com.easyjob.entity.dto.AppUserLoginDto;
import com.easyjob.entity.enums.AppExamStatusEnum;
import com.easyjob.entity.enums.ResponseCodeEnum;
import com.easyjob.entity.po.AppExam;
import com.easyjob.entity.query.AppExamQuery;
import com.easyjob.entity.query.AppExamQuestionQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.entity.vo.app.AppExamVO;
import com.easyjob.entity.vo.app.ExamQuestionVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.service.AppExamService;
import com.easyjob.utils.CopyTools;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @Description 用户在线考试
 * @Author 程序员老罗
 * @Date 2023/10/14 20:30
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("appExamController")
@RequestMapping("/appExam")
public class AppExamController extends ABaseController {

    @Resource
    private AppExamService appExamService;

    /**
     * 根据条件分页查询
     */
    @RequestMapping("/loadNoFinishedExam")
    @GlobalInterceptor
    public ResponseVO loadNoFinishedExam(@RequestHeader(value = "token", required = false) String token) {
        AppUserLoginDto appDto = getAppUserLoginfoFromToken(token);
        if (appDto == null) {
            return getSuccessResponseVO(null);
        }
        AppExamQuery appExamQuery = new AppExamQuery();
        appExamQuery.setStatus(AppExamStatusEnum.INIT.getStatus());
        appExamQuery.setUserId(appDto.getUserId());
        appExamQuery.setOrderBy("exam_id desc");
        List<AppExam> appExamList = appExamService.findListByParam(appExamQuery);
        return getSuccessResponseVO(appExamList);
    }


    @RequestMapping("/createExam")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO createExam(@RequestHeader(value = "token", required = false) String token,
                                 @VerifyParam(required = true) String categoryIds) {
        AppUserLoginDto appDto = getAppUserLoginfoFromToken(token);
        return getSuccessResponseVO(appExamService.createExam(categoryIds, appDto));
    }

    @RequestMapping("/getExamQuestion")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO getExamQuestion(@RequestHeader(value = "token", required = false) String token,
                                      @VerifyParam(required = true) Integer examId) {
        AppUserLoginDto appDto = getAppUserLoginfoFromToken(token);
        AppExam appExam = checkAppExam(appDto, examId);

        Boolean showAnswer = false;

        if (AppExamStatusEnum.FINISHED.getStatus().equals(appExam.getStatus())) {
            showAnswer = true;
        }

        AppExamVO appExamVO = CopyTools.copy(appExam, AppExamVO.class);

        AppExamQuestionQuery appExamQuestionQuery = new AppExamQuestionQuery();
        appExamQuestionQuery.setExamId(examId);
        appExamQuestionQuery.setUserId(appExam.getUserId());
        appExamQuestionQuery.setShowUserAnswer(showAnswer);
        List<ExamQuestionVO> examQuestionVOList = appExamService.getAppExamQuestion(appExamQuestionQuery);

        for (ExamQuestionVO item : examQuestionVOList) {
            item.setQuestion(resetContentImg(item.getQuestion()));
            item.setAnswerAnalysis(resetContentImg(item.getAnswerAnalysis()));
        }
        appExamVO.setExamQuestionList(examQuestionVOList);
        return getSuccessResponseVO(appExamVO);
    }

    private AppExam checkAppExam(AppUserLoginDto appDto, Integer examId) {
        AppExam appExam = appExamService.getAppExamByExamId(examId);
        if (null == appExam || !appExam.getUserId().equals(appDto.getUserId())) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }
        return appExam;
    }


    @RequestMapping("/startExam")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO startExam(@RequestHeader(value = "token", required = false) String token,
                                @VerifyParam(required = true) Integer examId) {
        AppUserLoginDto appDto = getAppUserLoginfoFromToken(token);
        checkAppExam(appDto, examId);
        Date curDate = new Date();
        AppExam updateInfo = new AppExam();
        updateInfo.setStartTime(curDate);
        AppExamQuery appExamQuery = new AppExamQuery();
        appExamQuery.setExamId(examId);
        appExamQuery.setUserId(appDto.getUserId());
        appExamService.updateByParam(updateInfo, appExamQuery);
        return getSuccessResponseVO(curDate);
    }

    @RequestMapping("/postExam")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO postExam(@RequestHeader(value = "token", required = false) String token,
                               @RequestBody AppExamPostDto appExamPostDto) {
        AppUserLoginDto appDto = getAppUserLoginfoFromToken(token);
        AppExam appExam = appExamService.postExam(appDto, appExamPostDto);
        return getSuccessResponseVO(appExam);
    }

    @RequestMapping("/delExam")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO delExam(@RequestHeader(value = "token", required = false) String token,
                              @VerifyParam(required = true) Integer examId) {
        AppUserLoginDto appDto = getAppUserLoginfoFromToken(token);
        checkAppExam(appDto, examId);
        appExamService.delExam4Api(appDto.getUserId(), examId);
        return getSuccessResponseVO(null);
    }
}