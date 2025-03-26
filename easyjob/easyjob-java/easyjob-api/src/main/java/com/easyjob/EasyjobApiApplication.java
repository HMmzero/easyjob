package com.easyjob;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @ClassName EasyjobAdminApplication
 * @Description TODO
 * @Author Administrator
 * @Date 2023/9/12 22:07
 */
@SpringBootApplication(scanBasePackages = {"com.easyjob"})
@MapperScan(basePackages = {"com.easyjob.mappers"})
@EnableTransactionManagement
@EnableScheduling
@EnableAsync
public class EasyjobApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(EasyjobApiApplication.class, args);
    }
}
