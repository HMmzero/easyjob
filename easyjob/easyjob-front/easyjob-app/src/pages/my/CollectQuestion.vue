<template>
  <view>
    <Navbar :showLeft="true" title="我收藏的八股文"></Navbar>
    <view class="question-list">
      <DataList
        :dataSource="dataSource"
        @loadData="loadDataList"
        :loadStatus="loadStatus"
      >
        <template #default="{ data }">
          <QuestionItem :data="data"></QuestionItem>
        </template>
      </DataList>
    </view>
  </view>
</template>

<script setup>
import QuestionItem from "@/pages/question/QuestionItem.vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const dataSource = ref({});
const loadStatus = ref(null);
const loadDataList = async () => {
  loadStatus.value = "loading";
  let result = await proxy.Request({
    url: proxy.Api.myCollect,
    params: {
      pageNo: dataSource.value.pageNo,
      collectType: 1,
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
.question-list {
  padding: 10px;
}
</style>
