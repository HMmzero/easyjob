<template>
  <view>
    <Navbar :showLeft="showLeft" :title="categoryInfo.categoryName">
      <template #right>
        <view class="iconfont icon-more-line" @click="showCategory"></view>
      </template>
    </Navbar>
    <view>
      <view class="question-list">
        <DataList
          :dataSource="dataSrouce"
          @loadData="loadDataList"
          :loadStatus="loadStatus"
        >
          <template #default="{ data }">
            <QuestionItem
              :data="data"
              :categoryId="categoryInfo.categoryId"
              :showDetail="true"
            ></QuestionItem>
          </template>
        </DataList>
      </view>
    </view>
    <QuestionCategory
      ref="questionCategoryRef"
      @select="selectCategory"
    ></QuestionCategory>
  </view>
</template>

<script setup>
import QuestionCategory from "./QuestionCategory.vue";
import QuestionItem from "./QuestionItem.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  showLeft: {
    type: Boolean,
    default: true,
  },
});

const categoryInfo = ref({
  categoryId: "0",
  categoryName: "全部分类",
});

const dataSrouce = ref({});
const loadStatus = ref(null);
const loadDataList = async () => {
  loadStatus.value = "loading";
  let result = await proxy.Request({
    url: proxy.Api.loadQuestion,
    showLoading: false,
    params: {
      categoryId: categoryInfo.value.categoryId,
      pageNo: dataSrouce.value.pageNo || 1,
    },
  });
  if (!result) {
    return;
  }
  loadStatus.value = "more";
  dataSrouce.value = result.data;
};

loadDataList();

const questionCategoryRef = ref();
const showCategory = () => {
  questionCategoryRef.value.show(categoryInfo.value);
};

const selectCategory = (category) => {
  categoryInfo.value = Object.assign({}, category);
  loadDataList();
};

onLoad((options) => {
  if (Object.keys(options).length > 0) {
    let { categoryId, categoryName } = options;
    categoryName = decodeURIComponent(categoryName);
    categoryInfo.value = {
      categoryId,
      categoryName,
    };
  }
  loadDataList();
});
</script>

<style lang="scss" scoped>
.icon-more-line {
  text-align: right;
  font-size: 20px;
}
</style>
