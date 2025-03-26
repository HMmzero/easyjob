package com.easyjob.service;

import com.easyjob.entity.dto.StatisticsDataDto;
import com.easyjob.entity.dto.StatisticsDataWeekDto;

import java.util.List;

/**
 * @Description 数据统计
 * @Author 程序员老罗
 * @Date 2023/10/14 10:37
 * @ClassName
 * @MethodName
 * @Params
 */
public interface StatisticsDataService {
    List<StatisticsDataDto> getAllData();

    StatisticsDataWeekDto getAppWeekData();

    StatisticsDataWeekDto getContentWeekData();
}
