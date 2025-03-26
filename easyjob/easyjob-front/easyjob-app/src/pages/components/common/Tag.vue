<template>
  <view>
    <view class="tab-list">
      <view class="tab-item" v-for="(item, index) in dataList">
        <view class="text" @click="clickHandler(item)">{{ item }}</view>
        <view
          v-if="showClose"
          class="iconfont icon-close"
          @click="del(index)"
        ></view>
      </view>
      <view v-if="dataList.length == 0" class="no-data">暂无记录</view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  },
  showClose: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["updateData", "clickHandler"]);
const del = (index) => {
  props.dataList.splice(index, 1);
  emit("updateData");
};

const clickHandler = (item) => {
  emit("clickHandler", item);
};
</script>

<style lang="scss" scoped>
.tab-list {
  display: flex;
  flex-wrap: wrap;
  .tab-item {
    background: #e8e8e8;
    border-radius: 3px;
    margin: 10px 10px 0px 0px;
    padding: 3px 10px;
    position: relative;
    .icon-close {
      position: absolute;
      right: -3px;
      top: -5px;
      font-size: 12px;
      margin-left: 2px;
      color: #808080;
    }
  }
}
.no-data {
  text-align: center;
  font-size: 14px;
}
</style>
