
import { createApp } from "vue"

import Confirm from "./Confirm.vue"

export default {

    install(app) {
        // 创建div元素装载toast对象
        let div = document.createElement("div")
        let body = document.body
        // 导入body中
        body.appendChild(div)
        // 创建toast实例，用于挂载
        let instance = createApp(Confirm)
        // 挂载vue身上
        app.config.globalProperties.Confirm = instance.mount(div);
    }
}