package com.easyjob.controller;

import com.easyjob.annotation.GlobalInterceptor;
import com.easyjob.annotation.VerifyParam;
import com.easyjob.entity.dto.ImportErrorItem;
import com.easyjob.entity.dto.SessionUserAdminDto;
import com.easyjob.entity.enums.PermissionCodeEnum;
import com.easyjob.entity.enums.PostStatusEnum;
import com.easyjob.entity.enums.QuestionTypeEnum;
import com.easyjob.entity.enums.ResponseCodeEnum;
import com.easyjob.entity.po.ExamQuestion;
import com.easyjob.entity.po.ExamQuestionItem;
import com.easyjob.entity.query.ExamQuestionItemQuery;
import com.easyjob.entity.query.ExamQuestionQuery;
import com.easyjob.entity.vo.ResponseVO;
import com.easyjob.exception.BusinessException;
import com.easyjob.service.ExamQuestionItemService;
import com.easyjob.service.ExamQuestionService;
import com.easyjob.utils.JsonUtils;
import com.easyjob.utils.StringTools;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * 考试题目 Controller
 */
@RestController("examQuestionController")
@RequestMapping("/examQuestion")
public class ExamQuestionController extends ABaseController {

    @Resource
    private ExamQuestionService examQuestionService;

    @Resource
    private ExamQuestionItemService examQuestionItemService;

    /**
     * 根据条件分页查询
     */
    @RequestMapping("/loadDataList")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.EXAM_QUESTION_LIST)
    public ResponseVO loadDataList(ExamQuestionQuery query) {
        query.setOrderBy("question_id desc");
        query.setQueryAnswer(true);
        return getSuccessResponseVO(examQuestionService.findListByPage(query));
    }

    @RequestMapping("/saveExamQuestion")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.EXAM_QUESTION_EDIT)
    public ResponseVO saveExamQuestion(HttpSession session, @VerifyParam(required = true) ExamQuestion examQuestion,
                                       String questionItemListJson) {
        SessionUserAdminDto userAdminDto = getUserAdminFromSession(session);
        examQuestion.setCreateUserId(String.valueOf(userAdminDto.getUserId()));
        examQuestion.setCreateUserName(userAdminDto.getUserName());
        List<ExamQuestionItem> examQuestionItemList = new ArrayList<>();
        if (!QuestionTypeEnum.TRUE_FALSE.getType().equals(examQuestion.getQuestionType())) {
            if (StringTools.isEmpty(questionItemListJson)) {
                throw new BusinessException(ResponseCodeEnum.CODE_600);
            }
            examQuestionItemList = JsonUtils.convertJsonArray2List(questionItemListJson, ExamQuestionItem.class);
        }
        examQuestionService.saveExamQuestion(examQuestion, examQuestionItemList, userAdminDto.getSuperAdmin());
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/loadQuestionItem")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.EXAM_QUESTION_EDIT)
    public ResponseVO loadQuestionItem(@VerifyParam(required = true) Integer questionId) {
        ExamQuestionItemQuery itemQuery = new ExamQuestionItemQuery();
        itemQuery.setQuestionId(questionId);
        itemQuery.setOrderBy("sort asc");
        return getSuccessResponseVO(examQuestionItemService.findListByParam(itemQuery));
    }

    @RequestMapping("/delExamQuestion")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.EXAM_QUESTION_EDIT)
    public ResponseVO delExamQuestion(HttpSession session, @VerifyParam(required = true) Integer questionId) {
        SessionUserAdminDto userAdminDto = getUserAdminFromSession(session);
        examQuestionService.delExamQuestionBatch(String.valueOf(questionId), userAdminDto.getSuperAdmin() ? null : userAdminDto.getUserId());
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/delExamQuestionBatch")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.EXAM_QUESTION_DEL_BATCH)
    public ResponseVO delExamQuestionBatch(@VerifyParam(required = true) String questionIds) {
        examQuestionService.delExamQuestionBatch(questionIds, null);
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/postExamQuestion")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.EXAM_QUESTION_POST)
    public ResponseVO postExamQuestion(@VerifyParam(required = true) String questionIds) {
        updateStatus(questionIds, PostStatusEnum.POST.getStatus());
        return getSuccessResponseVO(null);
    }

    @RequestMapping("/cancelPostExamQuestion")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.EXAM_QUESTION_POST)
    public ResponseVO cancelPostExamQuestion(@VerifyParam(required = true) String questionIds) {
        updateStatus(questionIds, PostStatusEnum.NO_POST.getStatus());
        return getSuccessResponseVO(null);
    }

    private void updateStatus(String questionIds, Integer status) {
        ExamQuestionQuery query = new ExamQuestionQuery();
        query.setQuestionIds(questionIds.split(","));

        ExamQuestion question = new ExamQuestion();
        question.setStatus(status);
        examQuestionService.updateByParam(question, query);
    }

    @RequestMapping("/showExamQuestionDetailNext")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.EXAM_QUESTION_LIST)
    public ResponseVO showExamQuestionDetailNext(ExamQuestionQuery query,
                                                 Integer nextType,
                                                 @VerifyParam(required = true) Integer currentId) {
        ExamQuestion examQuestion = examQuestionService.showDetailNext(query, nextType, currentId);
        return getSuccessResponseVO(examQuestion);
    }

    @RequestMapping("/importExamQuestion")
    @GlobalInterceptor(permissionCode = PermissionCodeEnum.EXAM_QUESTION_IMPORT)
    public ResponseVO importExamQuestion(HttpSession session, MultipartFile file) {
        SessionUserAdminDto userAdminDto = getUserAdminFromSession(session);
        List<ImportErrorItem> errorList = examQuestionService.importExamQuestion(file, userAdminDto);
        return getSuccessResponseVO(errorList);
    }
}