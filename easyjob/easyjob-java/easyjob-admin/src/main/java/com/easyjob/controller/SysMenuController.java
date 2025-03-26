package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.enums.PermissionCodeEnum;
import com.easyjob.entity.po.SysMenu;
import com.easyjob.entity.query.SysMenuQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.SysMenuService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * 菜单表 Controller
 */
@RestController("sysMenuController")
@RequestMapping("/settings")
public class SysMenuController extends ABaseController {

    @Resource
    private SysMenuService sysMenuService;

    /**
     * 根据条件分页查询
     */
    @RequestMapping("/menuList")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SETTINGS_MENU)
    public ResponseVO menuList() {
        SysMenuQuery query = new SysMenuQuery();
        query.setFormate2Tree(true);
        query.setOrderBy("sort asc");
        List<SysMenu> sysMenuList = sysMenuService.findListByParam(query);
        return getSuccessResponseVO(sysMenuList);
    }

    @RequestMapping("/saveMenu")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SETTINGS_MENU_EDIT)
    public ResponseVO saveMenu(@VerifyParam SysMenu sysMenu) {
        sysMenuService.saveMenu(sysMenu);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/delMenu")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.SETTINGS_MENU_EDIT)
    public ResponseVO delMenu(@VerifyParam(required = true) Integer menuId) {
        sysMenuService.deleteSysMenuByMenuId(menuId);
        return getSuccessResponseVO(null);
    }
}