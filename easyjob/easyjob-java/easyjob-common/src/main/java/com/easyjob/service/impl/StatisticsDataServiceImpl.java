package com.easyjob.service.impl;

import com.easyjob.entity.dto.StatisticsDataDto;
import com.easyjob.entity.dto.StatisticsDataWeekDto;
import com.easyjob.entity.enums.DateTimePatternEnum;
import com.easyjob.entity.enums.StatisticsDateTypeEnum;
import com.easyjob.entity.po.*;
import com.easyjob.entity.query.*;
import com.easyjob.mappers.*;
import com.easyjob.service.StatisticsDataService;
import com.easyjob.utils.DateUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Description 统计实现
 * @Author 程序员老罗
 * @Date 2023/10/14 10:41
 * @ClassName
 * @MethodName
 * @Params
 */
@Service("statisticsDataService")
public class StatisticsDataServiceImpl implements StatisticsDataService {

    @Resource
    private AppDeviceMapper<AppDevice, AppDeviceQuery> appDeviceMapper;

    @Resource
    private AppUserInfoMapper<AppUserInfo, AppUserInfoQuery> appUserInfoMapper;

    @Resource
    private QuestionInfoMapper<QuestionInfo, QuestionInfoQuery> questionInfoMapper;

    @Resource
    private ExamQuestionMapper<ExamQuestion, ExamQuestionQuery> examQuestionMapper;

    @Resource
    private ShareInfoMapper<ShareInfo, ShareInfoQuery> shareInfoMapper;

    @Resource
    private AppFeedbackMapper<AppFeedback, AppFeedbackQuery> appFeedbackMapper;

    @Override
    public List<StatisticsDataDto> getAllData() {
        String preDate = DateUtil.format(DateUtil.getDayAgo(1), DateTimePatternEnum.YYYY_MM_DD.getPattern());
        List<StatisticsDataDto> dataList = new ArrayList<>();
        for (StatisticsDateTypeEnum item : StatisticsDateTypeEnum.values()) {
            StatisticsDataDto dataDto = new StatisticsDataDto();
            dataDto.setStatisticsName(item.getDescription());
            switch (item) {
                case APP_DOWNLOAD:
                    AppDeviceQuery deviceQuery = new AppDeviceQuery();
                    dataDto.setCount(appDeviceMapper.selectCount(deviceQuery));
                    deviceQuery.setCreateTimeStart(preDate);
                    deviceQuery.setCreateTimeEnd(preDate);
                    dataDto.setPreCount(appDeviceMapper.selectCount(deviceQuery));
                    break;
                case REGISTER_USER:
                    AppUserInfoQuery appUserInfoQuery = new AppUserInfoQuery();
                    dataDto.setCount(appUserInfoMapper.selectCount(appUserInfoQuery));
                    appUserInfoQuery.setJoinTimeStart(preDate);
                    appUserInfoQuery.setJoinTimeEnd(preDate);
                    dataDto.setPreCount(appUserInfoMapper.selectCount(appUserInfoQuery));
                    break;
                case QUESTION_INFO:
                    QuestionInfoQuery questionInfoQuery = new QuestionInfoQuery();
                    dataDto.setCount(questionInfoMapper.selectCount(questionInfoQuery));
                    questionInfoQuery.setCreateTimeStart(preDate);
                    questionInfoQuery.setCreateTimeEnd(preDate);
                    dataDto.setPreCount(questionInfoMapper.selectCount(questionInfoQuery));
                    break;
                case EXAM:
                    ExamQuestionQuery examQuestionQuery = new ExamQuestionQuery();
                    dataDto.setCount(examQuestionMapper.selectCount(examQuestionQuery));
                    examQuestionQuery.setCreateTimeStart(preDate);
                    examQuestionQuery.setCreateTimeEnd(preDate);
                    dataDto.setPreCount(examQuestionMapper.selectCount(examQuestionQuery));
                    break;
                case SHARE:
                    ShareInfoQuery shareInfoQuery = new ShareInfoQuery();
                    dataDto.setCount(shareInfoMapper.selectCount(shareInfoQuery));
                    shareInfoQuery.setCreateTimeStart(preDate);
                    shareInfoQuery.setCreateTimeEnd(preDate);
                    dataDto.setPreCount(shareInfoMapper.selectCount(shareInfoQuery));
                    break;
                case FEEDBACK:
                    AppFeedbackQuery feedbackQuery = new AppFeedbackQuery();
                    feedbackQuery.setpFeedbackId(0);
                    dataDto.setCount(appFeedbackMapper.selectCount(feedbackQuery));
                    feedbackQuery.setCreateTimeStart(preDate);
                    feedbackQuery.setCreateTimeEnd(preDate);
                    dataDto.setPreCount(appFeedbackMapper.selectCount(feedbackQuery));
                    break;
            }
            dataList.add(dataDto);
        }
        return dataList;
    }

    @Override
    public StatisticsDataWeekDto getAppWeekData() {
        List<String> days = getDays();

        StatisticsDataWeekDto weekDto = new StatisticsDataWeekDto();
        weekDto.setDateList(days);
        weekDto.setItemDataList(new ArrayList<>());

        StatisticsDataDto download = new StatisticsDataDto();
        download.setListData(new ArrayList<>());
        download.setStatisticsName(StatisticsDateTypeEnum.APP_DOWNLOAD.getDescription());
        weekDto.getItemDataList().add(download);

        StatisticsDataDto register = new StatisticsDataDto();
        register.setListData(new ArrayList<>());
        register.setStatisticsName(StatisticsDateTypeEnum.REGISTER_USER.getDescription());
        weekDto.getItemDataList().add(register);

        for (String date : days) {
            AppDeviceQuery deviceQuery = new AppDeviceQuery();
            deviceQuery.setCreateTimeStart(date);
            deviceQuery.setCreateTimeEnd(date);
            Integer downloadCount = appDeviceMapper.selectCount(deviceQuery);
            download.getListData().add(downloadCount);

            AppUserInfoQuery appUserInfoQuery = new AppUserInfoQuery();
            appUserInfoQuery.setJoinTimeStart(date);
            appUserInfoQuery.setJoinTimeEnd(date);
            Integer registerCount = appUserInfoMapper.selectCount(appUserInfoQuery);
            register.getListData().add(registerCount);
        }
        return weekDto;
    }

    @Override
    public StatisticsDataWeekDto getContentWeekData() {
        List<String> days = getDays();

        StatisticsDataWeekDto weekDto = new StatisticsDataWeekDto();
        weekDto.setDateList(days);
        weekDto.setItemDataList(new ArrayList<>());

        StatisticsDataDto question = new StatisticsDataDto();
        question.setListData(new ArrayList<>());
        question.setStatisticsName(StatisticsDateTypeEnum.QUESTION_INFO.getDescription());
        weekDto.getItemDataList().add(question);

        StatisticsDataDto examQuestion = new StatisticsDataDto();
        examQuestion.setStatisticsName(StatisticsDateTypeEnum.EXAM.getDescription());
        examQuestion.setListData(new ArrayList<>());
        weekDto.getItemDataList().add(examQuestion);

        StatisticsDataDto share = new StatisticsDataDto();
        share.setStatisticsName(StatisticsDateTypeEnum.SHARE.getDescription());
        share.setListData(new ArrayList<>());
        weekDto.getItemDataList().add(share);

        StatisticsDataDto feedback = new StatisticsDataDto();
        feedback.setStatisticsName(StatisticsDateTypeEnum.FEEDBACK.getDescription());
        feedback.setListData(new ArrayList<>());
        weekDto.getItemDataList().add(feedback);
        
        for (String date : days) {
            QuestionInfoQuery questionInfoQuery = new QuestionInfoQuery();
            questionInfoQuery.setCreateTimeStart(date);
            questionInfoQuery.setCreateTimeEnd(date);
            question.getListData().add(questionInfoMapper.selectCount(questionInfoQuery));

            ExamQuestionQuery examQuestionQuery = new ExamQuestionQuery();
            examQuestionQuery.setCreateTimeStart(date);
            examQuestionQuery.setCreateTimeEnd(date);
            examQuestion.getListData().add(examQuestionMapper.selectCount(examQuestionQuery));

            ShareInfoQuery shareInfoQuery = new ShareInfoQuery();
            shareInfoQuery.setCreateTimeStart(date);
            shareInfoQuery.setCreateTimeEnd(date);
            share.getListData().add(shareInfoMapper.selectCount(shareInfoQuery));

            AppFeedbackQuery feedbackQuery = new AppFeedbackQuery();
            feedbackQuery.setpFeedbackId(0);
            feedbackQuery.setCreateTimeStart(date);
            feedbackQuery.setCreateTimeEnd(date);
            feedback.getListData().add(appFeedbackMapper.selectCount(feedbackQuery));
        }
        return weekDto;
    }


    private List<String> getDays() {
        Date startDate = DateUtil.getDayAgo(7);
        Date preDate = DateUtil.getDayAgo(1);
        List<String> days = DateUtil.getBetweenDate(startDate, preDate);
        return days;
    }
}
