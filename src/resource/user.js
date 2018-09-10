import {handleResponse, server} from "../utils/http";

export function getUserInfo(id) {
    return server.get('user', {
        params: {
            id
        }
    }).then(handleResponse)
}

export function updateUserInfo(form) {
    return server.post('user', form).then(handleResponse)
}