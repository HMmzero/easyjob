<template>
  <view>
    <Navbar :showLeft="false">
      <view class="timer">
        <view class="title">耗时</view>
        <view>
          <TimerCountUp
            ref="timerCountUpRef"
            v-if="examInfo.status == 0"
          ></TimerCountUp>
          <view v-else>{{ examInfo.useTimeMin }}分钟</view>
        </view>
      </view>
    </Navbar>

    <view class="question-list">
      <uni-forms ref="formDataRef" :modelValue="formData">
        <swiper
          :current="currentIndex"
          class="swiper"
          @change="questionChange"
          :style="{ height: pageHeight + 'px' }"
        >
          <swiper-item
            v-for="(item, index) in formData.questionList"
            :key="index"
          >
            <ExamQuestionItem
              :data="item"
              :index="index"
              :showAnswer="examInfo.status == 1"
              v-model="formData.questionList[index].userAnswer"
              :showHtml="index == currentIndex"
              :height="pageHeight"
            ></ExamQuestionItem>
          </swiper-item>
        </swiper>
      </uni-forms>
    </view>
    <Footer
      :objectId="currentExamQuestion.questionId + ''"
      :haveCollect="currentExamQuestion.haveCollect"
      :collectType="2"
      @updateCollect="updateCollectHandler"
    >
      <view class="footer">
        <view class="btn-panel">
          <view class="btn" @click="submit" v-if="examInfo.status == 0"
            >交卷</view
          >
          <view class="btn" @click="back" v-else>返回</view>
        </view>
        <template v-if="examInfo.status == 1">
          <view class="iconfont icon-ok">{{ examInfo.rightCount }}</view>
          <view class="iconfont icon-wrong">{{ examInfo.wrongCount }}</view>
        </template>
        <view class="iconfont icon-more" @click="showQuestionList"
          >{{ currentIndex + 1 }}/{{ examInfo.totalCount }}</view
        >
      </view>
    </Footer>
    <Dialog
      title="开始考试"
      ref="startExamRef"
      :showCancel="false"
      :okFun="startExam"
      okText="开始答题"
    >
      <view class="question-total">
        <text>共</text>
        <text class="count">{{ examInfo.examQuestionList.length }}</text>
        <text>题</text>
      </view>
      <view>开始考试后不要将应用切换到后台</view>
      <view>点击“开始答题”开始计时</view>
    </Dialog>
    <ExamPostModel ref="postExamRef" @postExam="postExam"></ExamPostModel>

    <Popup ref="questionPopupRef">
      <view class="pop-question-list">
        <view
          class="question-item"
          :style="{ width: popItemWidth + 'px', height: popItemWidth + 'px' }"
          v-for="(item, index) in formData.questionList"
        >
          <view
            :class="[
              'item-inner',
              currentIndex == index ? 'active' : '',
              item.userAnswer ? 'answered' : '',
            ]"
            :style="{
              width: popItemWidth - 20 + 'px',
              height: popItemWidth - 20 + 'px',
              'border-radius': (popItemWidth - 20) / 2 + 'px',
            }"
            @click="selectQuestion(index)"
            >{{ index + 1 }}</view
          >
        </view>
      </view>
    </Popup>
  </view>
</template>

<script setup>
import { LETTER, QUESTION_TYPE, LOCAL_STORAGE_KEY } from "@/utils/Constants.js";
import ExamQuestionItem from "./ExamQuestionItem.vue";
import ExamPostModel from "./ExamPostModel.vue";
import TimerCountUp from "@/pages/components/common/TimerCountUp.vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  onMounted,
  computed,
} from "vue";
import { useAppInfoStore } from "@/stores/appInfo";
const { proxy } = getCurrentInstance();
const appInfoStore = useAppInfoStore();

const examId = ref();
onLoad((option) => {
  examId.value = option.examId;
  getExamQuestion();
});

const examInfo = ref({});
const startExamRef = ref();
const getExamQuestion = async () => {
  let result = await proxy.Request({
    url: proxy.Api.getExamQuestion,
    params: {
      examId: examId.value,
    },
  });
  if (!result) {
    return;
  }

  const _examInfo = result.data;
  const _questionList = result.data.examQuestionList;

  let rightCount = 0;
  let examAnswerLocal = uni.getStorageSync(LOCAL_STORAGE_KEY.exam_answer.key);
  _questionList.forEach((element) => {
    if (_examInfo.status == 0) {
      element.userAnswer = undefined;
      if (examAnswerLocal !== "") {
        const examAnswer = examAnswerLocal[_examInfo.examId];
        if (examAnswer != null) {
          element.userAnswer = examAnswer[element.questionId];
        }
      }
    } else if (_examInfo.status == 1 && element.questionType == 2) {
      element.userAnswer = element.userAnswer.split(",");
    }
    if (element.answerResult == 1) {
      rightCount++;
    }
  });

  _examInfo.totalCount = _questionList.length;
  _examInfo.rightCount = rightCount;
  _examInfo.wrongCount = _questionList.length - rightCount;
  examInfo.value = _examInfo;
  formData.value.questionList = _questionList;
  currentExamQuestion.value = _questionList[0];

  if (result.data.status == 0) {
    startExamRef.value.show();
  }
};

//开始考试
const timerCountUpRef = ref();
const startExam = async () => {
  let result = await proxy.Request({
    url: proxy.Api.startExam,
    params: {
      examId: examId.value,
    },
  });
  if (!result) {
    return;
  }
  startExamRef.value.close();
  timerCountUpRef.value.start();
};

//计算swiper高度
const pageHeight = computed(() => {
  const { statusBar, navBarHeight, screenHeight } = appInfoStore.getInfo();
  return screenHeight - statusBar - navBarHeight - 50;
});

const currentIndex = ref(0);
//选择题目
const currentExamQuestion = ref({});
const questionChange = (e) => {
  const { current, source } = e.detail;
  currentIndex.value = current;
  currentExamQuestion.value = formData.value.questionList[current];
};

const updateCollectHandler = (haveCollect) => {
  currentExamQuestion.value.haveCollect = haveCollect;
};

//提交考试
const formData = ref({
  questionList: [],
});
const formDataRef = ref();

const postExamRef = ref();
const submit = () => {
  formDataRef.value.validate(async (errors, value) => {
    if (errors) {
      //定位到没有选择的选项题目
      const questionItemList = formData.value.questionList;
      for (let i = 0; i < questionItemList.length; i++) {
        const item = questionItemList[i];
        if (item.userAnswer == undefined || item.userAnswer.length == 0) {
          currentIndex.value = i;
          break;
        }
      }
      return;
    }
    postExamRef.value.show();
  });
};

const postExam = async (remark) => {
  let params = {
    examId: examId.value,
  };
  const appExamQuestionList = [];
  const questionList = formData.value.questionList;
  questionList.forEach((item) => {
    let userAnswer = item.userAnswer;
    if (item.questionType == 2) {
      userAnswer = userAnswer.sort().join(",");
    }
    appExamQuestionList.push({
      userAnswer: userAnswer,
      questionId: item.questionId,
    });
  });

  params.appExamQuestionList = appExamQuestionList;
  params.remark = remark;
  let result = await proxy.Request({
    url: proxy.Api.postExam,
    params: params,
    dataType: "json",
  });
  if (!result) {
    return;
  }
  proxy.Message.success("考试提交成功");
  //关闭备注输入框
  postExamRef.value.close();
  //停止计时
  timerCountUpRef.value.stop();
  //获取问题
  getExamQuestion();
};

const back = () => {
  uni.navigateBack();
};

const questionPopupRef = ref();
const showQuestionList = () => {
  questionPopupRef.value.show();
};

const popItemWidth = computed(() => {
  const { screenWidth } = appInfoStore.getInfo();
  return screenWidth / 6;
});

const selectQuestion = (index) => {
  currentIndex.value = index;
  questionPopupRef.value.close();
};
</script>

<style lang="scss" scoped>
.timer {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  .title {
    margin-right: 5px;
  }
}
.question-total {
  text-align: center;
  .count {
    color: #7500fb;
    font-weight: bolder;
    font-size: 30px;
  }
}
.footer {
  display: flex;
  align-items: center;
  .btn-panel {
    flex: 1;
    color: #fff;
    background: #8f60df;
    text-align: center;
    border-radius: 5px;
    line-height: 40px;
    width: 120px;
    margin: 0px 10px;
  }

  .iconfont {
    color: #848484;
    &::before {
      margin-right: 3px;
      font-size: 20px;
    }
  }
  .icon-collect {
    width: 20px;
  }
  .collected {
    color: #fb2e2e;
  }
  .icon-ok {
    color: #07b107;
    width: 50px;
  }
  .icon-wrong {
    color: #fb2e2e;
    width: 50px;
  }
  .icon-more {
    color: #8f60df;
    width: 70px;
  }
}

.pop-question-list {
  max-height: calc(100vh - 200px);
  display: flex;
  flex-wrap: wrap;
  .question-item {
    padding: 10px;
    .item-inner {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ddd;
    }
    .active {
      color: #fff;
      background: #2caff6;
    }
    .answered {
      border: 1px solid #2caff6;
    }
  }
}
</style>
