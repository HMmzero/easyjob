<template>
  <view>
    <Navbar :showLeft="false" title="在线考试"></Navbar>
    <view class="exam">
      <view class="category-title">请选择分类</view>
      <uni-data-checkbox
        mode="list"
        v-model="categoryIds"
        multiple
        :localdata="categoryList"
        :map="{
          text: 'categoryName',
          value: 'categoryId',
        }"
      />
      <view class="select-all">
        <uni-data-checkbox
          v-model="selectAll"
          @change="selectAllHandler"
          multiple
          :localdata="[{ value: 1, text: '不怂，全勾上!' }]"
        />
      </view>
      <view class="btn-panel">
        <button type="primary" @click="createExam">开始考试</button>
      </view>
      <view class="tips">选择你想检测的分类，进行考试</view>
    </view>

    <!--获取用户未完成的考试-->
    <ExamNoFinishedModel></ExamNoFinishedModel>
  </view>
</template>

<script setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
import ExamNoFinishedModel from "./ExamNoFinishedModel.vue";
import { LOCAL_STORAGE_KEY } from "@/utils/Constants.js";
const { proxy } = getCurrentInstance();

import { usePageOpStore } from "@/stores/pageOp";
const pageOpStore = usePageOpStore();

onShow(() => {
  categoryIds.value = [];
  selectAll.value = undefined;
  pageOpStore.setOp(false, true);
});

const categoryList = ref([]);
const loadData = async () => {
  let result = await proxy.Request({
    url: proxy.Api.loadAllCategory,
    params: {
      type: 1,
    },
    showLoading: false,
  });
  if (!result) {
    return;
  }
  categoryList.value = result.data;
};
loadData();

const selectAll = ref();
const selectAllHandler = (e) => {
  if (e.detail.value.length == 0) {
    categoryIds.value = [];
  } else {
    categoryIds.value = categoryList.value.map((item) => {
      return item.categoryId;
    });
  }
};

//创建考试
const categoryIds = ref([]);
const createExam = async () => {
  if (categoryIds.value.length == 0) {
    proxy.Message.warning("请选择分类");
    return;
  }
  const token = uni.getStorageSync(LOCAL_STORAGE_KEY.token.key);
  if (token == "" || token == null) {
    uni.navigateTo({
      url: "/pages/account/LoginAndRegister",
    });
    return;
  }

  let result = await proxy.Request({
    url: proxy.Api.createExam,
    params: {
      categoryIds: categoryIds.value.join(","),
    },
  });
  if (!result) {
    return;
  }
  uni.navigateTo({
    url: "./ExamQuestion?examId=" + result.data.examId,
  });
};
</script>

<style lang="scss" scoped>
.exam {
  padding: 10px;
  .category-title {
    font-weight: bolder;
    padding: 10px 5px;
  }
  .btn-panel {
    margin-top: 10px;
    uni-button[type="primary"] {
      background: #6e80e5;
    }
  }

  .select-all {
    margin-top: 20px;
  }

  .tips {
    font-size: 14px;
    margin-top: 10px;
    color: #7f7f7f;
  }
}
</style>
