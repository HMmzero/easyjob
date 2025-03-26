const LETTER = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
const QUESTION_TYPE = {
    0: "判断题",
    1: "单选题",
    2: "多选题",
}

const LOCAL_STORAGE_KEY = {
    "show_notice_bar": {
        key: "show_notice_bar",
        desc: "左右滑动提示"
    },
    "exam_answer": {
        key: "exam_answer",
        desc: "考试答案"
    },
    "token": {
        key: "token",
        desc: "token"
    },
    "avatar": {
        key: "avatarupdate",
        desc: "头像最后更新时间"
    },
    "readMode": {
        key: "readMode",
        desc: "阅读模式"
    },
    "searchHistory": {
        key: "searchHistory",
        desc: "搜索历史"
    }
}

export {
    LETTER,
    QUESTION_TYPE,
    LOCAL_STORAGE_KEY
}