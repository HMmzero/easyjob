package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.dto.SessionUserAdminDto;
import com.easyjob.entity.enums.PermissionCodeEnum;
import com.easyjob.entity.enums.PostStatusEnum;
import com.easyjob.entity.po.ShareInfo;
import com.easyjob.entity.query.ShareInfoQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.ShareInfoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

/**
 * 文章 Controller
 */
@RestController("shareInfoController")
@RequestMapping("/shareInfo")
public class ShareInfoController extends ABaseController {

    @Resource
    private ShareInfoService shareInfoService;

    /**
     * 根据条件分页查询
     */
    @RequestMapping("/loadDataList")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SHARE_LIST)
    public ResponseVO loadDataList(ShareInfoQuery query) {
        query.setOrderBy("share_id desc");
        query.setQueryTextContent(true);
        return getSuccessResponseVO(shareInfoService.findListByPage(query));
    }

    @RequestMapping("/saveShareInfo")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SHARE_EDIT)
    public ResponseVO saveShareInfo(HttpSession session, Integer shareId,
                                    @VerifyParam(required = true) String title,
                                    @VerifyParam(required = true) Integer coverType,
                                    String coverPath,
                                    @VerifyParam(required = true) String content) {

        ShareInfo bean = new ShareInfo();
        bean.setShareId(shareId);
        bean.setTitle(title);
        bean.setCoverType(coverType);
        bean.setCoverPath(coverPath);
        bean.setContent(content);
        SessionUserAdminDto userAdminDto = getUserAdminFromSession(session);
        bean.setCreateUserId(String.valueOf(userAdminDto.getUserId()));
        bean.setCreateUserName(userAdminDto.getUserName());
        shareInfoService.saveShare(bean, userAdminDto.getSuperAdmin());
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/delShare")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SHARE_DEL)
    public ResponseVO delShare(HttpSession session, @VerifyParam(required = true) String shareIds) {
        SessionUserAdminDto userAdminDto = getUserAdminFromSession(session);
        shareInfoService.delShareBatch(shareIds, userAdminDto.getSuperAdmin() ? null : userAdminDto.getUserId());
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/delShareBatch")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SHARE_DEL_BATCH)
    public ResponseVO delShareBatch(@VerifyParam(required = true) String shareIds) {
        shareInfoService.delShareBatch(shareIds, null);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/postShare")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SHARE_POST)
    public ResponseVO postShare(@VerifyParam(required = true) String shareIds) {
        updateStatus(shareIds, PostStatusEnum.POST.getStatus());
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/cancelPostShare")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SHARE_POST)
    public ResponseVO cancelPostShare(@VerifyParam(required = true) String shareIds) {
        updateStatus(shareIds, PostStatusEnum.NO_POST.getStatus());
        return getSuccessResponseVO(null);
    }

    private void updateStatus(String shareIds, Integer status) {
        ShareInfoQuery params = new ShareInfoQuery();
        params.setShareIds(shareIds.split(","));
        ShareInfo shareInfo = new ShareInfo();
        shareInfo.setStatus(status);
        shareInfoService.updateByParam(shareInfo, params);
    }

    @RequestMapping("/showShareDetailNext")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SHARE_LIST)
    public ResponseVO showShareDetailNext(ShareInfoQuery query, Integer nextType,
                                          @VerifyParam(required = true) Integer currentId) {
        ShareInfo shareInfo = shareInfoService.showDetailNext(query, nextType, currentId, false);
        return getSuccessResponseVO(shareInfo);
    }
}