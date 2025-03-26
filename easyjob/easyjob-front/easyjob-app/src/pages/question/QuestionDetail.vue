<template>
  <view>
    <Navbar title="八股文详情"> </Navbar>
    <ShowTips></ShowTips>
    <SlidePage @loadData="loadDataNext">
      <view class="question-detail">
        <view class="title-info">
          <QuestionItem :data="questionData" :showDetail="false"></QuestionItem>
        </view>
        <view class="question" v-if="questionData.question">
          <view class="question-title">问题描述</view>
          <uvParse
            class="rich-text"
            :content="questionData.question"
            :container-style="containerStyle"
          ></uvParse>
        </view>
        <view class="line"></view>
        <view
          class="question-content"
          v-if="readMode === '1' || (readMode === '0' && showAnswer)"
        >
          <view class="title">-<text class="inner">问题解析</text>-</view>
          <uvParse
            class="rich-text"
            :content="questionData.answerAnalysis"
            v-if="questionData.answerAnalysis"
            :container-style="containerStyle"
          ></uvParse>
        </view>
      </view>
    </SlidePage>

    <Footer
      :objectId="questionData.questionId + ''"
      :collectType="1"
      @updateCollect="updateCollect"
      :haveCollect="questionData.haveCollect"
    >
      <view class="page-op">
        <view class="btn btn-mode" @click="changeMode">
          <text>{{ readMode == "0" ? "背题模式" : "阅读模式" }}</text>
          <text class="iconfont icon-exchange"></text>
        </view>
        <view
          class="btn show-answer"
          v-if="readMode === '0'"
          @click="showAnswerHandler"
          >查看答案</view
        >
      </view>
    </Footer>
  </view>
</template>

<script setup>
import uvParse from "@/pages/components/uv-parse/components/uv-parse/uv-parse.vue";
import QuestionItem from "./QuestionItem.vue";
import { LOCAL_STORAGE_KEY } from "@/utils/Constants.js";

import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const loadDataNext = (_nextType) => {
  nextType.value = _nextType;
  loadDetail();
};

const questionData = ref({});
const currentId = ref();
const categoryId = ref();
const nextType = ref(null);

const loadDetail = async () => {
  let result = await proxy.Request({
    url: proxy.Api.getQuestionDetailNext,
    params: {
      currentId: currentId.value,
      categoryId: categoryId.value || "",
      nextType: nextType.value,
    },
  });
  if (!result) {
    return;
  }
  questionData.value = result.data;
  currentId.value = result.data.questionId;
};

onLoad((option) => {
  currentId.value = option.questionId;
  categoryId.value = option.categoryId;
  nextType.value = null;
  loadDetail();
});

const updateCollect = (haveCollect) => {
  questionData.value.haveCollect = haveCollect;
};

const readMode = ref(uni.getStorageSync(LOCAL_STORAGE_KEY.readMode.key) || "0"); //1 背题模式，展示答案  0:阅读模式，手动展示答案
const changeMode = () => {
  const _readMode = uni.getStorageSync(LOCAL_STORAGE_KEY.readMode.key);
  if (_readMode == "" || _readMode == "0") {
    uni.setStorageSync(LOCAL_STORAGE_KEY.readMode.key, "1");
    readMode.value = "1";
  } else {
    uni.setStorageSync(LOCAL_STORAGE_KEY.readMode.key, "0");
    readMode.value = "0";
  }
  showAnswer.value = false;
};

const showAnswer = ref(false);
const showAnswerHandler = () => {
  showAnswer.value = true;
};

const containerStyle = ref(
  "word-wrap:break-word;word-break:normal;word-break:break-all;"
);
</script>

<style lang="scss" scoped>
.rich-text {
  :deep * {
    white-space: pre-wrap !important;
  }
}
.question-detail {
  .question {
    padding: 10px;
    .question-title {
      font-weight: bold;
      font-size: 13px;
      line-height: 30px;
      color: #797878;
    }
    .detail {
      margin-top: 10px;
    }
  }
  .question-content {
    padding: 10px;
    font-size: 16px;
    .title {
      text-align: center;
      color: #767575;
      margin: 5px 0px 10px;
      .inner {
        font-weight: bolder;
        color: #1f282e;
      }
    }
  }
}

.page-op {
  display: flex;
  flex: 1;
  justify-content: space-around;
  font-size: 14px;
  .btn {
    width: 100%;
    margin: 0px 5px;
    padding: 8px 0px;
    color: #fff;
    border-radius: 5px;
    text-align: center;
  }
  .btn-mode {
    background: #6663cd;
    .iconfont {
      color: #fff;
      font-size: 14px;
      margin-left: 2px;
    }
  }
  .show-answer {
    background: #aa6bd9;
  }
}
</style>
