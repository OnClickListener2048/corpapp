/**
 * 用户基本信息
 * Created by beansoft on 2017/6/9.
 */
import {KEY_USER_TOKEN, KEY_USER_INFO} from '../config';
import _Preferences from './Preferences';

var UserInfoStore = {};

UserInfoStore.getUserInfo = function (): Object {
    let value = Preferences.get(KEY_USER_INFO);
    if (value !== null) {
        console.log('getUserInfo', value);
        return JSON.parse(value);
    }
    return value;
};

UserInfoStore.token = null;// 临时措施存储token, 待解决

UserInfoStore.setUserInfo = function (value: Object) {
    return Preferences.set(KEY_USER_INFO, JSON.stringify(value));
}

UserInfoStore.getUserToken = function (): string {
    return Preferences.get(KEY_USER_TOKEN);
}

UserInfoStore.setUserToken = function (value: string) {
    UserInfoStore.token = value;
    return Preferences.set(KEY_USER_TOKEN, value);
};
global.UserInfoStore = UserInfoStore;// 全局可用