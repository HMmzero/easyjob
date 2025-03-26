<template>
  <view class="login-register">
    <view class="title">
      <view>{{ opType == 0 ? "注册" : "登录" }}</view>
      <view class="iconfont icon-close" @click="goBack"></view>
    </view>
    <uni-forms
        ref="formDataRef"
        :model="formData"
        label-width="0"
        :rules="rules"
    >
      <uni-forms-item name="email">
        <uni-easyinput
            v-model="formData.email"
            placeholder="请输入邮箱账号"
            prefixIcon="email"
            :trim="true"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="nickName" v-if="opType == 0">
        <uni-easyinput
            v-model="formData.nickName"
            placeholder="请输入邮箱昵称"
            prefixIcon="email"
            :trim="true"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="sex" v-if="opType == 0">
        <uni-data-checkbox
            v-model="formData.sex"
            :localdata="[
            {
              text: '男',
              value: 1,
            },
            {
              text: '女',
              value: 0,
            },
          ]"
        ></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="password">
        <uni-easyinput
            type="password"
            v-model="formData.password"
            placeholder="请输入密码"
            prefixIcon="locked"
            :trim="true"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="rePassword" v-if="opType == 0">
        <uni-easyinput
            type="password"
            v-model="formData.rePassword"
            placeholder="请再次输入密码"
            prefixIcon="locked"
            :trim="true"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="checkCode">
        <view class="check-code-panel">
          <view class="input">
            <uni-easyinput
                v-model="formData.checkCode"
                placeholder="请输入验证码"
                prefixIcon="paperplane"
                :trim="true"
            ></uni-easyinput>
          </view>
          <view class="code-image">
            <img
                :src="checkCodeUrl"
                class="check-code"
                @click="changeCheckCode(0)"
            />
          </view>
        </view>
      </uni-forms-item>
    </uni-forms>
    <button type="primary" @click="submitForm">
      {{ opType == 0 ? "注册" : "登录" }}
    </button>
    <view class="tips" @click="changeOpType">
      {{ opType == 0 ? "已有账号直接登录" : "没有账号去注册" }}
    </view>
  </view>
</template>

<script setup>
import md5 from "md5";
import {getCurrentInstance, ref} from "vue";
import {useAppInfoStore} from "@/stores/appInfo";
import {LOCAL_STORAGE_KEY} from "@/utils/Constants.js";

const {proxy} = getCurrentInstance();
const appInfoStore = useAppInfoStore();

const {deviceId, deviceBrand} = appInfoStore.getInfo();

const goBack = () => {
  uni.navigateBack();
};

const opType = ref(1);
const changeOpType = () => {
  if (opType.value == 0) {
    opType.value = 1;
  } else {
    opType.value = 0;
  }
  resetForm();
};

const resetForm = () => {
  formData.value = {};
  changeCheckCode();
};

const checkCodeUrl = ref(null);
const changeCheckCode = async () => {
  let result = await proxy.Request({
    url: proxy.Api.checkCode,
    showLoading: false,
    params: {
      deviceId,
      type: opType.value,
      time: new Date().getTime(),
    },
    responseType: "arraybuffer",
  });
  if (!result) {
    return;
  }
  const arrayBuffer = new Uint8Array(result);
  const base64 =
      "data:image/png;base64," + uni.arrayBufferToBase64(arrayBuffer);
  checkCodeUrl.value = base64 || "";
};
changeCheckCode();

const checkRePassword = (rule, value, data, callback) => {
  if (value !== formData.value.password) {
    callback("两次输入的密码不一致");
  }
  return true;
};

const formData = ref({});
const formDataRef = ref();
const rules = {
  email: {
    rules: [
      {required: true, errorMessage: "请输入邮箱"},
      {maxLength: 20, errorMessage: "昵称长度不能超过20个字符"},
    ],
  },
  nickName: {
    rules: [
      {required: true, errorMessage: "请输入昵称"},
      {maxLength: 20, errorMessage: "昵称长度不能超过20个字符"},
    ],
  },
  sex: {
    rules: [{required: true, errorMessage: "请选择性别"}],
  },
  password: {
    rules: [
      {required: true, errorMessage: "请输入密码"},
      {maxLength: 18, errorMessage: "密码长度不能超过18个字符"},
      {
        pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,}$/,
        errorMessage: "密码必须含有数字字母或特殊字符长度不能少于8位",
      },
    ],
  },
  rePassword: {
    rules: [
      {required: true, errorMessage: "请再次输入密码"},
      {validateFunction: checkRePassword},
    ],
  },
  checkCode: {
    rules: [{required: true, errorMessage: "请输入验证码"}],
  },
};

const submitForm = () => {
  formDataRef.value.validate(async (err, value) => {
    if (err) {
      return;
    }
    let url = opType.value == 0 ? proxy.Api.register : proxy.Api.login;
    let params = {};
    Object.assign(params, formData.value);

    params.deviceId = deviceId;
    params.deviceBrand = deviceBrand;
    if (opType.value == 1) {
      params.password = md5(params.password);
    }

    let result = await proxy.Request({
      url: url,
      params,
      errorCallback: () => {
        changeCheckCode();
      },
    });
    if (!result) {
      return;
    }
    if (opType.value == 0) {
      proxy.Message.success("注册成功");
      changeOpType();
    } else {
      proxy.Message.success("登录成功");
      uni.setStorageSync(LOCAL_STORAGE_KEY.token.key, result.data);
      uni.navigateBack();
    }
  });
};
</script>

<style lang="scss" scoped>
.login-register {
  height: 100vh;
  width: 100%;
  z-index: 1001;
  position: position;
  top: 0px;
  background: #fff;
  background-position: center;
  background: url(@/static/logbg.jpg);
  padding: 30px 20px;

  .title {
    padding: 20px 0px;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: space-between;

    .icon-close {
      color: #727272;
    }
  }

  .check-code-panel {
    display: flex;
    justify-content: ce;

    .input {
      flex: 1;
    }

    .code-image {
      margin-left: 10px;
      width: 130px;

      img {
        width: 100%;
      }
    }
  }

  .tips {
    text-align: right;
    margin-top: 10px;
    color: #6b6a6a;
    font-size: 14px;
  }
}
</style>
