package com.easyjob.service.impl;

import com.easyjob.entity.constants.Constants;
import com.easyjob.entity.enums.PageSize;
import com.easyjob.entity.enums.ResponseCodeEnum;
import com.easyjob.entity.po.ShareInfo;
import com.easyjob.entity.query.ShareInfoQuery;
import com.easyjob.entity.query.SimplePage;
import com.easyjob.entity.vo.PaginationResultVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.mappers.ACommonMapper;
import com.easyjob.mappers.ShareInfoMapper;
import com.easyjob.service.ShareInfoService;
import com.easyjob.utils.StringTools;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


/**
 * 文章 业务接口实现
 */
@Service("shareInfoService")
public class ShareInfoServiceImpl implements ShareInfoService {

    @Resource
    private ShareInfoMapper<ShareInfo, ShareInfoQuery> shareInfoMapper;

    @Resource
    private ACommonMapper aCommonMapper;

    /**
     * 根据条件查询列表
     */
    @Override
    public List<ShareInfo> findListByParam(ShareInfoQuery param) {
        return this.shareInfoMapper.selectList(param);
    }

    /**
     * 根据条件查询列表
     */
    @Override
    public Integer findCountByParam(ShareInfoQuery param) {
        return this.shareInfoMapper.selectCount(param);
    }

    /**
     * 分页查询方法
     */
    @Override
    public PaginationResultVO<ShareInfo> findListByPage(ShareInfoQuery param) {
        int count = this.findCountByParam(param);
        int pageSize = param.getPageSize() == null ? PageSize.SIZE15.getSize() : param.getPageSize();

        SimplePage page = new SimplePage(param.getPageNo(), count, pageSize);
        param.setSimplePage(page);
        List<ShareInfo> list = this.findListByParam(param);
        PaginationResultVO<ShareInfo> result = new PaginationResultVO(count, page.getPageSize(), page.getPageNo(), page.getPageTotal(), list);
        return result;
    }

    /**
     * 新增
     */
    @Override
    public Integer add(ShareInfo bean) {
        return this.shareInfoMapper.insert(bean);
    }

    /**
     * 批量新增
     */
    @Override
    public Integer addBatch(List<ShareInfo> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.shareInfoMapper.insertBatch(listBean);
    }

    /**
     * 批量新增或者修改
     */
    @Override
    public Integer addOrUpdateBatch(List<ShareInfo> listBean) {
        if (listBean == null || listBean.isEmpty()) {
            return 0;
        }
        return this.shareInfoMapper.insertOrUpdateBatch(listBean);
    }

    /**
     * 多条件更新
     */
    @Override
    public Integer updateByParam(ShareInfo bean, ShareInfoQuery param) {
        StringTools.checkParam(param);
        return this.shareInfoMapper.updateByParam(bean, param);
    }

    /**
     * 多条件删除
     */
    @Override
    public Integer deleteByParam(ShareInfoQuery param) {
        StringTools.checkParam(param);
        return this.shareInfoMapper.deleteByParam(param);
    }

    /**
     * 根据ShareId获取对象
     */
    @Override
    public ShareInfo getShareInfoByShareId(Integer shareId) {
        return this.shareInfoMapper.selectByShareId(shareId);
    }

    /**
     * 根据ShareId修改
     */
    @Override
    public Integer updateShareInfoByShareId(ShareInfo bean, Integer shareId) {
        return this.shareInfoMapper.updateByShareId(bean, shareId);
    }

    /**
     * 根据ShareId删除
     */
    @Override
    public Integer deleteShareInfoByShareId(Integer shareId) {
        return this.shareInfoMapper.deleteByShareId(shareId);
    }

    @Override
    public void saveShare(ShareInfo shareInfo, Boolean admin) {
        if (null == shareInfo.getShareId()) {
            shareInfo.setCreateTime(new Date());
            this.shareInfoMapper.insert(shareInfo);
        } else {
            ShareInfo dbInfo = this.shareInfoMapper.selectByShareId(shareInfo.getShareId());
            if (!dbInfo.getCreateUserId().equals(shareInfo.getCreateUserId()) && !admin) {
                throw new BusinessException(ResponseCodeEnum.CODE_600);
            }
            this.shareInfoMapper.updateByShareId(shareInfo, shareInfo.getShareId());
        }
    }

    @Override
    public void delShareBatch(String shareIds, Integer userId) {
        String[] shareIdArray = shareIds.split(",");
        if (userId != null) {
            ShareInfoQuery infoQuery = new ShareInfoQuery();
            infoQuery.setShareIds(shareIdArray);
            List<ShareInfo> shareInfoList = this.shareInfoMapper.selectList(infoQuery);
            List<ShareInfo> currentUserDataList = shareInfoList.stream().filter(a -> !a.getCreateUserId().equals(String.valueOf(userId))).collect(Collectors.toList());
            if (!currentUserDataList.isEmpty()) {
                throw new BusinessException(ResponseCodeEnum.CODE_600);
            }
        }

        ShareInfoQuery query = new ShareInfoQuery();
        query.setShareIds(shareIdArray);
        shareInfoMapper.deleteByParam(query);
    }

    @Override
    public ShareInfo showDetailNext(ShareInfoQuery query, Integer nextType, Integer currentId, Boolean updateReadCount) {
        if (nextType == null) {
            query.setShareId(currentId);
        } else {
            query.setNextType(nextType);
            query.setCurrentId(currentId);
        }
        ShareInfo shareInfo = shareInfoMapper.showDetailNext(query);
        if (shareInfo == null && nextType == null) {
            throw new BusinessException("内容不存在");
        } else if (shareInfo == null && nextType == -1) {
            throw new BusinessException("已经是第一条了");
        } else if (shareInfo == null && nextType == 1) {
            throw new BusinessException("已经是最后一条了");
        }
        if (updateReadCount && shareInfo != null) {
            aCommonMapper.updateCount(Constants.TABLE_NAME_SHARE_INFO, 1, null, currentId);
            shareInfo.setReadCount(shareInfo.getReadCount() + 1);
        }
        return shareInfo;
    }
}