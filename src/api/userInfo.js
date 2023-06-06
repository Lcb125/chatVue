import request from '../utils/axios';


export function login (name,pass) {

    let data = {userName: name,password: pass}
    return request({
        url: "/user/queryUser",
        method: 'post',
        data,
        baseURL: '/api'
    })

}

// export function testChat (content,userNo,uniqueIdentification) {

//     let data = {content: content,userNo: userNo,uniqueIdentification: uniqueIdentification}
//     return request({
//         url: "/chat/testChat",
//         method: 'post',
//         data,
//         baseURL: "/api"
//     })

// }

export function queryUsers (pageNum,pageSize) {

    let data = {pageNum: pageNum,pageSize: pageSize}
    return request({
        url: "/user/queryUsers",
        method: 'post',
        data,
        baseURL: '/api'
    })
}

export function deleteUser (id) {

    let data = {id: id}
    return request({
        url: "/user/deleteUser",
        method: 'post',
        data,
        baseURL: '/api'
    })

}

export function updateUser (updateUserInfo) {

    return request({
        url: "/user/updateUser",
        method: 'post',
        data:updateUserInfo,
        baseURL: '/api'
    })

}

export function insertUser (insertUserInfo) {

    return request({
        url: "/user/insertUser",
        method: 'post',
        data:insertUserInfo,
        baseURL: '/api'
    })

}