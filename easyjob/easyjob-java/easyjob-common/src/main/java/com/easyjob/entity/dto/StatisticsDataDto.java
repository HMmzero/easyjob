package com.easyjob.entity.dto;

import java.util.List;

public class StatisticsDataDto {
    private String statisticsName;
    private Integer count;
    private Integer preCount;
    private List<Integer> listData;

    public String getStatisticsName() {
        return statisticsName;
    }

    public void setStatisticsName(String statisticsName) {
        this.statisticsName = statisticsName;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getPreCount() {
        return preCount;
    }

    public void setPreCount(Integer preCount) {
        this.preCount = preCount;
    }

    public List<Integer> getListData() {
        return listData;
    }

    public void setListData(List<Integer> listData) {
        this.listData = listData;
    }
}
