package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.enums.PermissionCodeEnum;
import com.easyjob.entity.po.AppUpdate;
import com.easyjob.entity.query.AppUpdateQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.AppUpdateService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

/**
 * app发布 Controller
 */
@RestController("appUpdateController")
@RequestMapping("/app")
public class AppUpdateController extends ABaseController {

    @Resource
    private AppUpdateService appUpdateService;

    /**
     * 根据条件分页查询
     */
    @RequestMapping("/loadDataList")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_UPDATE_LIST)
    public ResponseVO loadDataList(AppUpdateQuery query) {
        query.setOrderBy("id desc");
        return getSuccessResponseVO(appUpdateService.findListByPage(query));
    }

    @RequestMapping("/saveUpdate")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_UPDATE_EDIT)
    public ResponseVO saveUpdate(Integer id, @VerifyParam(required = true) String version,
                                 @VerifyParam(required = true) String updateDesc,
                                 @VerifyParam(required = true) Integer updateType,
                                 MultipartFile file) {
        AppUpdate appUpdate = new AppUpdate();
        appUpdate.setId(id);
        appUpdate.setVersion(version);
        appUpdate.setUpdateDesc(updateDesc);
        appUpdate.setUpdateType(updateType);
        appUpdateService.saveUpdate(appUpdate, file);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/delUpdate")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_UPDATE_EDIT)
    public ResponseVO delUpdate(@VerifyParam(required = true) Integer id) {
        appUpdateService.deleteAppUpdateById(id);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/postUpdate")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_UPDATE_POST)
    public ResponseVO postUpdate(@VerifyParam(required = true) Integer id, @VerifyParam(required = true) Integer status, String grayscaleDevice) {
        appUpdateService.postUpdate(id, status, grayscaleDevice);
        return getSuccessResponseVO(null);
    }
}