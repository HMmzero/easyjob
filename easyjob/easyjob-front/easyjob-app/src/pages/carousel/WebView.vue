<template>
  <web-view :src="url"></web-view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const url = ref();
onLoad((option) => {
  url.value = option.url;
});
</script>

<style lang="scss" scoped>
</style>
