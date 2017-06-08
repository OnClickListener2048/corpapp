/**
 * 用户相关接口
 */
import {API_BASE_URL} from '../config';

// export function register({username = '', mobile = '', password, code}) {
//   return postApi('/register', {username, mobile, password, code});
// }

export function login( phone = '', smsCode = '') {
  return postApi('/api/v0/user/login/phone', {phone, smsCode});
}

// export function resetPassword({mobile = '', email = '', password = '', code}) {
//   return getApi('/resetPassword', {mobile, email, password, code});
// }
//
// export function isLogined({timeout = 3000} = {}) {
//   return getApi('/isLogined', {}, {timeout});
// }
//
// export function logout() {
//   return getApi('/logout');
// }

export function postApi(uri, params = {}, headers = {}) {
  return HTTPBase.postEx(API_BASE_URL + uri, params, headers);
}