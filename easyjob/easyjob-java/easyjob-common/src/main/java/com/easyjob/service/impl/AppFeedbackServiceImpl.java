package com.easyjob.service.impl;

import com.easyjob.entity.enums.FeedbackSendTypeEnum;
import com.easyjob.entity.enums.FeedbackStatusEnum;
import com.easyjob.entity.enums.PageSize;
import com.easyjob.entity.enums.ResponseCodeEnum;
import com.easyjob.entity.po.AppFeedback;
import com.easyjob.entity.query.AppFeedbackQuery;
import com.easyjob.entity.query.SimplePage;
import com.easyjob.entity.vo.PaginationResultVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.mappers.AppFeedbackMapper;
import com.easyjob.service.AppFeedbackService;
import com.easyjob.utils.StringTools;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;


/**
 * 问题反馈 业务接口实现
 */
@Service("appFeedbackService")
public class AppFeedbackServiceImpl implements AppFeedbackService {

    @Resource
    private AppFeedbackMapper<AppFeedback, AppFeedbackQuery> appFeedbackMapper;

    /**
     * 根据条件查询列表
     */
    @Override
    public List<AppFeedback> findListByParam(AppFeedbackQuery param) {
        return this.appFeedbackMapper.selectList(param);
    }

    /**
     * 根据条件查询列表
     */
    @Override
    public Integer findCountByParam(AppFeedbackQuery param) {
        return this.appFeedbackMapper.selectCount(param);
    }

    /**
     * 分页查询方法
     */
    @Override
    public PaginationResultVO<AppFeedback> findListByPage(AppFeedbackQuery param) {
        int count = this.findCountByParam(param);
        int pageSize = param.getPageSize() == null ? PageSize.SIZE15.getSize() : param.getPageSize();

        SimplePage page = new SimplePage(param.getPageNo(), count, pageSize);
        param.setSimplePage(page);
        List<AppFeedback> list = this.findListByParam(param);
        PaginationResultVO<AppFeedback> result = new PaginationResultVO(count, page.getPageSize(), page.getPageNo(), page.getPageTotal(), list);
        return result;
    }

    /**
     * 新增
     */
    @Override
    public Integer add(AppFeedback bean) {
        return this.appFeedbackMapper.insert(bean);
    }

    /**
     * 批量新增
     */
    @Override
    public Integer addBatch(List<AppFeedback> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.appFeedbackMapper.insertBatch(listBean);
    }

    /**
     * 批量新增或者修改
     */
    @Override
    public Integer addOrUpdateBatch(List<AppFeedback> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.appFeedbackMapper.insertOrUpdateBatch(listBean);
    }

    /**
     * 多条件更新
     */
    @Override
    public Integer updateByParam(AppFeedback bean, AppFeedbackQuery param) {
        StringTools.checkParam(param);
        return this.appFeedbackMapper.updateByParam(bean, param);
    }

    /**
     * 多条件删除
     */
    @Override
    public Integer deleteByParam(AppFeedbackQuery param) {
        StringTools.checkParam(param);
        return this.appFeedbackMapper.deleteByParam(param);
    }

    /**
     * 根据FeedbackId获取对象
     */
    @Override
    public AppFeedback getAppFeedbackByFeedbackId(Integer feedbackId) {
        return this.appFeedbackMapper.selectByFeedbackId(feedbackId);
    }

    /**
     * 根据FeedbackId修改
     */
    @Override
    public Integer updateAppFeedbackByFeedbackId(AppFeedback bean, Integer feedbackId) {
        return this.appFeedbackMapper.updateByFeedbackId(bean, feedbackId);
    }

    /**
     * 根据FeedbackId删除
     */
    @Override
    public Integer deleteAppFeedbackByFeedbackId(Integer feedbackId) {
        return this.appFeedbackMapper.deleteByFeedbackId(feedbackId);
    }

    /**
     * 根据FeedbackIdAndUserId获取对象
     */
    @Override
    public AppFeedback getAppFeedbackByFeedbackIdAndUserId(Integer feedbackId, String userId) {
        return this.appFeedbackMapper.selectByFeedbackIdAndUserId(feedbackId, userId);
    }

    /**
     * 根据FeedbackIdAndUserId修改
     */
    @Override
    public Integer updateAppFeedbackByFeedbackIdAndUserId(AppFeedback bean, Integer feedbackId, String userId) {
        return this.appFeedbackMapper.updateByFeedbackIdAndUserId(bean, feedbackId, userId);
    }

    /**
     * 根据FeedbackIdAndUserId删除
     */
    @Override
    public Integer deleteAppFeedbackByFeedbackIdAndUserId(Integer feedbackId, String userId) {
        return this.appFeedbackMapper.deleteByFeedbackIdAndUserId(feedbackId, userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void replyFeedback(AppFeedback appFeedback) {
        AppFeedback pFeedback = appFeedbackMapper.selectByFeedbackId(appFeedback.getpFeedbackId());
        if (null == pFeedback) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }
        Date curDate = new Date();
        appFeedback.setCreateTime(curDate);
        appFeedback.setSendType(FeedbackSendTypeEnum.ADMIN.getStatus());
        appFeedback.setUserId(pFeedback.getUserId());
        appFeedbackMapper.insert(appFeedback);

        /**
         * 更新父级反馈状态
         */
        AppFeedback parentUpdate = new AppFeedback();
        parentUpdate.setStatus(FeedbackStatusEnum.REPLY.getStatus());
        appFeedbackMapper.updateByFeedbackId(parentUpdate, appFeedback.getpFeedbackId());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveFeedBack4Client(AppFeedback appFeedback) {
        Date curDate = new Date();
        if (appFeedback.getpFeedbackId() != null && appFeedback.getpFeedbackId() != 0) {
            AppFeedback parentFeedback = this.appFeedbackMapper.selectByFeedbackIdAndUserId(appFeedback.getpFeedbackId(), appFeedback.getUserId());
            if (null == parentFeedback) {
                throw new BusinessException(ResponseCodeEnum.CODE_600);
            }

            AppFeedback parentUpdate = new AppFeedback();
            parentUpdate.setClientLastSendTime(curDate);
            parentUpdate.setStatus(FeedbackStatusEnum.NO_REPLY.getStatus());
            appFeedbackMapper.updateByFeedbackId(parentUpdate, appFeedback.getpFeedbackId());
        }
        appFeedback.setCreateTime(curDate);
        appFeedback.setStatus(FeedbackStatusEnum.NO_REPLY.getStatus());
        appFeedback.setSendType(FeedbackSendTypeEnum.CLIENT.getStatus());
        appFeedback.setClientLastSendTime(curDate);
        this.appFeedbackMapper.insert(appFeedback);
    }
}