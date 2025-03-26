package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.enums.PermissionCodeEnum;
import com.easyjob.entity.enums.ResponseCodeEnum;
import com.easyjob.entity.enums.UserStatusEnum;
import com.easyjob.entity.po.AppUserInfo;
import com.easyjob.entity.query.AppDeviceQuery;
import com.easyjob.entity.query.AppUserInfoQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.service.AppDeviceService;
import com.easyjob.service.AppUserInfoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Controller
 */
@RestController("appUserInfoController")
@RequestMapping("/appUser")
public class AppUserInfoController extends ABaseController {

    @Resource
    private AppUserInfoService appUserInfoService;

    @Resource
    private AppDeviceService appDeviceService;

    @RequestMapping("/loadDeviceList")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_USER_DEVICE)
    public ResponseVO loadDeviceList(AppDeviceQuery query) {
        query.setOrderBy("create_time desc");
        return getSuccessResponseVO(appDeviceService.findListByPage(query));
    }

    /**
     * 根据条件分页查询
     */
    @RequestMapping("/loadDataList")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_USER_LIST)
    public ResponseVO loadDataList(AppUserInfoQuery query) {
        query.setOrderBy("join_time desc");
        return getSuccessResponseVO(appUserInfoService.findListByPage(query));
    }

    @RequestMapping("/updateStatus")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_USER_EDIT)
    public ResponseVO updateStatus(@VerifyParam(required = true) String userId,
                                   @VerifyParam(required = true) Integer status) {
        UserStatusEnum userStatusEnum = UserStatusEnum.getByStatus(status);
        if (userStatusEnum == null) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }
        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setStatus(status);
        appUserInfoService.updateAppUserInfoByUserId(appUserInfo, userId);
        return getSuccessResponseVO(null);
    }
}