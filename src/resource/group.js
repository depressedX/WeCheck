import {handleResponse, server} from "../utils/http";
import qs from 'qs'
import {timeout} from "../utils";

export function getGroupInfo(id) {
    // return timeout({
    //     "id": "sdfwenk",
    //     "owner": "liupenghao",
    //     "name": "2016操作系统7班",//群体名称
    //     role: 1,
    //     //以下为附加信息
    //     "members": [
    //         {
    //             "username": "quyansong",
    //             "name": "曲延松",
    //             "state": true
    //         },
    //         {
    //             username:'abcd',
    //             name:'温雅楠',
    //             state:true,
    //         },
    //         {
    //             username:'abcde',
    //             name:'刘鹏昊',
    //             state:true,
    //         },
    //         {
    //             username:'abcdadfe',
    //             name:'强无敌',
    //             state:true,
    //         }
    //     ],
    //     "state": true,
    //     "checked":true
    // },2000)

    return server.get('group', {params: {id}}).then(handleResponse)
}

export function getGroupInfoList() {
    return server.get('group/list').then(handleResponse)
    // return timeout([
    //     {
    //         id:'adf',
    //         name:'操作系统',
    //         role:1,
    //
    //     },
    //     {
    //         id:'asdf',
    //         name:'数据结构',
    //         role:2
    //     }
    // ],1000)
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
