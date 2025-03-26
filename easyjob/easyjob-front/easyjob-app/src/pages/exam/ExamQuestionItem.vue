<template>
  <view
    class="question-item"
    :style="{ height: height ? height + 'px' : 'auto' }"
  >
    <view class="question-content">
      <!--标题-->
      <view class="title-info">
        <rich-text :nodes="resetTitle(data)" class="title"></rich-text>
      </view>
      <!--问题描述-->
      <view class="rich-text" v-if="data.question && showHtml">
        <uvParse :content="data.question"></uvParse>
      </view>
      <!--问题选项-->
      <uni-forms-item
        :name="['questionList', index, 'userAnswer']"
        :key="data.questionId"
        :rules="[{ required: true, errorMessage: '请选择答案' }]"
      >
        <view class="question-option">
          <uni-data-checkbox
            :wrap="true"
            @change="checkChange"
            :multiple="data.questionType == 2"
            :model-value="modelValue"
            :localdata="formateAnswerOptions(data)"
          >
          </uni-data-checkbox>
        </view>
      </uni-forms-item>
      <!--问题答案-->
      <view class="question-answer" v-if="showAnswer">
        <text>答案</text>
        <text class="answer">{{ getAnswer(data, 0) }}</text>
        <template v-if="data.answerResult != null && data.answerResult != 0">
          <text>您选择</text>
          <text class="answer my">{{ getAnswer(data, 1) }}</text>
          <text v-if="data.answerResult == 1" class="iconfont icon-ok"></text>
          <text
            v-if="data.answerResult == 2"
            class="iconfont icon-wrong"
          ></text>
        </template>
      </view>
    </view>
    <template v-if="showAnswer">
      <view class="line"></view>
      <view class="answer-analysis">
        <view class="title">- <text class="inner">试题详解</text> -</view>
        <view class="difficulty-panel">
          <view class="part-title">难度</view>
          <view class="star">
            <uni-rate
              size="20"
              :readyonly="true"
              :value="data.difficultyLevel"
              activeColor="#aa6bd9"
            ></uni-rate>
          </view>
        </view>
        <view class="part-title">题目解析</view>
        <view class="rich-text">
          <uvParse
            :content="data.answerAnalysis"
            v-if="data.answerAnalysis"
          ></uvParse>
          <view class="no-data" v-else> 暂无答案解析 </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
import { LETTER, QUESTION_TYPE, LOCAL_STORAGE_KEY } from "@/utils/Constants.js";
import uvParse from "@/pages/components/uv-parse/components/uv-parse/uv-parse.vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  modelValue: {
    type: [String, Array],
  },
  height: {
    type: Number,
  },
  data: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
  },
  showAnswer: {
    type: Boolean,
    default: false,
  },
  showHtml: {
    type: Boolean,
    default: false,
  },
});

const resetTitle = (data) => {
  return `${data.title}(${QUESTION_TYPE[data.questionType]})`;
};

const formateAnswerOptions = (question) => {
  let options = [];
  if (question.questionType == 0) {
    options = [
      {
        text: "正确",
        value: "1",
        disable: props.showAnswer,
      },
      {
        text: "错误",
        value: "0",
        disable: props.showAnswer,
      },
    ];
    return options;
  }

  const questionItemList = question.questionItemList;
  for (let i = 0; i < questionItemList.length; i++) {
    options.push({
      text: LETTER[i] + "、" + questionItemList[i].title,
      value: i + "",
      disable: props.showAnswer,
    });
  }
  return options;
};

const emit = defineEmits(["update:modelValue"]);
const checkChange = (e) => {
  const value = e.detail.value;
  emit("update:modelValue", value);
  save2Local(value);
};
//保存信息到本地
const save2Local = (value) => {
  const data = props.data;
  let examAnswer = uni.getStorageSync(LOCAL_STORAGE_KEY.exam_answer.key);
  if (examAnswer == "") {
    examAnswer = {};
  }
  if (examAnswer[data.examId] == null) {
    examAnswer[data.examId] = {};
  }
  examAnswer[data.examId][data.questionId] = value;
  uni.setStorageSync(LOCAL_STORAGE_KEY.exam_answer.key, examAnswer);
};

const getAnswer = (item, answerType) => {
  const answer = answerType == 0 ? item.questionAnswer : item.userAnswer;
  if (answer == null) {
    return "";
  }
  if (item.questionType == 0) {
    return answer == "0" ? "错误" : "正确";
  } else {
    let answerArray = answer;
    if (!(answer instanceof Array)) {
      answerArray = answer.split(",");
    }
    const answerResult = [];
    answerArray.forEach((item) => {
      answerResult.push(LETTER[Number.parseInt(item)]);
    });
    return answerResult.join("、");
  }
};
</script>

<style lang="scss" scoped>
.question-item {
  overflow: auto;
  .question-content {
    padding: 10px;
    padding: 10px;
    :deep .uni-forms-item__label {
      display: none;
    }
    :deep .uni-forms-item {
      margin-bottom: 10px;
    }
    .title-info {
      align-items: top;
      line-height: 25px;
      .question-type {
        background: #0b93f4;
        color: #fff;
        font-weight: normal;
        padding: 1px 5px;
        border-radius: 3px;
        font-size: 13px;
      }
      .title {
        font-weight: bolder;
        display: inline;
        div {
          display: inline-block;
        }
      }
      .answer-result {
        width: 20px;
      }
      .iconfont {
        font-size: 30px;
      }
      .icon-ok {
        color: green;
      }
      .icon-wrong {
        color: red;
      }
    }
    .question-option {
      margin-top: 10px;
    }
    .question-answer {
      background: #efefef;
      padding: 5px 10px;
      font-weight: bold;
      border-radius: 3px;
      .answer {
        margin: 0px 15px 0px 5px;
        color: #0b93f4;
      }
      .my {
        color: #fb2e2e;
        margin-left: 5px;
      }
      .iconfont {
        float: right;
        font-size: 20px;
        font-weight: normal;
      }
      .icon-ok {
        color: #07b107;
      }
      .icon-wrong {
        color: #fb2e2e;
      }
    }
  }

  .line {
    background: #ececec;
    height: 10px;
  }

  .answer-analysis {
    padding: 10px;
    overflow: auto;
    .title {
      text-align: center;
      color: #767575;
      margin: 5px 0px 10px;
      .inner {
        font-weight: bolder;
        color: #1f282e;
      }
    }
    .part-title {
      font-size: 16px;
      line-height: 30px;
      font-weight: bold;
      color: #3e3e3e;
    }
    .difficulty-panel {
      display: flex;
      align-items: center;
      margin-top: 5px;
      .star {
        flex: 1;
        margin-left: 5px;
      }
    }
  }
  .rich-text {
    padding: 5px 0px;
    font-size: 16px;
  }
}
</style>
