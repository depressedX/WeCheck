import {handleResponse, server} from "../utils/http";
import qs from 'qs'
import {timeout} from "../utils";

export function login(username, password) {
    return timeout(1000,null)
    return server.post('login', qs.stringify({username, password})).then(handleResponse)
}

export function logout() {
    return server.post('logout').then(handleResponse)
}

export function register(form) {
    return server.post('register',form).then(handleResponse)
}