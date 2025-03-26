package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.enums.PermissionCodeEnum;
import com.easyjob.entity.po.Category;
import com.easyjob.entity.query.CategoryQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.service.CategoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * 分类 Controller
 */
@RestController("categoryController")
@RequestMapping("/category")
public class CategoryController extends ABaseController {

    @Resource
    private CategoryService categoryService;

    /**
     * 根据条件分页查询
     */
    @RequestMapping("/loadAllCategory")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.CATEOGRY_LIST)
    public ResponseVO loadAllCategory(CategoryQuery query) {
        query.setOrderBy("sort asc");
        return getSuccessResponseVO(categoryService.findListByParam(query));
    }

    @RequestMapping("/saveCategory")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.CATEOGRY_EDIT)
    public ResponseVO saveCategory(Category category) {
        categoryService.saveCategory(category);
        return getSuccessResponseVO(null);
    }


    @RequestMapping("/delCategory")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.CATEOGRY_DEL)
    public ResponseVO delCategory(@VerifyParam(required = true) Integer categoryId) {
        categoryService.deleteCategoryByCategoryId(categoryId);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/changeSort")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.CATEOGRY_DEL)
    public ResponseVO changeSort(@VerifyParam(required = true) String categoryIds) {
        categoryService.changeSort(categoryIds);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/loadAllCategory4Select")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.CATEOGRY_LIST)
    public ResponseVO loadAllCategory4Select(@VerifyParam(required = true) Integer type) {
        List<Category> list = categoryService.loadAllCategoryByType(type);
        return getSuccessResponseVO(list);
    }
}