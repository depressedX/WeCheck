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
