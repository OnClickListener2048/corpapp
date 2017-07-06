/**
 * 公用的配置常量.
 */

import { Dimensions} from 'react-native';

console.log('__DEV__开发模式', __DEV__);// 说明: __DEV__ 的值是自动设置的, 无需import
// 参考: https://stackoverflow.com/questions/34315274/react-native-detect-dev-or-production-env

export const DEBUG = __DEV__;
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;
console.log('DEBUG=', DEBUG);// 说明: __DEV__ 的值是自动设置的, 无需import
export const RN_VERSION = '1.3.0';

// 获取屏幕尺寸
let {width, height} = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
// TODO 线上API服务器接口地址
export let SCHEME = 'https';
export let DOMAIN_API = 'app.i-counting.cn';//app.i-counting.cn/erp
// if(DEBUG) {// 测试环境变量, 上线时应删除
//     SCHEME = 'https';
//     DOMAIN_API = 'x-crm.i-counting.cn';
// }

export let API_BASE_URL = `${SCHEME}://${DOMAIN_API}`;// API服务基础地址
// export let WWW_BASE_URL = `${SCHEME}://${DOMAIN_WWW}`;
// export let WEB_BASE_URL = `${SCHEME}://${DOMAIN_WEB}`;
export let KEY_USER_TOKEN = 'KEY_USER_TOKEN';// 用户登陆token
export let KEY_USER_INFO = 'KEY_USER_INFO';// 用户基本信息

// 顶部导航栏默认风格设置(react-native-navigation)
export const DEFAULT_NAVIGATOR_STYLE = {
    navBarTextColor: 'black',
    navBarButtonColor: '#666666',// 顶部按钮颜色
    statusBarHideWithNavBar: true,
    navBarTitleTextCentered: true, // Android 有效, 默认是不居中的标题栏
};

// 底部Tab栏的颜色(react-native-navigation)
export const tabsStyle = {
    tabBarBackgroundColor: '#F5F5F5',
        navBarButtonColor: '#c8c8c8',
        tabBarButtonColor: '#c8c8c8',
        navBarTextColor: '#c8c8c8',
        tabBarSelectedButtonColor: '#ff505c',
    // navigationBarColor: '#F5F5F5',
    // navBarBackgroundColor: '#F5F5F5',
    // statusBarColor: '#002b4c',
    // tabFontFamily: 'BioRhyme-Bold',
};

// App 的默认样式(react-native-navigation)
export const appStyle = {
    tabBarBackgroundColor: '#F5F5F5',
        navBarButtonColor: '#646464',// 顶部导航栏按钮颜色
        navBarTextColor: '#323232',// 顶部导航栏文字颜色
        tabBarButtonColor: '#c8c8c8',
        tabBarSelectedButtonColor: '#ff505c',
        navigationBarColor: '#F5F5F5',
        navBarBackgroundColor: '#F5F5F5',
        navBarTitleTextCentered: true, // Android 有效, 默认是不居中的标题栏
        // statusBarColor: '#000000',
        // tabFontFamily: 'BioRhyme-Bold',
}