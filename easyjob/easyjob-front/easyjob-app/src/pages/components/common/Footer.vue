<template>
  <view class="footer">
    <view
      :class="['iconfont icon-collect', haveCollect ? 'collected' : '']"
      @click="doCollect"
    >
    </view>
    <view class="other">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  haveCollect: {
    type: Boolean,
    default: false,
  },
  objectId: {
    type: String,
  },
  collectType: {
    type: Number,
  },
});
const emit = defineEmits(["updateCollect"]);
const doCollect = async () => {
  let api = proxy.Api.addCollect;
  if (props.haveCollect) {
    api = proxy.Api.cancelCollect;
  }
  let result = await proxy.Request({
    url: api,
    params: {
      objectId: props.objectId,
      collectType: props.collectType,
    },
  });
  if (!result) {
    return;
  }
  if (props.haveCollect) {
    proxy.Message.success("取消成功");
  } else {
    proxy.Message.success("收藏成功");
  }
  emit("updateCollect", !props.haveCollect);
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 50px;
  bottom: 0px;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  .iconfont {
    color: #848484;
    font-size: 25px;
    &::before {
      margin-right: 3px;
    }
  }
  .icon-collect {
    width: 30px;
  }
  .collected {
    color: #7e4cb1;
  }
  .other {
    flex: 1;
  }
}
</style>
