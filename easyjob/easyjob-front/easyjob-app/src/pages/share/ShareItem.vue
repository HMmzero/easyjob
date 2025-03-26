<template>
  <view class="share-item" @click="showDetailHandler(data)">
    <view class="title-panel">
      <view class="title">
        <rich-text :nodes="data.title"></rich-text>
      </view>
      <image class="cover-img" :src="proxy.Api.domain + proxy.Api.imageUrl + data.coverPath" mode="aspectFill"
        v-if="data.coverType == 2 && showDetail"></image>
    </view>
    <image class="cover-full" v-if="data.coverType == 1 && showDetail" style="width: 100%; background-color: #eeeeee"
      mode="aspectFill" :src="proxy.Api.domain + proxy.Api.imageUrl + data.coverPath"></image>
    <view class="share-info">
      <view class="user-info">
        <text class="iconfont icon-user-icon-data"></text>
        <text>{{ data.createUserName }}</text>
        <text class="dot"></text>
        <text>{{ proxy.Utils.dateformat(data.createTime) }}</text>
      </view>
      <view class="read-count">
        <text class="iconfont icon-eye icon-data"></text>
        <text>{{ data.readCount }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()

const props = defineProps({
  data: {
    type: Object,
  },
  showDetail: {
    type: Boolean,
  },
})

const showDetailHandler = (data) => {
  if (!props.showDetail) {
    return
  }
  let url = `/pages/share/ShareDetail?shareId=${data.shareId}`
  uni.navigateTo({
    url: url,
  })
}
</script>

<style lang="scss" scoped>
.share-item {
  margin-top: 10px;
  background: #fff;
  border-radius: 5px;
  .cover-full {
    margin-bottom: 5px;
    width: 100%;
  }
  .title-panel {
    padding: 10px;
    display: flex;
    .title {
      flex: 1;
      color: #414141;
      font-size: 16px;
      font-weight: bold;
    }
    .cover-img {
      border-radius: 5px;
      overflow: hidden;
      width: 60px;
      height: 60px;
      margin-left: 5px;
    }
  }

  .share-info {
    color: #aaaaaa;
    padding: 6px 10px 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    .user-info {
      .dot {
        display: inline-block;
        width: 3px;
        height: 3px;
        background-color: #919191;
        border-radius: 50%;
        vertical-align: middle;
        margin: 0px 5px;
      }
    }
  }
}
</style>
