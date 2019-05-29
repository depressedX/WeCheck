import {server} from "../utils/http";
import qs from 'qs'

const hasLoggedInKey = 'hasLoggedIn'

export function login(username, password) {
    let res = server.post('login', qs.stringify({username, password}))
    res.then(() => sessionStorage.setItem(hasLoggedInKey, 'true'))
    return res
}

export function logout() {
    return server.post('logout')
        .then(res => sessionStorage.removeItem(hasLoggedInKey))
}

export function register(form) {
    return server.post('register', form)
}

export function hasLoggedIn() {
    return sessionStorage.getItem(hasLoggedInKey) === 'true'
}

server.get('hasLoggedIn')
    .then(flag => sessionStorage.setItem(hasLoggedInKey, flag ? 'true' : 'false'))