/**
 * 公用的配置常量.
 */

import { Dimensions} from 'react-native';

console.log('__DEV__开发模式', __DEV__);// 说明: __DEV__ 的值是自动设置的, 无需import
// 参考: https://stackoverflow.com/questions/34315274/react-native-detect-dev-or-production-env

export const DEBUG = __DEV__;
// export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;
console.log('DEBUG=', DEBUG);// 说明: __DEV__ 的值是自动设置的, 无需import
export const RN_VERSION = '1.3.0';

// 获取屏幕尺寸
let {width, height} = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
// 线上API服务器接口地址 app.i-counting.cn
export let SCHEME = 'https';

 // export let DOMAIN_API = 'app.i-counting.cn';
export let DOMAIN_API = 'erp.pilipa.cn';
// if(DEBUG) {// 测试环境变量, 上线时应删除
//     SCHEME = 'https';
    // DOMAIN_API = '192.168.100.234:8081';
    //https://www.baidu.com
    //  DOMAIN_API = 'app.i-counting.cn';
    // DOMAIN_API = 'x-crm.i-counting.cn';
    //DOMAIN_API = '47.94.123.10';
// }
// DOMAIN_API = 'x-crm.i-counting.cn';

export let API_BASE_URL = `${SCHEME}://${DOMAIN_API}`;// API服务基础地址
// export let WWW_BASE_URL = `${SCHEME}://${DOMAIN_WWW}`;
// export let WEB_BASE_URL = `${SCHEME}://${DOMAIN_WEB}`;
export let KEY_USER_TOKEN = 'KEY_USER_TOKEN';// 用户登陆token
export let KEY_USER_INFO = 'KEY_USER_INFO';// 用户基本信息

// 顶部导航栏默认风格设置(react-native-navigation)
export const DEFAULT_NAVIGATOR_STYLE = {
    navBarButtonColor: '#323232',// 顶部按钮颜色
    navBarTextColor: '#323232',// 顶部导航栏文字颜色
    navBarTextFontSize: 18, // 顶部导航栏文字大小
    navBarTitleTextCentered: true, // Android 有效, 默认是不居中的标题栏
    navBarBackgroundColor: '#FAFAFA',
};

// 底部Tab栏的颜色(react-native-navigation)
export const tabsStyle = {
    tabBarBackgroundColor: '#F5F5F5',
        tabBarButtonColor: '#c8c8c8',
        tabBarTextFontSize: '8',
        tabBarSelectedButtonColor: '#ff505c',
    // navigationBarColor: '#F5F5F5',
    // navBarBackgroundColor: '#F5F5F5',
    // statusBarColor: '#002b4c',
    // tabFontFamily: 'BioRhyme-Bold',
};

// App 的默认样式(react-native-navigation)
export const appStyle = {
        navBarButtonColor: '#323232',// 顶部按钮颜色
        navBarTextColor: '#323232',// 顶部导航栏文字颜色
        navBarTextFontSize: 18, // 顶部导航栏文字大小
        navBarTitleTextCentered: true, // Android 有效, 默认是不居中的标题栏
        navBarBackgroundColor: '#FAFAFA',
        tabBarBackgroundColor: '#F5F5F5',
        tabBarButtonColor: '#c8c8c8',
        tabBarSelectedButtonColor: '#ff505c',
        navigationBarColor: '#000000',// 安卓虚拟按键导航背景色
        topBarElevationShadowEnabled: false, // default: true. Disables TopBar elevation shadow on Lolipop and above 启用顶部分割线下方阴影
    // change the background color of the bottom native navigation bar.
        // statusBarColor: '#000000',
        // tabFontFamily: 'BioRhyme-Bold',
}