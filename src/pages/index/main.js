import Vue from 'vue';
import {

    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui';

import App from './App.vue'
import {router} from './router'
import './style/global.scss'


/**
 * ServiceWorker部分代码
 */
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import {getUserInfo} from "../../resource/user";
import {eventBus} from "../../utils/http";

OfflinePluginRuntime.install({
    onInstalled: function () {
    },

    onUpdating: function () {

    },

    onUpdateReady: function () {
        OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: function () {
        window.location.reload();
    }
})


Vue.config.productionTip = false

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

// getUserInfo(0).then(data=>{
//     console.log('successs   ')
// },e=>{
//     console.log(e.message)
// })

eventBus.on('unhandlederror',(e)=>{
    console.log(e.message)
})