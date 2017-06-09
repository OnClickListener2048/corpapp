/**
 * 用户相关接口
 */
import {postApi, getApi} from './common';

// export function register({username = '', mobile = '', password, code}) {
//   return postApi('/register', {username, mobile, password, code});
// }

export function login( phone = '', smsCode = '') {
  return postApi('/api/v0/user/login/phone', {phone, smsCode});
}

export async function sendVerifyCode({by, mobile, email}) {
    return await postApi('/security/sendVerifyCode', {by, mobile, email});
}

// export function resetPassword({mobile = '', email = '', password = '', code}) {
//   return getApi('/resetPassword', {mobile, email, password, code});
// }

export function userInfo() {
  return postApi('/api/v0/user/info');
}

export function logout() {
  return postApi('/logout');
}