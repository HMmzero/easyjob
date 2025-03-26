<template>
  <view>
    <Popup type="right" ref="categoryPoupRef">
      <view class="category-list">
        <view
          :class="['item', currentCategoryId == 0 ? 'active' : '']"
          @click="selectCategory({ categoryId: 0, categoryName: '全部分类' })"
        >
          全部分类
        </view>
        <view
          v-for="item in questionCategoryStore.getInfo()"
          :class="[
            'item',
            currentCategoryId == item.categoryId ? 'active' : '',
          ]"
          @click="selectCategory(item)"
        >
          {{ item.categoryName }}
        </view>
      </view>
    </Popup>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
import { useQuestionCategoryStore } from "@/stores/questionCategory";
const questionCategoryStore = useQuestionCategoryStore();

const categoryPoupRef = ref();
const currentCategoryId = ref(0);
const show = (category) => {
  currentCategoryId.value = category.categoryId;
  categoryPoupRef.value.show();
};

const emit = defineEmits(["select"]);

const selectCategory = (item) => {
  currentCategoryId.value = item.categoryId;
  emit("select", {
    categoryName: item.categoryName,
    categoryId: item.categoryId + "",
  });
  categoryPoupRef.value.close();
};
defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.category-list {
  .item {
    padding: 10px;
    font-size: 16px;
  }
  .active {
    color: #1a72f4;
  }
}
</style>
