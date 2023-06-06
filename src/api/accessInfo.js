import request from '../utils/axios';


export function requestAccess (accessCode,deviceId) {

    let data = {accessCode: accessCode,deviceId: deviceId}
    return request({
        url: "/chat/requestAccess",
        method: 'post',
        data,
        baseURL: '/api'
    })

}

export function testChat (content,userNo,uniqueIdentification) {

    let data = {content: content,userNo: userNo,uniqueIdentification: uniqueIdentification}
    return request({
        url: "/chat/testChat",
        method: 'post',
        data,
        baseURL: "/api"
    })

}



export function queryAccess (pageNum,pageSize) {

    let data = {pageNum: pageNum,pageSize: pageSize}
    return request({
        url: "/access/queryAccess",
        method: 'post',
        data,
        baseURL: '/api'
    })

}


export function deleteAccess (row) {

    let status = '';
    if(row.status === 'A'){
        status = 'D'
    }else{
        status = 'A'
    }
    let data = {id: row.id, status: status}
    return request({
        url: "/access/deleteAccess",
        method: 'post',
        data,
        baseURL: '/api'
    })

}


export function updateAccess (updateAccessInfo) {

    return request({
        url: "/access/updateAccess",
        method: 'post',
        data:updateAccessInfo,
        baseURL: '/api'
    })

}

export function queryAccessByCode (pageNum,pageSize,code) {

    let data = {pageNum: pageNum,pageSize: pageSize, code: code}
    return request({
        url: "/access/queryAccess",
        method: 'post',
        data,
        baseURL: '/api'
    })

}


export function insertAccess () {

    return request({
        url: "/access/insertAccess",
        method: 'get',
        baseURL: '/api'
    })

}