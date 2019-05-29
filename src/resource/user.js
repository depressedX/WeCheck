import {server} from "../utils/http";

export function getUserInfo(id) {
    return server.get('user', {
        params: {
            id
        }
    })
}

export function updateUserInfo(form) {
    console.log(form.get('profile'))
    return server.post('user', form)
}