<template>
  <view>
    <Navbar :showLeft="true" title="分享详情"></Navbar>
    <ShowTips></ShowTips>
    <SlidePage ref="slidPageRef" @loadData="loadDataNext" :showFooter="true">
      <view class="share-detail">
        <ShareItem :data="shareData" :showDetail="false"></ShareItem>
        <image
          class="cover-full"
          v-if="shareData.coverType == 1"
          style="width: 100%; background-color: #eeeeee"
          mode="aspectFill"
          :src="proxy.Api.domain + proxy.Api.imageUrl + shareData.coverPath"
        ></image>
        <view class="detail">
          <uvParse :content="shareData.content"></uvParse>
        </view>
      </view>
    </SlidePage>
    <Footer
      :objectId="shareData.shareId + ''"
      :collectType="0"
      @updateCollect="updateCollect"
      :haveCollect="shareData.haveCollect"
    ></Footer>
  </view>
</template>

<script setup>
import uvParse from "@/pages/components/uv-parse/components/uv-parse/uv-parse.vue";
import ShareItem from "./ShareItem.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const currentId = ref();
const shareData = ref({});
const nextType = ref(null);

const loadDetail = async () => {
  let url = proxy.Api.getShareDetailNext;

  let result = await proxy.Request({
    url: url,
    params: {
      currentId: currentId.value,
      nextType: nextType.value,
    },
  });
  if (!result) {
    return;
  }
  shareData.value = result.data;
  currentId.value = result.data.shareId;
};

const loadDataNext = (_nextType) => {
  nextType.value = _nextType;
  loadDetail();
};

onLoad((option) => {
  currentId.value = option.shareId;
  loadDetail();
});

const updateCollect = (_haveCollect) => {
  shareData.value.haveCollect = _haveCollect;
};
</script>

<style lang="scss" scoped>
.share-detail {
  .detail {
    padding-top: 10px;
    padding: 10px;
  }
}
</style>
