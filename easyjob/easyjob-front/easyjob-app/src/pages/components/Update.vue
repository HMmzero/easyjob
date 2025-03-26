<template>
  <view>
    <Dialog
      ref="checkDialogRef"
      styleBg="none"
      styleBorder="none"
      :showCancel="false"
    >
      <view class="update-panel">
        <view class="update-img">
          <image src="@/static/update_bg.png" mode="widthFix"></image>
        </view>
        <view class="update-body">
          <view class="update-version">
            升级到最新版本V{{ updateInfo.version }}
          </view>
          <view class="file-siez">
            文件大小：{{ proxy.Utils.size2Str(updateInfo.size) }}
          </view>
          <view class="update-info-title">更新内容：</view>
          <view
            class="update-info"
            v-for="(item, index) in updateInfo.updateList"
          >
            {{ index + 1 }}、{{ item }}
          </view>
          <view class="update-progress" v-if="downloading">
            <progress
              :percent="downloadPercent.progress"
              show-info
              stroke-width="3"
            ></progress>
            <view class="update-tips">
              正在下载，请稍后({{
                proxy.Utils.size2Str(downloadPercent.totalBytesWritten)
              }}/{{
                proxy.Utils.size2Str(downloadPercent.totalBytesExpectedToWrite)
              }})
            </view>
          </view>
          <view class="update-btn" @click="updateApp" v-if="!downloading"
            >立即更新</view
          >
        </view>
        <view class="update-close" v-if="!downloading">
          <view class="iconfont icon-close" @click="close"></view>
        </view>
      </view>
    </Dialog>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
import { useAppInfoStore } from "@/stores/appInfo";
const appInfoStore = useAppInfoStore();
const { deviceId, appVersion } = appInfoStore.getInfo();

const checkDialogRef = ref();

const updateInfo = ref({});

const checkUpdate = async (showTips) => {
  downloading.value = false;
  let result = await proxy.Request({
    url: proxy.Api.checkUpdate,
    showLoading: showTips,
    params: {
      deviceId,
      appVersion: appVersion,
    },
  });
  if (!result) {
    return;
  }
  if (result.data == null) {
    if (showTips) {
      proxy.Message.success("已经是最新版");
    }
    return;
  }
  updateInfo.value = result.data;
  checkDialogRef.value.show();
};

const downloading = ref(false);
const downloadPercent = ref({
  progress: 0,
  totalBytesWritten: 0,
  totalBytesExpectedToWrite: 0,
});
const updateApp = () => {
  downloading.value = true;
  let downloadTask = uni.downloadFile({
    url:
      proxy.Api.domain + proxy.Api.downloadApp + "?id=" + updateInfo.value.id,
    success: (downloadResult) => {
      if (downloadResult.statusCode == 200) {
        close();
        plus.runtime.install(
          downloadResult.tempFilePath,
          { force: false },
          function () {
            plus.nativeUI.toast("安装成功");
            plus.runtime.restart();
          },
          function (e) {
            plus.nativeUI.toast("安装失败");
          }
        );
      }
    },
  });
  downloadTask.onProgressUpdate((res) => {
    downloadPercent.value = res;
  });
};

defineExpose({ checkUpdate });

const close = () => {
  checkDialogRef.value.close();
};
</script>

<style lang="scss" scoped>
.update-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .update-img {
    width: 100%;
    display: flex;
    align-items: center;
    image {
      width: 100%;
    }
  }
  .update-body {
    width: 100%;
    background: #fff;
    padding: 0px 10px 10px;
    border-radius: 0px 0px 10px 10px;
    .update-version {
      text-align: center;
      font-weight: bolder;
      color: #6c6c6c;
      margin: 0px 0px 5px;
    }
    .file-size {
      text-align: center;
      font-size: 13px;
      color: #6c6c6c;
    }
    .update-info-title {
      margin-bottom: 5px;
    }
    .update-info {
      font-size: 14px;
    }
    .update-btn {
      background: #1291ff;
      color: #fff;
      border-radius: 5px;
      text-align: center;
      padding: 8px;
      margin: 10px 0px;
    }
    .update-progress {
      margin: 10px 0px;
      .update-tips {
        text-align: center;
        font-size: 14px;
        color: #525151;
      }
    }
  }
  .update-close {
    margin-top: 15px;
    overflow: hidden;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #fff;
    background: #fff;
    .iconfont {
      font-size: 16px;
    }
  }
}
</style>
