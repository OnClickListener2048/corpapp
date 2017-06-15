/**
 * 公用的配置常量.
 */

import {Dimensions} from 'react-native';

export const DEBUG = __DEV__;
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;

export const RN_VERSION = '1.3.0';

// 获取屏幕尺寸
let {width, height} = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export let SCHEME = 'https';
export let DOMAIN_API = 'api.xxx.com';
if(DEBUG) {// 测试环境变量, 上线时应删除
    SCHEME = 'http';
    DOMAIN_API = '123.56.31.133:8081';
}
// export let DOMAIN_WWW = 'www.zaiqiuchang.com';
// export let DOMAIN_WEB = 'web.zaiqiuchang.com';
export let API_BASE_URL = `${SCHEME}://${DOMAIN_API}`;// API服务基础地址
// export let WWW_BASE_URL = `${SCHEME}://${DOMAIN_WWW}`;
// export let WEB_BASE_URL = `${SCHEME}://${DOMAIN_WEB}`;
export let KEY_USER_TOKEN = 'KEY_USER_TOKEN';// 用户登陆token
export let KEY_USER_INFO = 'KEY_USER_INFO';// 用户基本信息

// 顶部导航栏默认风格设置(react-native-navigation)
export const DEFAULT_NAVIGATOR_STYLE = {
    navBarTextColor: 'black',
    navBarButtonColor: '#008800',// 顶部按钮颜色
    statusBarHideWithNavBar: true,
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
        navBarButtonColor: '#c8c8c8',
        tabBarButtonColor: '#c8c8c8',
        navBarTextColor: '#ffffff',
        tabBarSelectedButtonColor: '#ff505c',
        navigationBarColor: '#F5F5F5',
        navBarBackgroundColor: '#F5F5F5',
        // statusBarColor: '#000000',
        // tabFontFamily: 'BioRhyme-Bold',
}