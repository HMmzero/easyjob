package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.component.RedisUtils;
import com.easyjob.entity.constants.Constants;
import com.easyjob.entity.dto.CreateImageCode;
import com.easyjob.entity.enums.VerifyRegexEnum;
import com.easyjob.entity.po.AppUserInfo;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.service.AppUserInfoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Description 登录注册
 * @Author 程序员老罗
 * @Date 2023/9/29 20:55
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("loginController")
@RequestMapping("/account")
public class LoginController extends ABaseController {
    @Resource
    private AppUserInfoService appUserInfoService;

    @Resource
    private RedisUtils redisUtils;

    private static final Integer CHECK_CODE_TYPE_REGISTER = 0;

    private static final Integer CHECK_CODE_TYPE_LOGIN = 1;

    @RequestMapping("/checkCode")
    @GlobalInterceptor
    public void checkCode(HttpServletResponse response, @VerifyParam(required = true) String deviceId,
                          @VerifyParam(required = true) Integer type) throws IOException {
        CreateImageCode vCode = new CreateImageCode(130, 38, 5, 10);
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/jpeg");
        String code = vCode.getCode();
        String redisKey = Constants.REDIS_KEY_CHECKCODE + deviceId + type;
        redisUtils.setex(redisKey, code, 10 * 60);
        vCode.write(response.getOutputStream());
    }

    @RequestMapping("/register")
    @GlobalInterceptor
    public ResponseVO register(HttpServletRequest request, @VerifyParam(required = true, regex = VerifyRegexEnum.EMAIL) String email,
                               @VerifyParam(required = true, max = 30) String nickName,
                               @VerifyParam(required = true, regex = VerifyRegexEnum.PASSWORD) String password,
                               @VerifyParam(required = true) Integer sex,
                               @VerifyParam(required = true) String checkCode,
                               @VerifyParam(required = true, max = 32) String deviceId,
                               @VerifyParam(max = 30) String deviceBrand) {

        String redisKey = Constants.REDIS_KEY_CHECKCODE + deviceId + CHECK_CODE_TYPE_REGISTER;
        try {
            String checkCodeRedis = (String) redisUtils.get(redisKey);
            if (!checkCode.equalsIgnoreCase(checkCodeRedis)) {
                throw new BusinessException("图片验证码不正确");
            }
            AppUserInfo appUserInfo = new AppUserInfo();
            appUserInfo.setEmail(email);
            appUserInfo.setSex(sex);
            appUserInfo.setPassword(password);
            appUserInfo.setNickName(nickName);
            appUserInfo.setLastUseDeviceId(deviceId);
            appUserInfo.setLastUseDeviceBrand(deviceBrand);
            appUserInfo.setLastLoginIp(getIpAddr(request));
            appUserInfoService.register(appUserInfo);
        } finally {
            redisUtils.delete(redisKey);
        }
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/login")
    @GlobalInterceptor
    public ResponseVO login(HttpServletRequest request,
                            @VerifyParam(required = true) String email,
                            @VerifyParam(required = true) String password,
                            @VerifyParam(required = true) String checkCode,
                            @VerifyParam(required = true, max = 32) String deviceId,
                            @VerifyParam(max = 30) String deviceBrand) {
        String redisKey = Constants.REDIS_KEY_CHECKCODE + deviceId + CHECK_CODE_TYPE_LOGIN;
        try {
            String checkCodeRedis = (String) redisUtils.get(redisKey);
            if (!checkCode.equalsIgnoreCase(checkCodeRedis)) {
                throw new BusinessException("图片验证码不正确");
            }
            String token = appUserInfoService.login(email, password, getIpAddr(request), deviceId, deviceBrand);
            return getSuccessResponseVO(token);
        } finally {
            redisUtils.delete(redisKey);
        }
    }


    @RequestMapping("/autoLogin")
    @GlobalInterceptor
    public ResponseVO autoLogin(HttpServletRequest request,
                                @VerifyParam(required = true) String token,
                                @VerifyParam(required = true, max = 32) String deviceId,
                                @VerifyParam(max = 30) String deviceBrand) {
        String newToken = appUserInfoService.autoLogin(token, deviceId, deviceBrand, getIpAddr(request));
        return getSuccessResponseVO(newToken);
    }
}


