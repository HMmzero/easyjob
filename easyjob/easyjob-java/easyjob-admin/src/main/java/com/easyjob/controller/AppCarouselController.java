package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.enums.PermissionCodeEnum;
import com.easyjob.entity.po.AppCarousel;
import com.easyjob.entity.query.AppCarouselQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.AppCarouselService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * app轮播 Controller
 */
@RestController("appCarouselController")
@RequestMapping("/appCarousel")
public class AppCarouselController extends ABaseController {

    @Resource
    private AppCarouselService appCarouselService;

    /**
     * 根据条件分页查询
     */
    @RequestMapping("/loadDataList")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_CAROUSEL_LIST)
    public ResponseVO loadDataList(AppCarouselQuery query) {
        query.setOrderBy("sort asc");
        return getSuccessResponseVO(appCarouselService.findListByParam(query));
    }

    @RequestMapping("/saveCarousel")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_CAROUSEL_EDIT)
    public ResponseVO saveCarousel(AppCarousel appCarousel) {
        appCarouselService.saveCarousel(appCarousel);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/delCarousel")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_CAROUSEL_EDIT)
    public ResponseVO delCarousel(@VerifyParam(required = true) Integer carouselId) {
        appCarouselService.deleteAppCarouselByCarouselId(carouselId);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/changeSort")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.APP_CAROUSEL_EDIT)
    public ResponseVO changeSort(@VerifyParam(required = true) String carouselIds) {
        appCarouselService.changeSort(carouselIds);
        return getSuccessResponseVO(null);
    }
}