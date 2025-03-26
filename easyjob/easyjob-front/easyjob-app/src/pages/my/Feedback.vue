<template>
  <view>
    <Navbar :showLeft="true" title="问题反馈">
      <template #right>
        <view class="eidt iconfont icon-edit" @click="showEdit"> </view>
      </template>
    </Navbar>
    <view class="feedback-list">
      <DataList :dataSource="dataSource" @loadData="loadDataList" :loadStatus="loadStatus">
        <template #default="{ data }">
          <view class="feed-item" @click="showReply(data)">
            <view class="feed-content">
              {{ data.content }}
            </view>
            <view class="feed-info">
              <view>
                <text class="iconfont icon-update-time"> </text>
                <text>
                  {{ proxy.Utils.dateformat(data.createTime) }}
                </text>
              </view>
              <view>
                状态：<text v-if="data.status == 1" :style="{ color: '#18bc37' }">已回复</text>
                <text v-else :style="{ color: '#e43d33' }">待回复</text>
              </view>
            </view>
          </view>
        </template>
      </DataList>
    </view>

    <FeedbackEdit ref="feedbackEditRef" @reload="loadDataList"></FeedbackEdit>
  </view>
</template>

<script setup>
import FeedbackEdit from './FeedBackEdit.vue'
import { onLoad, onReachBottom, onShow } from '@dcloudio/uni-app'
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()

const dataSource = ref({})
const loadStatus = ref(null)
const loadDataList = async () => {
  loadStatus.value = 'loading'
  let result = await proxy.Request({
    url: proxy.Api.loadFeedback,
    params: {
      pageNo: dataSource.value.pageNo,
      pFeedbackId: 0,
    },
  })
  if (!result) {
    return
  }
  loadStatus.value = 'more'
  dataSource.value = result.data
}

onShow(() => {
  loadDataList()
})

onReachBottom(() => {})

const feedbackEditRef = ref()
const showEdit = () => {
  feedbackEditRef.value.show({ pFeedbackId: 0 })
}

const showReply = (data) => {
  uni.navigateTo({
    url: '/pages/my/FeedbackReply?pFeedbackId=' + data.feedbackId,
  })
}
</script>

<style lang="scss" scoped>
.eidt {
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}

.feedback-list {
  .feed-item {
    border-bottom: 5px solid #ddd;
    padding: 10px;
    .feed-content {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .feed-info {
      margin-top: 10px;
      display: flex;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      .iconfont {
        &::before {
          margin-right: 5px;
          color: #747474;
        }
      }
    }

    &:last-child {
      border: none;
    }
  }
}
</style>
