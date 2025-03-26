<template>
  <view class="time">
    <view>{{ format(hour) }}</view>
    <view>:</view>
    <view>{{ format(min) }}</view>
    <view>:</view>
    <view>{{ format(seconds) }}</view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  computed,
  onUnmounted,
} from "vue";
const { proxy } = getCurrentInstance();

const totalSeconds = ref(0);

const seconds = computed(() => {
  return totalSeconds.value % 60;
});

const min = computed(() => {
  return parseInt(totalSeconds.value / 60);
});

const hour = computed(() => {
  return parseInt(totalSeconds.value / 3600);
});

const format = (num) => {
  return num < 10 ? "0" + num : num;
};

const timer = ref();

const start = () => {
  timer.value = setInterval(() => {
    totalSeconds.value++;
  }, 1000);
};

const stop = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }
};

defineExpose({
  start,
  stop,
});

onUnmounted(() => {
  stop();
});
</script>

<style lang="scss" scoped>
.time {
  display: flex;
  padding: 0px 5px;
}
</style>
