<template>
  <template v-for="(item, index) in dataList">
    <slot
      :data="item"
      :index="index + (dataSource.pageNo - 1) * dataSource.pageSize"
    ></slot>
  </template>
  <uni-load-more iconType="circle" :status="_loadStatus"></uni-load-more>
</template>

<script setup>
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { ref, computed, watch } from "vue";

const props = defineProps({
  dataSource: {
    type: Object,
  },
  loadStatus: {
    type: String,
    default: "more", //“more”  loading  noMore
  },
});

const _loadStatus = computed(() => {
  if (
    props.loadStatus == "more" &&
    props.dataSource.pageTotal == props.dataSource.pageNo
  ) {
    return "noMore";
  }
  return props.loadStatus;
});
const dataList = ref([]);

const emit = defineEmits(["loadData"]);

onReachBottom(() => {
  if (
    _loadStatus.value == "loading" ||
    props.dataSource.pageNo >= props.dataSource.pageTotal
  ) {
    return;
  }
  props.dataSource.pageNo += 1;
  emit("loadData");
});

onPullDownRefresh(() => {
  props.dataSource.pageNo = 1;
  dataList.value = [];
  emit("loadData");
});

watch(
  () => props.dataSource.list,
  (newVal, oldVal) => {
    if (newVal) {
      if (props.dataSource.pageNo == null || props.dataSource.pageNo == 1) {
        dataList.value = newVal;
        return;
      }
      dataList.value = dataList.value.concat(newVal);
    }
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
</style>
