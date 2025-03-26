<template>
  <uni-popup ref="popupRef" :type="type" background-color="#fff">
    <view class="pop-body" :style="{ 'padding-top': paddingTop + 'px' }">
      <slot></slot>
    </view>
  </uni-popup>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick, computed } from "vue";
const { proxy } = getCurrentInstance();

import { useAppInfoStore } from "@/stores/appInfo";
const appInfoStore = useAppInfoStore();

const props = defineProps({
  type: {
    type: String,
    default: "bottom",
  },
});

const paddingTop = computed(() => {
  if (props.type == "bottom") {
    return 0;
  } else {
    const { statusBar, navBarHeight } = appInfoStore.getInfo();
    return statusBar + navBarHeight;
  }
});

const popupRef = ref();
const show = () => {
  popupRef.value.open();
};

const close = () => {
  popupRef.value.close();
};

defineExpose({
  show,
  close,
});
</script>

<style lang="scss" scoped>
</style>
