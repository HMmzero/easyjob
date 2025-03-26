<template>
  <view>
    <Navbar :showLeft="true" title="我收藏的考题"></Navbar>
    <view class="question-list">
      <DataList
        :dataSource="dataSource"
        @loadData="loadDataList"
        :loadStatus="loadStatus"
      >
        <template #default="{ data }">
          <view class="list-item">
            <ExamQuestionItem :showAnswer="true" :data="data" :showHtml="true">
            </ExamQuestionItem>
          </view>
        </template>
      </DataList>
    </view>
  </view>
</template>

<script setup>
import ExamQuestionItem from "@/pages/exam/ExamQuestionItem.vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const dataSource = ref({});
const loadStatus = ref(null);
const loadDataList = async () => {
  loadStatus.value = "loading";
  let url = proxy.Api.myCollect;
  let result = await proxy.Request({
    url: url,
    params: {
      pageNo: dataSource.value.pageNo,
      collectType: 2,
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
  .list-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
</style>
