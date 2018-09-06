import {handleResponse, server} from "../utils/http";
import qs from 'qs'

export function getGroupInfo(id) {
    return server.get('group', {params: {id}}).then(handleResponse)
}

// export function getGroupInfo(groupname,username) {
//     // return server.get('group', {params: {groupname,username}}).then(handleResponse)
//     return server.get('group/'+groupname+'/'+username).then(handleResponse)
// }

export function getGroupInfoList() {
    // return{
    //     "id":"sdfwenk",//口令
    //     "owner":"liupenghao",//创建者username
    //     "name":"2016操作系统7班",//群体名称
    //     "role":1,
    //
    //     //以下为附加信息
    //
    //     //if 管理者||成员 附加state
    //     "state":true,
    //
    //     //if 管理者 附加members
    //     "members":[
    //     {
    //         "username":"quyansong",
    //         "name":"曲延松",
    //         "state":true
    //     },
    //         {
    //             "username":"wenyanan",
    //             "name":"温雅楠",
    //             "state":true
    //         }
    //
    // ],
    //
    //
    //
    // //if 管理者||成员 附加needLocation
    //     "needLocation":false,
    //
    //     //if 管理者&&needLocation 附加location
    //     "location":{
    //         "lng":116.331398,
    //         "lat":39.897445,
    //         "effectiveDistance":50
    // },
    //
    // //if 管理者||成员 附加needFace
    // "needFace":true,}
    return server.get('group/list').then(handleResponse)
}

export function createGroup(name) {
    return server.post('group/add', qs.stringify({name})).then(handleResponse)
}



export function joinGroup(id) {
    return server.post('group/join', qs.stringify({id})).then(handleResponse)
}

export function quitGroup(id) {
    return server.post('group/quit', qs.stringify({id})).then(handleResponse)
}

export function updateGroupInfo(id, bundle) {
    return server.post('group/update', qs.stringify(Object.assign({id}, bundle))).then(handleResponse)
}

export function deleteGroup(id) {
    return server.post('group/delete', qs.stringify({id})).then(handleResponse)
}
