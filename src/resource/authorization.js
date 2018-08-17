import {handleResponse, server} from "../utils/http";
import qs from 'qs'
import {timeout} from "../utils";

const hasLoggedInKey = 'hasLoggedIn'

export function login(username, password) {
    return server.post('login', qs.stringify({username, password}))
        .then(handleResponse)
        .then(res => sessionStorage.setItem(hasLoggedInKey, 'true'))
}

export function logout() {
    return server.post('logout')
        .then(handleResponse)
        .then(res => sessionStorage.removeItem(hasLoggedInKey))
    
}

export function register(form) {
    return server.post('register', form).then(handleResponse)
}