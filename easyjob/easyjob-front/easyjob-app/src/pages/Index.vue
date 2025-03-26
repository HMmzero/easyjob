<template>
  <Navbar :showLeft="false" title="EasyJob"></Navbar>
  <view class="content">
    <view class="uni-margin-wrap">
      <swiper class="swiper-box" indicator-dots autoplay="true">
        <swiper-item v-for="(item, index) in carouselList" :key="index">
          <view class="swiper-item">
            <image
              @click="swiperJump(item)"
              :src="proxy.Api.domain + proxy.Api.imageUrl + item.imgPath"
              mode="aspectFill"
              :style="{ width: '100%' }"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="quick-list">
      <view class="quick-item search" @click="goSearch">
        <view class="title">搜索入口</view>
        <view class="summary">支持通过关键词搜索</view>
        <view class="btn">去搜索</view>
      </view>
      <view class="quick-item interview" @click="goExam">
        <view class="title">在线考试</view>
        <view class="summary">考考你学的怎么样了</view>
        <view class="btn">去考试</view>
      </view>
    </view>
    <view class="category-title">八股文分类</view>
    <view class="category-list">
      <uni-grid :column="3" :show-border="false" :square="false">
        <uni-grid-item
          v-for="(item, index) in questionCategoryStore.getInfo()"
          :index="index"
          :key="index"
        >
          <view class="category-item">
            <view
              class="category-item-inner"
              :style="{ background: item.bgColor }"
              @click="goQuestion(item)"
            >
              <image
                v-if="item.iconPath"
                :style="{ width: '100%', height: '100px' }"
                :src="proxy.Api.domain + proxy.Api.imageUrl + item.iconPath"
                mode="aspectFill"
              ></image>
              <view v-else>{{ item.categoryName }}</view>
            </view>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
    <Update ref="updateRef"></Update>
  </view>
</template>

<script setup>
import Update from "@/pages/components/Update.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const updateRef = ref();
const checkUpdate = () => {
  nextTick(() => {
    updateRef.value.checkUpdate(false);
  });
};
checkUpdate();
import { useQuestionCategoryStore } from "@/stores/questionCategory";
const questionCategoryStore = useQuestionCategoryStore();

const carouselList = ref([]);

const loadCarouselData = async () => {
  let result = await proxy.Request({
    url: proxy.Api.loadCarousel,
    showLoading: false,
  });
  if (!result) {
    return;
  }
  carouselList.value = result.data;
};

loadCarouselData();

const goExam = () => {
  uni.switchTab({
    url: "./exam/ExamIndex",
  });
};

const swiperJump = (data) => {
  let url = `/pages/share/ShareDetail?shareId=${data.objectId}`;
  if (data.objectType == 1) {
    url = `/pages/question/QuestionDetail?questionId=${data.objectId}`;
  } else if (data.objectType == 2) {
    url = `/pages/carousel/ExamQuestion?questionId=${data.objectId}`;
  } else if (data.objectType == 3) {
    url = `/pages/carousel/WebView?url=${encodeURI(data.outerLink)}`;
  }
  uni.navigateTo({
    url: url,
  });
};

const goSearch = () => {
  uni.navigateTo({
    url: `/pages/search/SearchIndex`,
  });
};

const goQuestion = (item) => {
  uni.navigateTo({
    url: `/pages/question/QuestionList?categoryId=${
      item.categoryId
    }&categoryName=${encodeURIComponent(item.categoryName)}`,
  });
};
</script>

<style lang="scss" scoped>
.top {
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #9005fa;
  height: 40px;

  .logo {
    color: #fff;
    font-size: 20px;
  }

  .search {
    font-size: 25px;
    color: #fff;
  }
}

.uni-margin-wrap {
  width: 100%;
  background: #e0e0e0;
  .swiper-box {
    height: 200px;
  }
  .swiper-item {
    justify-content: center;
    align-items: center;
    display: flex;
    height: 200px;
  }
}

.quick-list {
  display: flex;
  margin-top: 20px;

  .quick-item {
    width: 100%;
    margin: 0px 5px;
    border-radius: 5px;
    padding: 15px;
    color: #fff;

    .title {
      font-weight: bold;
    }

    .summary {
      font-size: 14px;
      margin-top: 2px;
    }

    .btn {
      margin-top: 10px;
      float: left;
      font-size: 12px;
      border-radius: 5px;
      padding: 4px 10px 4px 10px;
    }
  }

  .search {
    background: #6663cd;

    .btn {
      background: #8891ed;
    }
  }

  .interview {
    background: #aa6bd9;
    .btn {
      background: #874ec1;
    }
  }
}

.category-title {
  margin-top: 20px;
  padding-left: 10px;
  font-weight: bolder;
  color: #464646;
}
.category-list {
  margin-top: 10px;
  overflow: hidden;
  padding: 0px 5px 10px 5px;
  .category-item {
    padding: 3px;
    .category-item-inner {
      height: 100px;
      border-radius: 5px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 20px;
      overflow: hidden;
    }
  }
}
</style>
