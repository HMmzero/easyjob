<template>
  <view>
    <Navbar :showLeft="true" title="我的考试记录"></Navbar>
    <DataList
      :dataSource="dataSource"
      @loadData="loadDataList"
      :loadStatus="loadStatus"
    >
      <template #default="{ data }">
        <ExamRecord :data="data"></ExamRecord>
      </template>
    </DataList>
  </view>
</template>

<script setup>
import ExamRecord from "@/pages/exam/ExamRecord.vue";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
const { proxy } = getCurrentInstance();

const dataSource = ref({});
const loadStatus = ref(null);
const loadDataList = async () => {
  loadStatus.value = "loading";
  let result = await proxy.Request({
    url: proxy.Api.myExamList,
    params: {
      pageNo: dataSource.value.pageNo,
    },
  });
  if (!result) {
    return;
  }
  loadStatus.value = "more";
  dataSource.value = result.data;
};
onLoad(() => {
  loadDataList();
});
onReachBottom(() => {});
</script>

<style lang="scss" scoped>
</style>
