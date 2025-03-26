<template>
  <view>
    <Navbar :showLeft="false" title="经验分享"></Navbar>
    <view class="share-list">
      <DataList :dataSource="dataSource" @loadData="loadDataList" :loadStatus="loadStatus">
        <template #default="{ data }">
          <ShareItem :data="data" :showDetail="true"></ShareItem>
        </template>
      </DataList>
    </view>
  </view>
</template>

<script setup>
import ShareItem from './ShareItem.vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const dataSource = ref({})
const loadStatus = ref(null)
const loadDataList = async () => {
  loadStatus.value = 'loading'
  let result = await proxy.Request({
    url: proxy.Api.loadShareInfo,
    params: {
      pageNo: dataSource.value.pageNo,
    },
  })
  if (!result) {
    return
  }
  loadStatus.value = 'more'
  dataSource.value = result.data
}

onLoad(() => {
  loadDataList()
})

onReachBottom(() => {})
</script>


<style>
page {
  background: #f3f3f3;
}
</style>
<style lang="scss" scoped>
.share-list {
  padding: 5px;
}
</style>
