/**
 * 公用的配置常量.
 */

import {Dimensions} from 'react-native';

export const DEBUG = __DEV__;
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;

export const RN_VERSION = '1.3.0';

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
