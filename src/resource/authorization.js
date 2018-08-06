import {handleResponse, server} from "../utils/http";
import qs from 'qs'

export function login(username, password) {
    return server.post('login', qs.stringify({username, password})).then(handleResponse)
}

export function logout() {
    return server.post('logout').then(handleResponse)
}

export function register(form) {
    return server.post('register',form).then(handleResponse)
}