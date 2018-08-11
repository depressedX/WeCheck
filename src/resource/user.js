import {handleResponse, server} from "../utils/http";
import qs from 'qs'

export function getUserInfo(){
    return Promise.resolve({
        username:'132456',
        name:'刘鹏昊'
    })
    return server.get('user').then(handleResponse)
}

export function updateUserInfo(bundle) {
    return server.post('user',qs.stringify(bundle)).then(handleResponse)
}