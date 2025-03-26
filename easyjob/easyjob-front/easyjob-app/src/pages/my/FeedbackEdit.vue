<template>
  <view>
    <Dialog
        title="问题反馈"
        ref="dialogRef"
        :showCancel="true"
        :okFun="submit"
        okText="提交"
    >
      <uni-forms
          ref="formDataRef"
          :model="formData"
          label-width="0"
          :rules="rules"
      >
        <uni-forms-item name="content">
          <uni-easyinput
              type="textarea"
              v-model="formData.content"
              placeholder="请输入问题"
              :trim="true"
              :maxlength="500"
          >
          </uni-easyinput>
        </uni-forms-item>
      </uni-forms>
    </Dialog>
  </view>
</template>

<script setup>
import {getCurrentInstance, nextTick, ref} from "vue";

const {proxy} = getCurrentInstance();

const formData = ref({});
const formDataRef = ref();
const rules = {
  content: {
    rules: [{required: true, errorMessage: "请输入问题"}],
  },
};

const emit = defineEmits(["reload"]);
const submit = () => {
  formDataRef.value.validate(async (errors, value) => {
    if (errors) {
      return;
    }
    const params = Object.assign({}, formData.value);
    let result = await proxy.Request({
      url: proxy.Api.sendFeedback,
      params: params,
    });
    if (!result) {
      return;
    }
    close();
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

const close = () => {
  dialogRef.value.close();
};
defineExpose({
  show,
  close,
});
</script>

<style lang="scss" scoped>
</style>
