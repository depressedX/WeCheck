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
import checkingListenerWorker from 'worker-loader!./checkingListener.worker.js'
Vue.config.productionTip = false

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


let vue = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

window.Notification.requestPermission()


let worker = new checkingListenerWorker()
worker.onmessage = e=>{
    let hasJustOpenedCheckList = e.data

    let notificationMessage = ''
    if (hasJustOpenedCheckList.length > 1) {
        notificationMessage = `您有${hasJustOpenedCheckList.length}个群组待签到`
    } else {
        notificationMessage = `您加入的群组 ${hasJustOpenedCheckList[0].groupName} 正在签到`
    }
    try {
        new Notification(notificationMessage)
    } catch (e) {
        navigator.serviceWorker.ready.then((registration)=>{
            registration.showNotification(notificationMessage)
        })
    }
    vue.$message.info(notificationMessage)
}