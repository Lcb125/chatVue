import request from '../utils/axios';


export function queryMsg (lan) {

    let data = {language: lan};
    return request({
        url: "/msg/queryMsg",
        method: 'post',
        data,
        baseURL: '/api'
    })
}