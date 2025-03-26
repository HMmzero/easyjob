<template>
  <view>
    <Dialog
        title="修改信息"
        ref="dialogRef"
        :showCancel="true"
        :okFun="submit"
        okText="确定"
    >
      <uni-forms
          ref="formDataRef"
          :model="formData"
          :rules="rules"
          :label-width="70"
          label-align="right"
      >
        <uni-forms-item name="nickName" label="昵称">
          <view class="nick-name">{{ formData.nickName }}</view>
        </uni-forms-item>

        <uni-forms-item name="sex" label="性别">
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
        <uni-forms-item name="password" label="密码">
          <uni-easyinput
              type="password"
              v-model="formData.password"
              placeholder="请输入密码"
              prefixIcon="locked"
              :trim="true"
          ></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item name="rePassword" label="重复密码">
          <view>
            <uni-easyinput
                type="password"
                v-model="formData.rePassword"
                placeholder="请输入密码"
                prefixIcon="locked"
                :trim="true"
            ></uni-easyinput>
          </view>
          <view class="tips">不输入密码表示不修改密码</view>
        </uni-forms-item>
      </uni-forms>
    </Dialog>
  </view>
</template>

<script setup>
import {getCurrentInstance, nextTick, ref} from "vue";

const {proxy} = getCurrentInstance();

const checkRePassword = (rule, value, data, callback) => {
  if (value != "" && value !== formData.value.password) {
    callback("两次输入的密码不一致");
  }
  return true;
};

const formData = ref({});
const formDataRef = ref();
const rules = {
  sex: {
    rules: [{required: true, errorMessage: "请选择性别"}],
  },
  password: {
    rules: [
      {maxLength: 18, errorMessage: "密码长度不能超过18个字符"},
      {
        pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,}$/,
        errorMessage: "密码必须含有数字字母或特殊字符长度不能少于8位",
      },
    ],
  },
  rePassword: {
    rules: [{validateFunction: checkRePassword}],
  },
};

const emit = defineEmits(["reload"]);
const submit = () => {
  formDataRef.value.validate(async (err, value) => {
    if (err) {
      return;
    }
    const params = Object.assign({}, formData.value);
    let result = await proxy.Request({
      url: proxy.Api.updateUserInfo,
      params: params,
    });
    if (!result) {
      return;
    }
    proxy.Message.success("修改成功!");
    dialogRef.value.close();
    emit("reload");
  });
};

const dialogRef = ref();
const show = (data) => {
  dialogRef.value.show();
  nextTick(() => {
    formData.value = Object.assign({}, data);
  });
};
defineExpose({show});
</script>

<style lang="scss" scoped>
.nick-name {
  margin-top: 8px;
}

.tips {
  margin-top: 5px;
  font-size: 12px;
  color: #7a7a7a;
}
</style>
