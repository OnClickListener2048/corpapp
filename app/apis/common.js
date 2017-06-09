/**
 * 通用请求的封装
 */
import {API_BASE_URL} from '../config';

export async function postApi(uri, params = {}, headers = {}) {
    return HTTPBase.postEx(API_BASE_URL + uri, params, headers);
}

export async function getApi(uri, params = {}, headers = {}) {
    return HTTPBase.getEx(API_BASE_URL + uri, params, headers);
}