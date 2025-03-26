package com.easyjob.entity.enums;


public enum SysAccountStatusEnum {
    ENABLE(1, "启用"),
    DISABLE(0, "禁用");

    private Integer status;

    private String desc;

    SysAccountStatusEnum(Integer status, String desc) {
        this.status = status;
        this.status = status;
    }

    public Integer getStatus() {
        return status;
    }

    public String getDesc() {
        return desc;
    }
}
