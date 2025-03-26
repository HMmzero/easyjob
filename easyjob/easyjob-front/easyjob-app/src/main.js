import {
	createSSRApp
} from "vue";

import * as Pinia from 'pinia'
import App from "./App.vue";

import "@/static/base.scss"
import "@/static/icon/iconfont.css"

import Navbar from "@/pages/components/common/Navbar.vue"
import DataList from "@/pages/components/common/DataList.vue"
import Popup from "@/pages/components/common/Popup.vue"
import ShowTips from "@/pages/components/common/ShowTips.vue"
import Footer from "@/pages/components/common/Footer.vue"
import SlidePage from "@/pages/components/common/SlidePage.vue"
import Dialog from "@/pages/components/common/Dialog.vue"



import Message from "@/utils/Message"
import Request from "@/utils/Request";
import Api from "@/utils/Api";
import Utils from "@/utils/Utils";
import Confirm from "@/utils/Confirm";

export function createApp() {
	const app = createSSRApp(App);

	app.use(Pinia.createPinia());

	app.component("Navbar", Navbar);
	app.component("DataList", DataList);
	app.component("Popup", Popup);
	app.component("ShowTips", ShowTips);
	app.component("Footer", Footer);
	app.component("SlidePage", SlidePage);
	app.component("Dialog", Dialog);

	app.config.globalProperties.Message = Message;
	app.config.globalProperties.Request = Request;
	app.config.globalProperties.Api = Api;
	app.config.globalProperties.Utils = Utils;
	app.config.globalProperties.Confirm = Confirm;
	return {
		app,
	};
}
