<template>
  <uni-popup ref="popupRef" :is-mask-click="false" type="center">
    <view
      class="popup"
      :style="{
        width: screen.screenWidth * 0.85 + 'px',
        background: styleBg ? styleBg : '',
        border: styleBorder ? styleBorder : '',
      }"
    >
      <view class="title" v-if="title">{{ title }}</view>
      <view
        class="content"
        :style="{ 'max-height': screen.screenHeight + 'px' }"
      >
        <slot name="default"></slot>
      </view>
      <view class="footer" v-if="showCancel || okFun">
        <view class="btn btn-cancel" @click="close" v-if="showCancel">{{
          cancelText
        }}</view>
        <view class="btn btn-ok" @click="okFun">{{ okText }}</view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick, computed } from "vue";
import { useAppInfoStore } from "@/stores/appInfo";
const { proxy } = getCurrentInstance();
const appInfoStore = useAppInfoStore();

const props = defineProps({
  styleBg: {
    type: String,
  },
  styleBorder: {
    type: String,
  },
  title: {
    type: String,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: "取消",
  },
  cancelFun: {
    type: Function,
  },
  okText: {
    type: String,
    default: "确定",
  },
  okFun: {
    type: Function,
  },
});

const screen = computed(() => {
  const { screenWidth, screenHeight } = appInfoStore.getInfo();
  return {
    screenWidth: screenWidth,
    screenHeight: screenHeight * 0.8,
  };
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
.popup {
  background: #fff;
  border-radius: 10px;
  border: 1px solid #ddd;
  .title {
    padding: 10px;
    text-align: center;
  }
  .content {
    width: 100%;
    padding: 0px 10px 10px;
    overflow: auto;
    min-width: 200px;
  }
  .footer {
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .btn {
      width: 100%;
      border-right: 1px solid #ddd;
      cursor: pointer;
      text-align: center;
      padding: 10px;
      &:last-child {
        border-right: none;
      }
    }
    .btn-ok {
      color: #007aff;
    }
  }
}
</style>
