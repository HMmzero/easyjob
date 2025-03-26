package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.entity.enums.PermissionCodeEnum;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.StatisticsDataService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Description 首页数据统计
 * @Author 程序员老罗
 * @Date 2023/10/14 10:34
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("indexController")
@RequestMapping("/index")
public class IndexController extends ABaseController {

    @Resource
    private StatisticsDataService statisticsDataService;

    @RequestMapping("/getAllData")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.HOME)
    public ResponseVO getAllData() {
        return getSuccessResponseVO(statisticsDataService.getAllData());
    }

    @RequestMapping("/getAppWeekData")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.HOME)
    public ResponseVO getAppWeekData() {
        return getSuccessResponseVO(statisticsDataService.getAppWeekData());
    }

    @RequestMapping("/getContentWeekData")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.HOME)
    public ResponseVO getContentWeekData() {
        return getSuccessResponseVO(statisticsDataService.getContentWeekData());
    }
}
