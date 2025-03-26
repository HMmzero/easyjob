package com.easyjob.service;

import com.easyjob.entity.po.AppFeedback;
import com.easyjob.entity.query.AppFeedbackQuery;
import com.easyjob.entity.vo.PaginationResultVO;

import java.util.List;


/**
 * 问题反馈 业务接口
 */
public interface AppFeedbackService {

    /**
     * 根据条件查询列表
     */
    List<AppFeedback> findListByParam(AppFeedbackQuery param);

    /**
     * 根据条件查询列表
     */
    Integer findCountByParam(AppFeedbackQuery param);

    /**
     * 分页查询
     */
    PaginationResultVO<AppFeedback> findListByPage(AppFeedbackQuery param);

    /**
     * 新增
     */
    Integer add(AppFeedback bean);

    /**
     * 批量新增
     */
    Integer addBatch(List<AppFeedback> listBean);

    /**
     * 批量新增/修改
     */
    Integer addOrUpdateBatch(List<AppFeedback> listBean);

    /**
     * 多条件更新
     */
    Integer updateByParam(AppFeedback bean, AppFeedbackQuery param);

    /**
     * 多条件删除
     */
    Integer deleteByParam(AppFeedbackQuery param);

    /**
     * 根据FeedbackId查询对象
     */
    AppFeedback getAppFeedbackByFeedbackId(Integer feedbackId);


    /**
     * 根据FeedbackId修改
     */
    Integer updateAppFeedbackByFeedbackId(AppFeedback bean, Integer feedbackId);


    /**
     * 根据FeedbackId删除
     */
    Integer deleteAppFeedbackByFeedbackId(Integer feedbackId);


    /**
     * 根据FeedbackIdAndUserId查询对象
     */
    AppFeedback getAppFeedbackByFeedbackIdAndUserId(Integer feedbackId, String userId);


    /**
     * 根据FeedbackIdAndUserId修改
     */
    Integer updateAppFeedbackByFeedbackIdAndUserId(AppFeedback bean, Integer feedbackId, String userId);


    /**
     * 根据FeedbackIdAndUserId删除
     */
    Integer deleteAppFeedbackByFeedbackIdAndUserId(Integer feedbackId, String userId);

    void replyFeedback(AppFeedback appFeedback);

    void saveFeedBack4Client(AppFeedback appFeedback);
}