<template>
  <div class="msg-box" v-if="visible">
    <div class="msg-text">{{ msgText }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const visible = ref(false);
const msgText = ref("");

const show = (msg, timer = 200000) => {
  msgText.value = msg;
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, timer);
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.msg-box {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  .msg-text {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    color: white;
    font-size: 14px;
    padding: 10px 20px;
    user-select: none;
  }
}
</style>
