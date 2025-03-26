package com.easyjob.service.impl;

import com.easyjob.entity.config.AppConfig;
import com.easyjob.entity.constants.Constants;
import com.easyjob.entity.enums.AppUpdateSatusEnum;
import com.easyjob.entity.enums.AppUpdateTypeEnum;
import com.easyjob.entity.enums.PageSize;
import com.easyjob.entity.enums.ResponseCodeEnum;
import com.easyjob.entity.po.AppUpdate;
import com.easyjob.entity.query.AppUpdateQuery;
import com.easyjob.entity.query.SimplePage;
import com.easyjob.entity.vo.PaginationResultVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.mappers.AppUpdateMapper;
import com.easyjob.service.AppUpdateService;
import com.easyjob.utils.StringTools;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;


/**
 * app发布 业务接口实现
 */
@Service("appUpdateService")
public class AppUpdateServiceImpl implements AppUpdateService {


    @Resource
    private AppConfig appConfig;

    @Resource
    private AppUpdateMapper<AppUpdate, AppUpdateQuery> appUpdateMapper;

    /**
     * 根据条件查询列表
     */
    @Override
    public List<AppUpdate> findListByParam(AppUpdateQuery param) {
        return this.appUpdateMapper.selectList(param);
    }

    /**
     * 根据条件查询列表
     */
    @Override
    public Integer findCountByParam(AppUpdateQuery param) {
        return this.appUpdateMapper.selectCount(param);
    }

    /**
     * 分页查询方法
     */
    @Override
    public PaginationResultVO<AppUpdate> findListByPage(AppUpdateQuery param) {
        int count = this.findCountByParam(param);
        int pageSize = param.getPageSize() == null ? PageSize.SIZE15.getSize() : param.getPageSize();

        SimplePage page = new SimplePage(param.getPageNo(), count, pageSize);
        param.setSimplePage(page);
        List<AppUpdate> list = this.findListByParam(param);
        PaginationResultVO<AppUpdate> result = new PaginationResultVO(count, page.getPageSize(), page.getPageNo(), page.getPageTotal(), list);
        return result;
    }

    /**
     * 新增
     */
    @Override
    public Integer add(AppUpdate bean) {
        return this.appUpdateMapper.insert(bean);
    }

    /**
     * 批量新增
     */
    @Override
    public Integer addBatch(List<AppUpdate> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.appUpdateMapper.insertBatch(listBean);
    }

    /**
     * 批量新增或者修改
     */
    @Override
    public Integer addOrUpdateBatch(List<AppUpdate> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.appUpdateMapper.insertOrUpdateBatch(listBean);
    }

    /**
     * 多条件更新
     */
    @Override
    public Integer updateByParam(AppUpdate bean, AppUpdateQuery param) {
        StringTools.checkParam(param);
        return this.appUpdateMapper.updateByParam(bean, param);
    }

    /**
     * 多条件删除
     */
    @Override
    public Integer deleteByParam(AppUpdateQuery param) {
        StringTools.checkParam(param);
        return this.appUpdateMapper.deleteByParam(param);
    }

    /**
     * 根据Id获取对象
     */
    @Override
    public AppUpdate getAppUpdateById(Integer id) {
        return this.appUpdateMapper.selectById(id);
    }

    /**
     * 根据Id修改
     */
    @Override
    public Integer updateAppUpdateById(AppUpdate bean, Integer id) {
        return this.appUpdateMapper.updateById(bean, id);
    }

    /**
     * 根据Id删除
     */
    @Override
    public Integer deleteAppUpdateById(Integer id) {
        return this.appUpdateMapper.deleteById(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveUpdate(AppUpdate appUpdate, MultipartFile file) {
        AppUpdateQuery updateQuery = new AppUpdateQuery();
        updateQuery.setOrderBy("id desc");
        updateQuery.setSimplePage(new SimplePage(0, 1));
        List<AppUpdate> appUpdateList = appUpdateMapper.selectList(updateQuery);
        if (!appUpdateList.isEmpty()) {
            AppUpdate latest = appUpdateList.get(0);
            Long dbVerion = Long.parseLong(latest.getVersion().replace(".", ""));
            Long currentVersion = Long.parseLong(appUpdate.getVersion().replace(".", ""));
            if (appUpdate.getId() == null && currentVersion <= dbVerion) {
                throw new BusinessException("当前版本必须大于历史版本");
            }
            if (appUpdate.getId() != null && currentVersion <= dbVerion && !appUpdate.getVersion().equals(latest.getVersion())) {
                throw new BusinessException("当前版本必须大于历史版本");
            }
        }
        if (appUpdate.getId() == null) {
            appUpdate.setCreateTime(new Date());
            appUpdate.setStatus(AppUpdateSatusEnum.INIT.getStatus());
            appUpdateMapper.insert(appUpdate);
        } else {
            appUpdate.setStatus(null);
            appUpdate.setGrayscaleDevice(null);
            appUpdateMapper.updateById(appUpdate, appUpdate.getId());
        }
        if (file != null) {
            File folder = new File(appConfig.getProjectFolder() + Constants.APP_UPDATE_FOLDER);
            if (!folder.exists()) {
                folder.mkdirs();
            }
            AppUpdateTypeEnum typeEnum = AppUpdateTypeEnum.getByType(appUpdate.getUpdateType());
            try {
                file.transferTo(new File(folder.getAbsolutePath() + "/" + appUpdate.getId() + typeEnum.getSuffix()));
            } catch (IOException e) {
                throw new BusinessException("更新App失败");
            }
        }
    }

    @Override
    public void postUpdate(Integer id, Integer status, String grayscaleDevice) {
        AppUpdateSatusEnum satusEnum = AppUpdateSatusEnum.getByStatus(status);
        if (status == null) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }
        if (AppUpdateSatusEnum.GRAYSCALE == satusEnum && StringTools.isEmpty(grayscaleDevice)) {
            throw new BusinessException(ResponseCodeEnum.CODE_600);
        }
        if (AppUpdateSatusEnum.GRAYSCALE != satusEnum) {
            grayscaleDevice = "";
        }
        AppUpdate update = new AppUpdate();
        update.setStatus(status);
        update.setGrayscaleDevice(grayscaleDevice);
        appUpdateMapper.updateById(update, id);
    }

    @Override
    public AppUpdate getLatestUpdate(String appVersion, String deviceId) {
        return appUpdateMapper.selectLatestUpdate(appVersion, deviceId);
    }
}