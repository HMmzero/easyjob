package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.enums.PostStatusEnum;
import com.easyjob.entity.enums.RequestFrequencyTypeEnum;
import com.easyjob.entity.enums.ResponseCodeEnum;
import com.easyjob.entity.po.AppCarousel;
import com.easyjob.entity.po.AppDevice;
import com.easyjob.entity.po.ExamQuestion;
import com.easyjob.entity.po.ExamQuestionItem;
import com.easyjob.entity.query.AppCarouselQuery;
import com.easyjob.entity.query.ExamQuestionItemQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.service.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @Description 首页
 * @Author 程序员老罗
 * @Date 2023/9/29 20:55
 * @ClassName
 * @MethodName
 * @Params
 */
@RestController("indexController")
@RequestMapping("/index")
public class IndexController extends ABaseController {

    @Resource
    private CategoryService categoryService;

    @Resource
    private AppCarouselService appCarouselService;

    @Resource
    private ExamQuestionService examQuestionService;

    @Resource
    private ExamQuestionItemService examQuestionItemService;

    @Resource
    private AppDeviceService appDeviceService;

    @RequestMapping("/loadAllCategory")
    @GlobalInterceptor
    public ResponseVO loadAllCategory(@VerifyParam(required = true) Integer type) {
        return getSuccessResponseVO(categoryService.loadAllCategoryByType(type));
    }

    @RequestMapping("/loadCarousel")
    @GlobalInterceptor
    public ResponseVO loadCarousel() {
        AppCarouselQuery query = new AppCarouselQuery();
        query.setOrderBy("sort asc");
        List<AppCarousel> carouselList = appCarouselService.findListByParam(query);
        return getSuccessResponseVO(carouselList);
    }

    @RequestMapping("/getExamQuestionById")
    @GlobalInterceptor
    public ResponseVO getExamQuestionById(@VerifyParam(required = true) Integer questionId) {

        ExamQuestion examQuestion = examQuestionService.getExamQuestionByQuestionId(questionId);
        if (examQuestion == null || !PostStatusEnum.POST.getStatus().equals(examQuestion.getStatus())) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }

        ExamQuestionItemQuery itemQuery = new ExamQuestionItemQuery();
        itemQuery.setQuestionId(questionId);
        itemQuery.setOrderBy("sort asc");
        List<ExamQuestionItem> questionItemList = examQuestionItemService.findListByParam(itemQuery);
        examQuestion.setQuestionItemList(questionItemList);
        return getSuccessResponseVO(examQuestion);
    }

    @RequestMapping("/report")
    @GlobalInterceptor(frequencyType = RequestFrequencyTypeEnum.DAY, requestFrequencyThreshold = 10)
    public ResponseVO report(HttpServletRequest request, @VerifyParam(required = true, max = 32) String deviceId,
                             @VerifyParam(max = 30) String deviceBrand) {
        AppDevice appDevice = new AppDevice();
        appDevice.setDeviceId(deviceId);
        appDevice.setDeviceBrand(deviceBrand);
        appDevice.setIp(getIpAddr(request));
        appDeviceService.reportData(appDevice);
        return getSuccessResponseVO(null);
    }
}
