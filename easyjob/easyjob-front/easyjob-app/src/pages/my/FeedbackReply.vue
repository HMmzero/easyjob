<template>
  <view>
    <Navbar :showLeft="true" title="问题反馈">
      <template #right>
        <view class="eidt iconfont icon-edit" @click="showEdit"> </view>
      </template>
    </Navbar>
    <view class="feedback-list">
      <view class="feed-item" v-for="data in dataList">
        <view class="feed-content-my" v-if="data.sendType == 0">
          <view class="content-panel">
            <view class="time">{{ data.createTime }}</view>
            <view class="content">{{ data.content }}</view>
          </view>
          <view class="icon">我</view>
        </view>
        <view class="feed-content-other" v-else>
          <view class="icon">管理员</view>
          <view class="content-panel">
            <view class="time">{{ data.createTime }}</view>
            <view class="content">{{ data.content }}</view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="dataList.length == 0" class="no-data">暂无回复</view>

    <FeedbackEdit ref="feedbackEditRef" @reload="loadDataList"></FeedbackEdit>
  </view>
</template>

<script setup>
import FeedbackEdit from "./FeedBackEdit.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const pFeedbackId = ref(0);

const dataList = ref([]);
const loadDataList = async () => {
  let result = await proxy.Request({
    url: proxy.Api.loadFeedbackReply,
    params: {
      pFeedbackId: pFeedbackId.value,
    },
  });
  if (!result) {
    return;
  }
  dataList.value = result.data;
};

onLoad((option) => {
  pFeedbackId.value = option.pFeedbackId;
  loadDataList();
});

const feedbackEditRef = ref();
const showEdit = () => {
  feedbackEditRef.value.show({ pFeedbackId: pFeedbackId.value });
};
</script>

<style lang="scss" scoped>
.eidt {
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}

.feedback-list {
  padding: 10px;
  .feed-item {
    margin-bottom: 20px;
    .icon {
      font-size: 13px;
      display: flex;
      border-radius: 10px;
      width: 50px;
      height: 50px;
      background: #9005fa;
      color: #fff;
      align-items: center;
      justify-content: center;
    }
    .content {
      display: inline-block;
      margin-top: 2px;
      padding: 8px;
      color: #474747;
      border-radius: 5px;
      text-align: left;
    }
    .content-panel {
      flex: 1;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        background: #66f470;
        transform: rotate(45deg);
        border-radius: 2px;
        top: 30px;
      }
    }
    .feed-content-my {
      display: flex;
      padding-left: 60px;
      .icon {
        margin-left: 10px;
      }
      .content-panel {
        text-align: right;
        .time {
          font-size: 13px;
          text-align: right;
        }
        .content {
          background: #66f470;
        }
        &::after {
          right: -4px;
        }
      }
    }

    .feed-content-other {
      display: flex;
      padding-right: 60px;
      .icon {
        margin-right: 10px;
      }
      .content-panel {
        flex: 1;
        position: relative;
        .time {
          font-size: 13px;
          text-align: left;
        }
        .content {
          background: #dedede;
        }
        &::after {
          left: -4px;
          background: #dedede;
        }
      }
    }
  }
}
</style>
