<template>
  <QuestionList :showLeft="false"></QuestionList>
</template>

<script setup>
import { onReachBottom } from "@dcloudio/uni-app";
import QuestionList from "./QuestionList.vue";

onReachBottom(() => {});
</script>

<style lang="scss" scoped>
</style>
