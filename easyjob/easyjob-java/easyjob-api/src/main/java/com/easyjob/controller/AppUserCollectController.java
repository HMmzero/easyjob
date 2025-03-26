package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.dto.AppUserLoginDto;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.AppUserCollectService;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Description 收藏
 * @Author 程序员老罗
 * @Date 2023/9/29 20:55
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("appUserCollectController")
@RequestMapping("/appUserCollect")
public class AppUserCollectController extends ABaseController {

    @Resource
    private AppUserCollectService appUserCollectService;

    @RequestMapping("/addCollect")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO addCollect(@RequestHeader(value = "token", required = false) String token,
                                 @VerifyParam(required = true) String objectId,
                                 @VerifyParam(required = true) Integer collectType) {
        AppUserLoginDto loginDto = getAppUserLoginfoFromToken(token);
        appUserCollectService.saveCollect(loginDto.getUserId(), objectId, collectType);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/cancelCollect")
    @GlobalInterceptor(checkLogin = true)
    public ResponseVO cancelCollect(@RequestHeader(value = "token", required = false) String token,
                                    @VerifyParam(required = true) String objectId,
                                    @VerifyParam(required = true) Integer collectType) {
        AppUserLoginDto loginDto = getAppUserLoginfoFromToken(token);
        appUserCollectService.deleteAppUserCollectByUserIdAndObjectIdAndCollectType(loginDto.getUserId(), objectId, collectType);
        return getSuccessResponseVO(null);
    }
}
