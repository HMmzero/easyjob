<template>
  <view class="notice">
    <uni-notice-bar
      show-icon
      text="左右滑动可以切换上、下一页"
      :showClose="true"
      @click="closeNotice"
      v-if="showNotice"
    ></uni-notice-bar>
  </view>
</template>

<script setup>
import { LOCAL_STORAGE_KEY } from "@/utils/Constants.js";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick, computed } from "vue";
const { proxy } = getCurrentInstance();

const showNotice = computed(() => {
  const show = uni.getStorageSync(LOCAL_STORAGE_KEY.show_notice_bar.key);
  return show === "" ? true : show;
});

const closeNotice = () => {
  uni.setStorageSync(LOCAL_STORAGE_KEY.show_notice_bar.key, false);
};
</script>

<style lang="scss" scoped>
.notice {
  :deep .uni-noticebar {
    margin-bottom: 0px;
  }
}
</style>
