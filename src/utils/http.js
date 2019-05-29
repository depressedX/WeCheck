// http相关模块
import axios from 'axios'

let uid = 0
export const BASE_URL = '/api/v1'

export let server = axios.create({
    baseURL: BASE_URL,
    timeout: 2000
})

server.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.params = config.params || {}
    config.params.t = Date.now()
    return config
})

// 请求返回时的Error
export class RequestError extends Error {
    constructor(message, status) {
        super()
        this.message = message
        this.status = status
    }
}

const rThen = Promise.prototype.then
let apiMark = Symbol('apimark')
Promise.prototype.then = function (onFulfilled, onRejected) {
    let that = this

    function myonrejected(...args) {
        if (!onRejected) return

        let res = onRejected.call(this, ...args)
        if (res === false && that[apiMark]) {
            removeUnhandledAPI(that[apiMark]);
        }

    }

    const p = rThen.call(this, onFulfilled, myonrejected);

    return p
}
const unhandledError = []

function handleAPIStatusError(pr, error) {
    let i = unhandledError.indexOf(pr[apiMark])
    console.log('ok', pr[apiMark], unhandledError)
    if (i < 0) return
    unhandledError.splice(i, 1)
    eventBus.emit('unhandlederror', error)
}

function removeUnhandledAPI(uid) {
    console.log('removced')
    let i = unhandledError.indexOf(uid)
    if (i < 0) return
    unhandledError.splice(i, 1)
}


server.interceptors.response.use(function (response) {

    let body = response.data
    if (body.status === 200) {
        return body.data
    } else {

        let error = new RequestError(body.message, body.status)

        let rejectedPromise = Promise.reject(error)

        rejectedPromise[apiMark] = ++uid
        unhandledError.push(uid)


        setTimeout(handleAPIStatusError, 0, rejectedPromise, error);


        return rejectedPromise

    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export const eventBus = (function () {

    const events = {}


    return {
        emit(eventName, ...args) {
            if (!events[eventName]) return
            events[eventName].forEach(cb => cb(...args))
        },

        on(eventName, callback) {
            events[eventName] = events[eventName] || []
            events[eventName].push(callback)
        },
        off(eventName, callback) {
            if (!events[eventName]) return
            const i = events[eventName].indexOf(callback)
            if (i < 0) return;
            events[eventName].splice(i, 1)
        }
    }
}())
