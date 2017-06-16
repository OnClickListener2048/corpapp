/**
 * 用户基本信息
 * Created by beansoft on 2017/6/9.
 */
import {KEY_USER_TOKEN, KEY_USER_INFO} from '../config';
import './Preferences';

var UserInfoStore = {};

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

UserInfoStore.getUserToken = async function () {
    return await Preferences.get(KEY_USER_TOKEN);
}

UserInfoStore.setUserToken = async function (value: string) {
    return Preferences.set(KEY_USER_TOKEN, value);
};

global.UserInfoStore = UserInfoStore;// 全局可用