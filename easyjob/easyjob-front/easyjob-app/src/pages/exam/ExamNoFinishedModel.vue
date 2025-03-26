<template>
  <Dialog
    ref="dialogRef"
    title="未完成的考试"
    :showCancel="false"
    okText="开启新考试"
    :okFun="close"
  >
    <view v-for="item in dataList">
      <ExamRecord :data="item" @reload="loadExam"> </ExamRecord>
    </view>
  </Dialog>
</template>

<script setup>
import ExamRecord from "./ExamRecord.vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
import { LOCAL_STORAGE_KEY } from "@/utils/Constants.js";
const dataList = ref([]);

const loadExam = async () => {
  let result = await proxy.Request({
    url: proxy.Api.loadNoFinishedExam,
    showLoading: true,
  });
  if (!result) {
    return;
  }
  if (result.data != null && result.data.length > 0) {
    dialogRef.value.show();
    dataList.value = result.data;
  } else {
    dialogRef.value.close();
  }
};

const dialogRef = ref();
onShow(() => {
  const token = uni.getStorageSync(LOCAL_STORAGE_KEY.token.key);
  if (!token) {
    return;
  }
  loadExam();
});

const close = () => {
  dialogRef.value.close();
};
</script>

<style lang="scss" scoped>
</style>
