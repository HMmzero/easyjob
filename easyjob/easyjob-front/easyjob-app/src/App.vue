<script setup>
import { onLaunch } from '@dcloudio/uni-app'
import { ref, shallowRef, getCurrentInstance, nextTick, computed } from 'vue'
import { LOCAL_STORAGE_KEY } from '@/utils/Constants.js'

const { proxy } = getCurrentInstance()

import { useAppInfoStore } from '@/stores/appInfo'
import { useQuestionCategoryStore } from '@/stores/questionCategory'

const appInfoStore = useAppInfoStore()
const quesitonCategoryStore = useQuestionCategoryStore()

//获取设备信息
const saveDeviceInfo = (e) => {
  let statusBar = 0 //状态栏高度
  // #ifdef MP
  statusBar = e.statusBarHeight
  if (e.platform === 'android') {
  }
  // #endif
  // #ifdef MP-WEIXIN
  statusBar = e.statusBarHeight
  // #endif

  // #ifdef MP-ALIPAY
  statusBar = e.statusBarHeight
  // #endif

  // #ifdef APP-PLUS
  statusBar = e.statusBarHeight
  // #endif

  // #ifdef H5
  statusBar = 0
  // #endif

  const navBarHeight = 45
  const deviceId = e.deviceId
  const deviceBrand = e.deviceBrand
  appInfoStore.setInfo(
    statusBar,
    navBarHeight,
    e.screenWidth,
    e.screenHeight,
    deviceId,
    deviceBrand,
    e.appWgtVersion
  )
  reportInfo({ deviceId, deviceBrand })
  autoLogin({ deviceId, deviceBrand })
}

//上报设备信息
const reportInfo = async ({ deviceId, deviceBrand }) => {
  await proxy.Request({
    url: proxy.Api.report,
    showLoading: false,
    showError: false,
    params: {
      deviceId,
      deviceBrand,
    },
  })
}

//自动登录
const autoLogin = async ({ deviceId, deviceBrand }) => {
  let token = uni.getStorageSync(LOCAL_STORAGE_KEY.token.key)
  if (token == '') {
    return
  }
  let result = await proxy.Request({
    url: proxy.Api.autoLogin,
    showLoading: false,
    showError: false,
    params: {
      token: token,
      deviceId,
      deviceBrand,
    },
  })
  if (!result) {
    return
  }
  if (result.data != null) {
    uni.setStorageSync(LOCAL_STORAGE_KEY.token.key, result.data)
  }
}

//获取分类数据
const loadCategoryData = async () => {
  let result = await proxy.Request({
    url: proxy.Api.loadAllCategory,
    params: {
      type: 0,
    },
    showLoading: false,
  })
  if (!result) {
    return
  }
  quesitonCategoryStore.setInfo(result.data)
}

onLaunch(() => {
  uni.getSystemInfo({
    success: (e) => {
      saveDeviceInfo(e)
    },
  })
  loadCategoryData()
})
</script>

<style>
</style>
