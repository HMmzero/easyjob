<template>
  <view>
    <Dialog
        title="提交考试"
        ref="postExamRef"
        :showCancel="true"
        :okFun="submit"
        okText="提交考试"
    >
      <uni-forms
          ref="formDataRef"
          :model="formData"
          label-width="0"
          :rules="rules"
      >
        <uni-forms-item name="remark">
          <uni-easyinput
              v-model="formData.remark"
              placeholder="请输入备注"
              :trim="true"
          ></uni-easyinput>
        </uni-forms-item>
      </uni-forms>
    </Dialog>
  </view>
</template>

<script setup>
import {getCurrentInstance, ref} from "vue";

const {proxy} = getCurrentInstance();

const formData = ref({});
const formDataRef = ref();
const rules = {
  remark: {
    rules: [{required: true, errorMessage: "请输入内容"}],
  },
};

const emit = defineEmits(["postExam"]);
const submit = () => {
  formDataRef.value.validate((errors, value) => {
    if (errors) {
      return;
    }
    emit("postExam", formData.value.remark);
  });
};

const postExamRef = ref();
const show = () => {
  postExamRef.value.show();
};

const close = () => {
  postExamRef.value.close();
};
defineExpose({
  show,
  close,
});
</script>

<style lang="scss" scoped>
</style>
