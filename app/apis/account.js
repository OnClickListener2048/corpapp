/**
 * 用户相关接口
 */
import {postApi, getApi} from './common';

// export function register({username = '', mobile = '', password, code}) {
//   return postApi('/register', {username, mobile, password, code});
// }

export function login( phone = '', smsCode = '') {
  return postApi('/app/v0/user/login/phone', {phone, smsCode});
}

export async function sendVerifyCode(phone = '', verifyCode = '') {
    return await postApi('app/v0/user/smscode/get', {phone, verifyCode});
}

// export function resetPassword({mobile = '', email = '', password = '', code}) {
//   return getApi('/resetPassword', {mobile, email, password, code});
// }

export function userInfo() {
  return postApi('/app/v0/user/info');
}

// 退出登陆
export function logout() {
  return postApi('/app/v0/user/logout');
}