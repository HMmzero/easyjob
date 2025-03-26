package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.enums.PermissionCodeEnum;
import com.easyjob.entity.po.AppFeedback;
import com.easyjob.entity.query.AppFeedbackQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.AppFeedbackService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 问题反馈 Controller
 */
@RestController("appFeedbackController")
@RequestMapping("/appFeedback")
public class AppFeedbackController extends ABaseController {

    @Resource
    private AppFeedbackService appFeedbackService;

    /**
     * 根据条件分页查询
     */
    @RequestMapping("/loadFeedback")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_FEEDBACK_LIST)
    public ResponseVO loadFeedback(AppFeedbackQuery query) {
        query.setOrderBy("feedback_id desc");
        query.setpFeedbackId(0);
        return getSuccessResponseVO(appFeedbackService.findListByPage(query));
    }

    @RequestMapping("/loadFeedbackReply")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_FEEDBACK_REPLY)
    public ResponseVO loadFeedbackReply(@VerifyParam(required = true) Integer pFeedbackId) {
        AppFeedbackQuery query = new AppFeedbackQuery();
        query.setOrderBy("feedback_id asc");
        query.setpFeedbackId(pFeedbackId);
        return getSuccessResponseVO(appFeedbackService.findListByParam(query));
    }

    @RequestMapping("/replyFeedback")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_FEEDBACK_REPLY)
    public ResponseVO replyFeedback(@VerifyParam(required = true, max = 500) String content,
                                    @VerifyParam(required = true) Integer pFeedbackId) {
        AppFeedback appFeedback = new AppFeedback();
        appFeedback.setpFeedbackId(pFeedbackId);
        appFeedback.setContent(content);
        appFeedbackService.replyFeedback(appFeedback);
        return getSuccessResponseVO(null);
    }
}