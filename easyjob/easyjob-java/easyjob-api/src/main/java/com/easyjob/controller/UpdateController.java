package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.config.AppConfig;
import com.easyjob.entity.constants.Constants;
import com.easyjob.entity.enums.AppUpdateTypeEnum;
import com.easyjob.entity.enums.RequestFrequencyTypeEnum;
import com.easyjob.entity.po.AppUpdate;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.entity.vo.app.AppUpdateVO;
import com.easyjob.service.AppUpdateService;
import com.easyjob.utils.CopyTools;
import com.easyjob.utils.StringTools;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;

/**
 * @Description 应用更新
 * @Author 程序员老罗
 * @Date 2023/9/29 20:55
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("updateController")
@RequestMapping("/update")
public class UpdateController extends ABaseController {

    private static final Logger logger = LoggerFactory.getLogger(UpdateController.class);

    @Resource
    private AppConfig appConfig;

    @Resource
    private AppUpdateService appUpdateService;

    @RequestMapping("/checkVersion")
    @GlobalInterceptor
    public ResponseVO loadAllCategory(String appVersion,
                                      @VerifyParam(required = true) String deviceId) {
        if (StringTools.isEmpty(appVersion)) {
            return getSuccessResponseVO(null);
        }
        AppUpdate appUpdate = appUpdateService.getLatestUpdate(appVersion, deviceId);
        if (appUpdate == null) {
            return getSuccessResponseVO(null);
        }
        AppUpdateVO updateVO = CopyTools.copy(appUpdate, AppUpdateVO.class);
        AppUpdateTypeEnum typeEnum = AppUpdateTypeEnum.getByType(appUpdate.getUpdateType());
        File file = new File(appConfig.getProjectFolder() + Constants.APP_UPDATE_FOLDER + appUpdate.getId() + typeEnum.getSuffix());
        updateVO.setSize(file.length());
        updateVO.setUpdateList(Arrays.asList(appUpdate.getUpdateDescArray()));
        return getSuccessResponseVO(updateVO);
    }

    @RequestMapping("/download")
    @GlobalInterceptor(frequencyType = RequestFrequencyTypeEnum.DAY, requestFrequencyThreshold = 10)
    public void download(HttpServletResponse response, @VerifyParam(required = true) Integer id) {
        OutputStream out = null;
        FileInputStream in = null;
        try {
            AppUpdate appUpdate = appUpdateService.getAppUpdateById(id);
            AppUpdateTypeEnum typeEnum = AppUpdateTypeEnum.getByType(appUpdate.getUpdateType());
            String fileName = appConfig.getAppName() + "." + appUpdate.getVersion() + typeEnum.getSuffix();
            File file = new File(appConfig.getProjectFolder() + Constants.APP_UPDATE_FOLDER + appUpdate.getId() + typeEnum.getSuffix());
            if (!file.exists()) {
                return;
            }
            response.setContentType("application/x-msdownload; charset=UTF-8");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");
            response.setContentLengthLong(file.length());

            in = new FileInputStream(file);
            byte[] byteData = new byte[1024];
            out = response.getOutputStream();
            int len = 0;
            while ((len = in.read(byteData)) != -1) {
                out.write(byteData, 0, len);
            }
            out.flush();
        } catch (Exception e) {
            logger.error("读取文件异常", e);
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    logger.error("IO异常", e);
                }
            }
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    logger.error("IO异常", e);
                }
            }
        }
    }
}
