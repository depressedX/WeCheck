import {handleResponse, server} from "../utils/http";
import qs from 'qs'
import {timeout} from "../utils";

export function getGroupInfo(id) {
    return timeout({
        "id": "sdfwenk",
        "owner": "liupenghao",
        "name": "2016操作系统7班",//群体名称
        role: 1,
        //以下为附加信息
        // "members": [
        //     {
        //         "username": "quyansong",
        //         "name": "曲延松",
        //         "state": true
        //     },
        // ],
        "state": true,
        "checked":true
    },2000)

    return server.get('group', {params: {id}}).then(handleResponse)
}

export function getGroupInfoList() {
    return server.get('group/list').then(handleResponse)
}

export function createGroup(name) {
    return server.post('group/add', qs.stringify({name})).then(handleResponse)
}

export function joinGroup(id) {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve()
        },2000)
    })
    return server.post('group/join', qs.stringify({id})).then(handleResponse)
}

export function quitGroup(id) {
    return Promise.resolve(true)
    return server.post('group/quit', qs.stringify({id})).then(handleResponse)
}

export function updateGroupInfo(id, bundle) {
    return server.post('group/quit', qs.stringify(Object.assign({id}, bundle))).then(handleResponse)
}

export function deleteGroup(id) {
    return server.post('group/quit', qs.stringify({id})).then(handleResponse)
}
