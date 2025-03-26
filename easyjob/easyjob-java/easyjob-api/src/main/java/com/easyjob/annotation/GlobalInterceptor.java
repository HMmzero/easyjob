package com.easyjob.annotation;

import com.easyjob.entity.enums.RequestFrequencyTypeEnum;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @return
 * @Description 定义注解
 * @Author 程序员老罗
 * @Date 2023/9/16 16:28
 * @ClassName
 * @MethodName
 * @Params
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface GlobalInterceptor {

    boolean checkLogin() default false;

    boolean checkParams() default true;

    int requestFrequencyThreshold() default 0;

    RequestFrequencyTypeEnum frequencyType() default RequestFrequencyTypeEnum.NO_LIMIT;
}
