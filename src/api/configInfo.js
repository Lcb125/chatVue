import request from '../utils/axios';


// export function login (name,pass) {

//     let data = {userName: name,password: pass}
//     return request({
//         url: "/user/queryUser",
//         method: 'post',
//         data,
//         baseURL: '/api'
//     })

// }

// export function testChat (content,userNo,uniqueIdentification) {

//     let data = {content: content,userNo: userNo,uniqueIdentification: uniqueIdentification}
//     return request({
//         url: "/chat/testChat",
//         method: 'post',
//         data,
//         baseURL: "/api"
//     })

// }

export function queryConfig (pageNum,pageSize,queryConfigInfo) {

    let data = {pageNum: pageNum,pageSize: pageSize,codeKey: queryConfigInfo.key}
    return request({
        url: "/config/queryConfig",
        method: 'post',
        data,
        baseURL: '/api'
    })
}


export function querySwitch () {

    return request({
        url: "/config/querySwitch",
        method: 'get',
        baseURL: '/api'
    })
}

export function queryPrompt () {

    return request({
        url: "/config/queryPrompt",
        method: 'get',
        baseURL: '/api'
    })
}

export function deleteConfig (id) {

    let data = {id: id}
    return request({
        url: "/config/deleteConfig",
        method: 'post',
        data,
        baseURL: '/api'
    })

}

export function updateConfig (updateConfigInfo) {

    return request({
        url: "/config/updateConfig",
        method: 'post',
        data:updateConfigInfo,
        baseURL: '/api'
    })

}