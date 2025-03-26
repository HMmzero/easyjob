package com.easyjob.entity.dto;

import java.util.List;

public class StatisticsDataWeekDto {
    private List<String> dateList;
    private List<StatisticsDataDto> itemDataList;

    public List<String> getDateList() {
        return dateList;
    }

    public void setDateList(List<String> dateList) {
        this.dateList = dateList;
    }

    public List<StatisticsDataDto> getItemDataList() {
        return itemDataList;
    }

    public void setItemDataList(List<StatisticsDataDto> itemDataList) {
        this.itemDataList = itemDataList;
    }
}
