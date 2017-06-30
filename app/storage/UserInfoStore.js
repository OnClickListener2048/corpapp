/**
 * 用户基本信息
 * Created by beansoft on 2017/6/9.
 */
import {KEY_USER_TOKEN, KEY_USER_INFO} from '../config';
import './Preferences';

let UserInfoStore = {};
let KEY_JPUSH_ID = "KEY_JPUSH_ID";

UserInfoStore.getUserInfo = async function (): Object {
    let value = await Preferences.get(KEY_USER_INFO);
    if (value !== null) {
        console.log('getUserInfo', value);
        return JSON.parse(value);
    }
    return value;
};

UserInfoStore.setUserInfo = async function (value: Object) {
    return Preferences.set(KEY_USER_INFO, JSON.stringify(value));
}

UserInfoStore.removeUserInfo = async function () {
    return Preferences.remove(KEY_USER_INFO);
}

UserInfoStore.getUserToken = async function () {
    return await Preferences.get(KEY_USER_TOKEN);
}

UserInfoStore.setUserToken = async function (value: string) {
    return Preferences.set(KEY_USER_TOKEN, value);
};

UserInfoStore.removeUserToken = async function () {
    return Preferences.remove(KEY_USER_TOKEN);
}

UserInfoStore.getJPushID = async function () {
    return await Preferences.get(KEY_JPUSH_ID);
}

UserInfoStore.setJPushID = async function (value: string) {
    return Preferences.set(KEY_JPUSH_ID, value);
};

global.UserInfoStore = UserInfoStore;// 全局可用