import {handleResponse, server} from "../utils/http";

export function getUserInfo(){
    return server.get('user').then(handleResponse)
}

export function updateUserInfo(form) {
    return server.post('user',form).then(handleResponse)
}