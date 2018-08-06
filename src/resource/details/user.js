import {handleResponse, server} from "../common";
import qs from 'qs'

export function getUserInfo(){
    return server.get('user').then(handleResponse)
}

export function updateUserInfo(bundle) {
    return server.post('user',qs.stringify(bundle)).then(handleResponse)
}