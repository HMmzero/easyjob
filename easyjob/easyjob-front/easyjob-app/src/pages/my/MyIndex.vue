<template>
  <view>
    <Navbar :showLeft="false" title="个人中心"></Navbar>
    <view class="user-body">
      <view class="base-info">
        <view class="avatar">
          <view
            v-if="Object.keys(userInfo).length === 0"
            @click="goLogin"
            class="avatar-no-img no-login"
            >未登录</view
          >
          <template v-else>
            <image
              class="avatar-img"
              v-if="userInfo.avatar"
              @click="uploadAvatar"
              :src="`${proxy.Api.domain}${proxy.Api.imageUrl}${userInfo.avatar}?${avatarLastUpdate}`"
              mode="aspectFit"
            ></image>
            <view class="avatar-no-img" @click="uploadAvatar" v-else>{{
              userInfo.nickName.split("")[0]
            }}</view>
          </template>
        </view>
        <view class="user-info" v-if="Object.keys(userInfo).length > 0">
          <view class="nick-name">
            <view>{{ userInfo.nickName }}</view>
            <view class="iconfont icon-edit" @click="editInfo"></view>
            <view class="iconfont icon-logout" @click="logout"></view>
          </view>
          <view class="join-time">
            <view class="sex">
              <view v-if="userInfo.sex == null">未知</view>
              <view v-if="userInfo.sex == 1">男</view>
              <view v-if="userInfo.sex == 0">女</view>
            </view>
            <view class="line">|</view>
            {{ proxy.Utils.dateformat(userInfo.joinTime) }} 加入
          </view>
        </view>
      </view>

      <view class="part-list">
        <view class="part-title collect">收藏</view>
        <view class="item-list">
          <uni-grid :column="3" :show-border="false" :square="false">
            <uni-grid-item
              v-for="(item, index) in collectList"
              :index="index"
              :key="index"
              @click="jump(item)"
            >
              <view class="item">
                <view
                  :class="['iconfont', item.icon]"
                  :style="{ color: item.color }"
                ></view>
                <view class="text">{{ item.text }}</view>
              </view>
            </uni-grid-item>
          </uni-grid>
        </view>
      </view>

      <view class="part-list">
        <view class="part-title collect">积累</view>
        <view class="item-list">
          <uni-grid :column="2" :show-border="false" :square="false">
            <uni-grid-item
              v-for="(item, index) in accumulationList"
              :index="index"
              :key="index"
              @click="jump(item)"
            >
              <view class="item">
                <view
                  :class="['iconfont', item.icon]"
                  :style="{ color: item.color }"
                ></view>
                <view class="text">{{ item.text }}</view>
              </view>
            </uni-grid-item>
          </uni-grid>
        </view>
      </view>
      <view class="part-list">
        <view class="part-title collect">服务</view>
        <view class="item-list">
          <uni-grid :column="2" :show-border="false" :square="false">
            <uni-grid-item
              v-for="(item, index) in serviceList"
              :index="index"
              :key="index"
              @click="jump(item)"
            >
              <view class="item">
                <view
                  :class="['iconfont', item.icon]"
                  :style="{ color: item.color }"
                ></view>
                <view class="text">{{ item.text }}</view>
              </view>
            </uni-grid-item>
          </uni-grid>
        </view>
      </view>
    </view>

    <MyEditInfo ref="myEditInfoRef" @reload="getUserInfo"></MyEditInfo>
    <Update ref="updateRef"></Update>
  </view>
</template>

<script setup>
import MyEditInfo from "./MyEditInfo.vue";
import Update from "@/pages/components/Update.vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
import { LOCAL_STORAGE_KEY } from "@/utils/Constants.js";

const updateRef = ref();
const checkUpdate = () => {
  updateRef.value.checkUpdate(true);
};

const jump = (item) => {
  if (item.needLogin) {
    const token = uni.getStorageSync(LOCAL_STORAGE_KEY.token.key);
    if (token == "" || token == null) {
      uni.navigateTo({
        url: "/pages/account/LoginAndRegister",
      });
      return;
    }
  }
  if (item.clickFun) {
    item.clickFun();
    return;
  }
  uni.navigateTo({
    url: item.path,
  });
};

const collectList = ref([
  {
    text: "八股文",
    icon: "icon-question",
    path: "/pages/my/CollectQuestion",
    color: "#a294e8",
    needLogin: true,
  },
  {
    text: "考题",
    icon: "icon-exam1",
    path: "/pages/my/CollectExamQuestion",
    color: "#a294e8",
    needLogin: true,
  },
  {
    text: "分享",
    icon: "icon-share",
    path: "/pages/my/CollectShare",
    color: "#a294e8",
    needLogin: true,
  },
]);

const accumulationList = ref([
  {
    text: "我的考试",
    icon: "icon-exam1",
    color: "#a294e8",
    path: "/pages/my/ExamList",
    needLogin: true,
  },
  {
    text: "我的错题集",
    icon: "icon-wrong-question",
    color: "#a294e8",
    path: "/pages/my/WrongExamQuestion",
    needLogin: true,
  },
]);
const serviceList = ref([
  {
    text: "问题反馈",
    icon: "icon-email",
    path: "/pages/my/Feedback",
    color: "#6e80e5",
    needLogin: true,
  },
  {
    text: "检查更新",
    icon: "icon-update",
    color: "#6e80e5",
    needLogin: false,
    clickFun: checkUpdate,
  },
]);

//退出
const logout = () => {
  proxy.Confirm("确定要退出吗？", () => {
    uni.removeStorageSync(LOCAL_STORAGE_KEY.token.key);
    userInfo.value = {};
  });
};
const goLogin = () => {
  uni.navigateTo({
    url: "/pages/account/LoginAndRegister",
  });
};

//更新头像
const uploadAvatar = () => {
  uni.chooseImage({
    mediaType: ["image"],
    sourceType: ["camera", "album"],
    sizeType: ["compressed"],
    count: 1,
    success: function (res) {
      let header = {
        token: uni.getStorageSync(LOCAL_STORAGE_KEY.token.key),
      };
      uni.showLoading();
      uni.uploadFile({
        url: proxy.Api.domain + proxy.Api.uploadAvatar,
        filePath: res.tempFilePaths[0],
        name: "file",
        header,
        complete: (e) => {
          uni.hideLoading();
          getUserInfo();
          uni.setStorageSync(
            LOCAL_STORAGE_KEY.avatar.key,
            new Date().getTime()
          );
        },
      });
    },
  });
};

const avatarLastUpdate = ref(0);
const userInfo = ref({});
const getUserInfo = async () => {
  let result = await proxy.Request({
    url: proxy.Api.getUserInfo,
    showLoading: false,
  });
  if (!result) {
    return;
  }
  userInfo.value = result.data || {};
  avatarLastUpdate.value = uni.getStorageSync(LOCAL_STORAGE_KEY.avatar.key);
};

//修改用户信息
const myEditInfoRef = ref();
const editInfo = () => {
  myEditInfoRef.value.show(userInfo.value);
};

onShow(() => {
  getUserInfo();
});
</script>

<style>
page {
  background: #f3f3f3;
}
</style>
<style lang="scss" scoped>
.user-body {
  padding: 40px 8px 10px 8px;
  .base-info {
    background: #fff;
    border-radius: 10px;
    position: relative;
    padding: 30px 10px 10px 10px;
    .icon-logout {
      font-size: 18px;
      font-weight: bold;
      position: absolute;
      top: 10px;
      right: 10px;
      color: #949292;
    }
    .avatar {
      position: absolute;
      left: 30px;
      top: -30px;
      border: 3px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      .avatar-img {
        background: #d6d6d6;
      }
      .avatar-no-img {
        width: 100%;
        height: 100%;
        font-size: 20px;
        font-weight: bold;
        background: #8806b8;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .no-login {
        font-size: 13px;
      }
    }
    .user-info {
      margin-top: 5px;
      .nick-name {
        display: flex;
        .icon-edit {
          margin-left: 5px;
          margin-top: 3px;
        }
      }
      .join-time {
        color: #a2a2a2;
        font-size: 12px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        .sex {
          margin-top: 3px;
        }
        .line {
          padding: 0px 5px;
        }
      }
    }
    .collect {
      margin-top: 20px;
    }
  }
}

.part-list {
  margin-top: 10px;
  background: #fff;
  border-radius: 10px;
  position: relative;
  padding: 10px 10px 0px 10px;
  .part-title {
    margin-top: 5px;
    font-weight: bold;
  }
  .item-list {
    .item {
      text-align: center;
      padding: 20px;
      width: 100%;
      margin-right: 20px;
      &:last-child {
        margin-right: 0px;
      }
      .iconfont {
        color: #949292;
        font-size: 40px;
        align-items: center;
        margin: 0px auto;
        display: inline-block;
      }
      .text {
        margin-top: 5px;
        color: #3a3939;
      }
    }
    .item:last-child {
      margin-right: 0px;
    }
  }
}

.icon-exam1 {
  font-weight: bold;
}
</style>
