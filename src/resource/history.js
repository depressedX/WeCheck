import {handleResponse, server} from "../utils/http";
import qs from 'qs'



//获取群体内某个成员的签到历史记录
export function getUserHistory(group_id,username) {

    return server.get('group/'+group_id+'/user/'+username).then(handleResponse)
};


//获取某群体的历史记录
export function getGroupHistory(id) {

    return server.get('history/'+id).then(handleResponse)
}

//获取某群体的历史每人签到数据统计信息
export function getEveryoneHistory(groupid) {

    return server.get('group/'+groupid+"/user/record").then(handleResponse)
}


//获取历史记录中的某条记录的信息
export function getRecord(recordId) {
    // return server.get('group', {params: {groupname,username}}).then(handleResponse)
    return server.get('record/'+recordId).then(handleResponse)
}


