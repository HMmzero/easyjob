package com.easyjob.service.impl;

import com.easyjob.entity.enums.PageSize;
import com.easyjob.entity.po.AppCarousel;
import com.easyjob.entity.query.AppCarouselQuery;
import com.easyjob.entity.query.SimplePage;
import com.easyjob.entity.vo.PaginationResultVO;
import com.easyjob.mappers.AppCarouselMapper;
import com.easyjob.service.AppCarouselService;
import com.easyjob.utils.StringTools;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


/**
 * app轮播 业务接口实现
 */
@Service("appCarouselService")
public class AppCarouselServiceImpl implements AppCarouselService {

    @Resource
    private AppCarouselMapper<AppCarousel, AppCarouselQuery> appCarouselMapper;

    /**
     * 根据条件查询列表
     */
    @Override
    public List<AppCarousel> findListByParam(AppCarouselQuery param) {
        return this.appCarouselMapper.selectList(param);
    }

    /**
     * 根据条件查询列表
     */
    @Override
    public Integer findCountByParam(AppCarouselQuery param) {
        return this.appCarouselMapper.selectCount(param);
    }

    /**
     * 分页查询方法
     */
    @Override
    public PaginationResultVO<AppCarousel> findListByPage(AppCarouselQuery param) {
        int count = this.findCountByParam(param);
        int pageSize = param.getPageSize() == null ? PageSize.SIZE15.getSize() : param.getPageSize();

        SimplePage page = new SimplePage(param.getPageNo(), count, pageSize);
        param.setSimplePage(page);
        List<AppCarousel> list = this.findListByParam(param);
        PaginationResultVO<AppCarousel> result = new PaginationResultVO(count, page.getPageSize(), page.getPageNo(), page.getPageTotal(), list);
        return result;
    }

    /**
     * 新增
     */
    @Override
    public Integer add(AppCarousel bean) {
        return this.appCarouselMapper.insert(bean);
    }

    /**
     * 批量新增
     */
    @Override
    public Integer addBatch(List<AppCarousel> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.appCarouselMapper.insertBatch(listBean);
    }

    /**
     * 批量新增或者修改
     */
    @Override
    public Integer addOrUpdateBatch(List<AppCarousel> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.appCarouselMapper.insertOrUpdateBatch(listBean);
    }

    /**
     * 多条件更新
     */
    @Override
    public Integer updateByParam(AppCarousel bean, AppCarouselQuery param) {
        StringTools.checkParam(param);
        return this.appCarouselMapper.updateByParam(bean, param);
    }

    /**
     * 多条件删除
     */
    @Override
    public Integer deleteByParam(AppCarouselQuery param) {
        StringTools.checkParam(param);
        return this.appCarouselMapper.deleteByParam(param);
    }

    /**
     * 根据CarouselId获取对象
     */
    @Override
    public AppCarousel getAppCarouselByCarouselId(Integer carouselId) {
        return this.appCarouselMapper.selectByCarouselId(carouselId);
    }

    /**
     * 根据CarouselId修改
     */
    @Override
    public Integer updateAppCarouselByCarouselId(AppCarousel bean, Integer carouselId) {
        return this.appCarouselMapper.updateByCarouselId(bean, carouselId);
    }

    /**
     * 根据CarouselId删除
     */
    @Override
    public Integer deleteAppCarouselByCarouselId(Integer carouselId) {
        return this.appCarouselMapper.deleteByCarouselId(carouselId);
    }

    @Override
    public void saveCarousel(AppCarousel bean) {
        if (bean.getCarouselId() == null) {
            AppCarouselQuery appCarouselQuery = new AppCarouselQuery();
            Integer count = appCarouselMapper.selectCount(appCarouselQuery);
            bean.setSort(count + 1);
            this.appCarouselMapper.insert(bean);
        } else {
            this.appCarouselMapper.updateByCarouselId(bean, bean.getCarouselId());
        }
    }

    @Override
    public void changeSort(String carouselIds) {
        String[] carouselIdArray = carouselIds.split(",");
        Integer index = 1;
        for (String carouselIdStr : carouselIdArray) {
            Integer carouselId = Integer.parseInt(carouselIdStr);
            AppCarousel appCarousel = new AppCarousel();
            appCarousel.setSort(index);
            appCarouselMapper.updateByCarouselId(appCarousel, carouselId);
            index++;
        }
    }
}