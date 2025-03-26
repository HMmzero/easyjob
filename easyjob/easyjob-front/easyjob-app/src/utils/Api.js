const api = {
    //接口域名
    domain: "http://192.168.1.109:9090",
    //图片域名
    imageUrl: "/api/file/getImage/",
    //验证码
    checkCode: "/account/checkCode",
    //注册
    register: "/account/register",
    //登录
    login: "/account/login",
    //自动登录
    autoLogin: "/account/autoLogin",
    //上报
    report: "/index/report",
    //首页轮播图
    loadCarousel: "/index/loadCarousel",
    //轮播考试
    getExamQuestionById: "/index/getExamQuestionById",
    //首页分类
    loadAllCategory: "/index/loadAllCategory",
    //分享
    loadShareInfo: "/share/loadShareList",
    //详情
    getShareDetailNext: "/share/getShareDetailNext",
    //获取问题
    loadQuestion: "/question/loadQuestion",
    //下一篇问题
    getQuestionDetailNext: "/question/getQuestionDetailNext",
    //收藏
    addCollect: "/appUserCollect/addCollect",
    //取消收藏
    cancelCollect: "/appUserCollect/cancelCollect",
    //在线考试
    loadNoFinishedExam: "/appExam/loadNoFinishedExam",
    //删除考试记录
    delExam: "/appExam/delExam",
    //创建考试
    createExam: "/appExam/createExam",
    //开始考试
    startExam: "/appExam/startExam",
    //获取考试题目
    getExamQuestion: "/appExam/getExamQuestion",
    //提交考题
    postExam: "/appExam/postExam",
    //获取用户信息
    getUserInfo: "/my/getUserInfo",
    //我的收藏
    myCollect: "/my/loadCollect",
    //收藏详情
    getCollectNext: "/my/getCollectNext",
    //我的考试
    myExamList: "/my/loadMyExam",
    //我的错题
    myWrongQuestion: "/my/loadWrongQuestion",
    //上传头像
    uploadAvatar: "/api/my/uploadAvatar",
    //更新用户信息
    updateUserInfo: "/my/updateUserInfo",
    //问题反馈
    loadFeedback: "/my/loadFeedback",
    //查询回复
    loadFeedbackReply: "/my/loadFeedbackReply",
    //发送问题
    sendFeedback: "/my/sendFeedback",
    //检查更新
    checkUpdate: "/update/checkVersion",
    //下载
    downloadApp: "/api/update/download",
    //搜索
    search: "/search/search"
}

export default api;