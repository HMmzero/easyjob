<template>
  <view
    class="detail"
    selectable="true"
    :style="{
      height: contentHeight + 'px',
      'padding-bottom': paddingBottom + 'px',
    }"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <slot></slot>
  </view>
</template>

<script setup>
import { LOCAL_STORAGE_KEY } from "@/utils/Constants.js";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick, computed } from "vue";
const { proxy } = getCurrentInstance();
import { useAppInfoStore } from "@/stores/appInfo";
const appInfoStore = useAppInfoStore();

const { screenHeight, statusBar, navBarHeight } = appInfoStore.getInfo();

const paddingBottom = 50;

const contentHeight = computed(() => {
  const show = uni.getStorageSync(LOCAL_STORAGE_KEY.show_notice_bar.key);
  let tipsHeight = 0;
  if (show === "") {
    tipsHeight = 42;
  }
  return screenHeight - statusBar - navBarHeight - 50 - tipsHeight;
});

const nextType = ref(null);
const startX = ref();
const startY = ref();
const touchstart = (e) => {
  const touch = e.changedTouches[0];
  startX.value = touch.clientX;
  startY.value = touch.clientY;
};

const emit = defineEmits(["loadData"]);

const touchend = (e) => {
  const touch = e.changedTouches[0];
  const endX = touch.clientX;
  const endY = touch.clientY;

  const moveX = endX - startX.value;
  const moveY = endY - startY.value;
  const absMovex = Math.abs(moveX);

  if (absMovex < 60 || absMovex == 0 || moveY > 50) {
    return;
  }
  //向左滑动
  if (moveX < 0) {
    nextType.value = 1;
  }
  if (moveX > 0) {
    nextType.value = -1;
  }
  startX.value = 0;
  startY.value = 0;
  emit("loadData", nextType.value);
};
</script>

<style lang="scss" scoped>
.detail {
  overflow: auto;
  word-break: break-all !important;
}
</style>
