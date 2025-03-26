<template>
  <view class="question-item" @click="showDetailHandler(data)">
    <view class="title-info">
      <text class="title">
        <rich-text :nodes="data.title"></rich-text>
      </text>
    </view>
    <view class="difficulty">
      <uni-rate
        :readonly="true"
        size="18"
        :value="data.difficultyLevel"
        activeColor="#aa6bd9"
      ></uni-rate>
    </view>
    <view class="question-info">
      <view class="user-info">
        <text class="iconfont icon-use icon-data"></text>
        <text>{{ data.createUserName }}</text>
        <text class="dot"></text>
        <text>{{ proxy.Utils.dateformat(data.createTime) }}</text>
      </view>
      <view class="read-count">
        <text class="iconfont icon-eye icon-data"></text>
        <text>{{ data.readCount }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  data: {
    type: Object,
  },
  showDetail: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: String,
  },
});

const showDetailHandler = (data) => {
  if (!props.showDetail) {
    return;
  }
  let url = `/pages/question/QuestionDetail?questionId=${
    data.questionId
  }&categoryId=${props.categoryId || ""}`;
  uni.navigateTo({
    url: url,
  });
};
</script>

<style lang="scss" scoped>
.question-item {
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 5px solid #ececec;
  .title-info {
    color: #414141;
    font-size: 16px;
    font-weight: bold;
  }
  .difficulty {
    margin-top: 10px;
  }
  .question-info {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #aaaaaa;
    .user-info {
      .dot {
        display: inline-block;
        width: 3px;
        height: 3px;
        background-color: #919191;
        border-radius: 50%;
        vertical-align: middle;
        margin: 0px 5px;
      }
    }
  }
}
</style>
