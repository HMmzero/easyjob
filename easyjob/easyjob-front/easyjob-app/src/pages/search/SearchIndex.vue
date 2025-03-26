<template>
  <view>
    <Navbar :showLeft="true">
      <template #default>
        <view class="search-panel">
          <uni-easyinput
            :clearable="false"
            v-model="keyword"
            placeholder="请输入关键词，至少三个字"
            prefixIcon="search"
            :suffixIcon="keyword ? 'closeempty' : ''"
            :trim="true"
            confirmType="搜索"
            @confirm="search"
            @input="inputChange"
            @iconClick="clearInput"
          >
          </uni-easyinput>
        </view>
      </template>
      <template #right>
        <view class="iconfont icon-search" @click="search"></view>
      </template>
    </Navbar>
    <view class="search-history" v-if="showSearch">
      <view class="search-title">搜索历史</view>
      <view class="tag-list">
        <Tag
          :dataList="searchList"
          @updateData="saveTag"
          @clickHandler="tagSearch"
        ></Tag>
      </view>
    </view>
    <view v-else>
      <view class="search-tab">
        <view
          :class="['tab-item', index == curTab ? 'active' : '']"
          v-for="(item, index) in tabList"
          @click="tabClick(index)"
          >{{ item }}</view
        >
      </view>
      <view :class="['result-list', curTab == 0 ? 'padding-data-list' : '']">
        <DataList
          :dataSource="dataSource"
          @loadData="loadDataList"
          :loadStatus="loadStatus"
        >
          <template #default="{ data, extParam }">
            <QuestionItem :data="data" v-if="data.curTab == 0"></QuestionItem>
            <view class="list-item" v-if="data.curTab == 1">
              <ExamQuestionItem
                :data="data"
                :showAnswer="true"
                :showHtml="true"
              ></ExamQuestionItem>
            </view>
            <view class="list-item" v-if="data.curTab == 2">
              <ShareItem :data="data"></ShareItem>
            </view>
          </template>
        </DataList>
      </view>
    </view>
  </view>
</template>

<script setup>
import Tag from "@/pages/components/common/Tag.vue";
import QuestionItem from "@/pages/question/QuestionItem.vue";
import ShareItem from "@/pages/share/ShareItem.vue";
import ExamQuestionItem from "@/pages/exam/ExamQuestionItem.vue";
import { LOCAL_STORAGE_KEY } from "@/utils/Constants.js";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const showSearch = ref(true);

const keyword = ref();

const searchList = ref(
  uni.getStorageSync(LOCAL_STORAGE_KEY.searchHistory.key) || []
);

const inputChange = (e) => {
  if (e == "") {
    showSearch.value = true;
  }
};

const clearInput = (e) => {
  keyword.value = "";
  showSearch.value = true;
};

const tagSearch = (tag) => {
  keyword.value = tag;
  search();
};

const saveTag = () => {
  uni.setStorageSync(LOCAL_STORAGE_KEY.searchHistory.key, searchList.value);
};

const search = () => {
  if (keyword.value == undefined || keyword.value.length < 3) {
    proxy.Message.error("请输入关键字");
    return;
  }
  showSearch.value = false;
  if (!searchList.value.includes(keyword.value)) {
    searchList.value.unshift(keyword.value);
    uni.setStorageSync(LOCAL_STORAGE_KEY.searchHistory.key, searchList.value);
  }

  dataSource.pageNo = 1;
  loadDataList();
};

const curTab = ref(0);
const tabList = ref(["八股文", "考题", "分享"]);

const tabClick = (index) => {
  curTab.value = index;
  dataSource.pageNo = 1;
  dataSource.list = [];
  loadDataList();
};

const dataSource = ref({});
const loadStatus = ref(null);

const loadDataList = async () => {
  if (keyword.value == undefined || keyword.value.length < 3) {
    uni.stopPullDownRefresh();
    return;
  }
  loadStatus.value = "loading";
  let result = await proxy.Request({
    url: proxy.Api.search,
    params: {
      keyword: keyword.value,
      pageNo: dataSource.value.pageNo || 1,
      type: curTab.value,
    },
  });
  if (!result) {
    return;
  }
  loadStatus.value = "more";
  const list = result.data.list;
  list.forEach((element) => {
    element.curTab = curTab.value;
    element.title = element.title.toLowerCase();
    element.title = element.title.replace(
      keyword.value,
      "<span style='color:red'>" + keyword.value + "</span>"
    );
  });
  dataSource.value = result.data;
};

loadDataList();

onReachBottom(() => {});
</script>

<style lang="scss" scoped>
:deep .uni-easyinput__content-input {
  height: 30px;
}

.search-panel {
  padding: 0px 8px 0px 5px;
}

.search-history {
  .search-title {
    padding: 10px;
    font-weight: bold;
    color: #505050;
  }
  .tag-list {
    padding: 0px 10px;
  }
}

.search-tab {
  background: #fff;
  z-index: 1;
  position: fixed;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 0px 5px;
  .tab-item {
    padding: 10px;
  }
  .active {
    border-bottom: 2px solid var(--theme);
  }
}
.result-list {
  padding-top: 50px;
}
.padding-data-list {
  padding: 50px 5px;
  .list-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
</style>
