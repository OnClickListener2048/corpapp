/**
 * 用户相关接口
 */
import {postApi, getApi} from './common';

// 登陆
export function login( phone = '', smsCode = '') {
  return postApi('/app/v0/user/login/phone', {phone, smsCode});
}

// 短信验证码
export async function sendVerifyCode(phone = '', verifyCode = '') {
    return await postApi('app/v0/user/smscode/get', {phone, verifyCode});
}

// 问题反馈
export function sendFeedback({message = '', userName = ''}) {
  return postApi('/resetPassword', {message, userName});
}

// 用户信息
export function userInfo() {
  return postApi('/app/v0/user/info');
}

// 退出登陆
export function logout() {
  return postApi('/app/v0/user/logout');
}