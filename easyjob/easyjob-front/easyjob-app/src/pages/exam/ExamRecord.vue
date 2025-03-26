<template>
  <view class="exam-item">
    <view class="create-time">{{ data.remark || data.createTime }}</view>
    <view class="op-panel">
      <view class="op a-link" @click="reStart(data.examId)">{{
        data.status == 0 ? "继续" : "查看"
      }}</view>
      <view class="op a-link" @click="delExam(data.examId)">删除</view>
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
});

const emit = defineEmits(["reload"]);

const delExam = (examId) => {
  proxy.Confirm("确认要删除考试记录吗？", async () => {
    let result = await proxy.Request({
      url: proxy.Api.delExam,
      params: {
        examId,
      },
    });
    if (!result) {
      return;
    }
    proxy.Message.success("删除成功");
    emit("reload");
  });
};

const reStart = (examId) => {
  uni.navigateTo({
    url: "/pages/exam/ExamQuestion?examId=" + examId,
  });
};
</script>

<style lang="scss" scoped>
.exam-item {
  padding: 10px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  .op-panel {
    justify-content: flex-end;
    display: flex;
    .op {
      margin-left: 10px;
    }
  }
}
</style>
