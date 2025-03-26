<template>
  <Dialog
    ref="dialogRef"
    title="确认操作"
    :showCancel="true"
    okText="确定"
    :okFun="okFun"
  >
    <view class="confirm-info">
      <view class="iconfont icon-warning"></view>
      <view>{{ msg }}</view>
    </view>
  </Dialog>
</template>

<script setup>
import Dialog from "../Dialog.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
const dialogRef = ref();
const msg = ref();
const fun = ref();
const show = (_msg, _fun) => {
  dialogRef.value.show();
  msg.value = _msg;
  fun.value = _fun;
};

const okFun = () => {
  fun.value();
  dialogRef.value.close();
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.confirm-info {
  padding: 10px;
  display: flex;
  max-width: 90%;
  .iconfont {
    font-size: 18px;
    color: #7d7d7d;
    margin-right: 5px;
  }
}
</style>
