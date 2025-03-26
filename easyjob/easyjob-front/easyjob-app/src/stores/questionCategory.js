import { defineStore } from "pinia"
export const useQuestionCategoryStore = defineStore('questionCategoryInfo', {
    state: () => {
        return {
            categoryList: []
        }
    },
    actions: {
        setInfo(categoryList) {
            this.categoryList = categoryList;
        },
        getInfo() {
            return this.categoryList
        }
    }
});