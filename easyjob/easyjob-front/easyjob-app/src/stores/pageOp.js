import { defineStore } from "pinia";
export const usePageOpStore = defineStore('pageOp', {
    state: () => {
        return {
            //允许左右滑动 轮播详情页不允许滑动，其他允许滑动
            allowSlidePage: true,
            //展示 收藏，从个人中心 收藏 进入详情不展示收藏，其他展示收藏
            showCollect: true,
        }
    },
    actions: {
        setOp(allowSlidePage, showCollect) {
            this.allowSlidePage = allowSlidePage;
            this.showCollect = showCollect;
        },
        getOp() {
            return {
                allowSlidePage: this.allowSlidePage,
                showCollect: this.showCollect,
            };
        },
    }
})