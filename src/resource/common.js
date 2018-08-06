import axios from 'axios'

export const BASE_URL  = '/'

export let server = axios.create({
    baseURL:BASE_URL
})

// 请求返回时的Error
export class RequestError extends Error {
    constructor(message, status) {
        super()
        this.message = message
        this.status = status
    }
}

export const handleResponse = resp => {
    let data = resp.data
    if (data.status === 200) {
        return data.data
    } else {
        throw new RequestError(resp.data.message, resp.data.status)
    }
}