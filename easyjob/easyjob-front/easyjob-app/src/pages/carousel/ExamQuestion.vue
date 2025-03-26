<template>
  <view>
    <Navbar :showLeft="true" title="推荐问题"></Navbar>
    <view>
      <ExamQuestionItem
        :showAnswer="true"
        :data="examQuestion"
        :showHtml="true"
      >
      </ExamQuestionItem>
    </view>
  </view>
</template>

<script setup>
import ExamQuestionItem from "@/pages/exam/ExamQuestionItem.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const questionId = ref(null);
const examQuestion = ref({ questionItemList: [] });
const getExamQuestion = async () => {
  let result = await proxy.Request({
    url: proxy.Api.getExamQuestionById,
    params: {
      questionId: questionId.value,
    },
  });
  if (!result) {
    return;
  }
  examQuestion.value = result.data;
};
onLoad((option) => {
  questionId.value = option.questionId;
  getExamQuestion();
});
</script>

<style lang="scss" scoped>
.question-list {
  padding: 10px;
  .list-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
</style>
