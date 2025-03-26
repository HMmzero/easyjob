<template>
  <view>
    <Navbar :showLeft="true" title="我收藏的分享"></Navbar>
    <view class="share-list">
      <DataList
        :dataSource="dataSource"
        @loadData="loadDataList"
        :loadStatus="loadStatus"
      >
        <template #default="{ data }">
          <ShareItem :data="data" :showDetail="true"></ShareItem>
        </template>
      </DataList>
    </view>
  </view>
</template>

<script setup>
import ShareItem from "@/pages/share/ShareItem.vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const dataSource = ref({});
const loadStatus = ref(null);

const loadDataList = async () => {
  loadStatus.value = "loading";
  let result = await proxy.Request({
    url: proxy.Api.myCollect,
    showLoading: false,
    params: {
      pageNo: dataSource.value.pageNo,
      collectType: 0,
    },
  });
  if (!result) {
    return;
  }
  loadStatus.value = "more";
  dataSource.value = result.data;
};

onLoad((options) => {
  loadDataList();
});
onReachBottom(() => {});
</script>

<style lang="scss" scoped>
</style>
