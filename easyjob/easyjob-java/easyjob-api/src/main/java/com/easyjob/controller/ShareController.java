package com.easyjob.controller;

import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.dto.AppUserLoginDto;
import com.easyjob.entity.enums.CollectTypeEnum;
import com.easyjob.entity.enums.PostStatusEnum;
import com.easyjob.entity.po.AppUserCollect;
import com.easyjob.entity.po.ShareInfo;
import com.easyjob.entity.query.ShareInfoQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.AppUserCollectService;
import com.easyjob.service.ShareInfoService;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Description 分享
 * @Author 程序员老罗
 * @Date 2023/10/14 20:04
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("shareController")
@RequestMapping("/share")
public class ShareController extends ABaseController {

    @Resource
    private ShareInfoService shareInfoService;

    @Resource
    private AppUserCollectService appUserCollectService;

    @RequestMapping("/loadShareList")
    public ResponseVO loadShareList(Integer pageNo) {
        ShareInfoQuery query = new ShareInfoQuery();
        query.setPageNo(pageNo);
        query.setOrderBy("share_id desc");
        query.setQueryTextContent(false);
        query.setStatus(PostStatusEnum.POST.getStatus());
        return getSuccessResponseVO(shareInfoService.findListByPage(query));
    }

    @RequestMapping("/getShareDetailNext")
    public ResponseVO getShareDetailNext(@RequestHeader(value = "token", required = false) String token,
                                         @VerifyParam(required = true) Integer currentId, Integer nextType) {
        ShareInfoQuery query = new ShareInfoQuery();
        query.setStatus(PostStatusEnum.POST.getStatus());
        ShareInfo shareInfo = shareInfoService.showDetailNext(query, nextType, currentId, true);

        AppUserLoginDto userLoginDto = getAppUserLoginfoFromToken(token);
        if (null != userLoginDto) {
            AppUserCollect appUserCollect = appUserCollectService.getAppUserCollectByUserIdAndObjectIdAndCollectType(userLoginDto.getUserId(),
                    shareInfo.getShareId().toString(), CollectTypeEnum.SHARE.getType());
            if (appUserCollect != null) {
                shareInfo.setHaveCollect(true);
            }
        }
        shareInfo.setContent(resetContentImg(shareInfo.getContent()));
        return getSuccessResponseVO(shareInfo);
    }
}
