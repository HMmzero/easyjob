<template>
  <view>
    <Navbar title="我的错题"></Navbar>
    <view class="question-list">
      <DataList
        :dataSource="dataSource"
        @loadData="loadDataList"
        :loadStatus="loadStatus"
      >
        <template #default="{ data, index }">
          <view class="list-item">
            <ExamQuestionItem
              :showAnswer="true"
              :data="data"
              :index="index"
              v-model="data.userAnswer"
            >
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
  let result = await proxy.Request({
    url: proxy.Api.myWrongQuestion,
    showLoading: false,
    params: {
      pageNo: dataSource.value.pageNo,
    },
  });
  if (!result) {
    return;
  }
  loadStatus.value = "more";
  result.data.list.forEach((element) => {
    if (element.questionType == 2) {
      element.userAnswer = element.userAnswer.split(",");
    }
  });
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
