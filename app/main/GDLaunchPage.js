/**
 * 启动初始化页面
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';

import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../config';

import SActivityIndicator from '../modules/react-native-sww-activity-indicator';

import '../storage/UserInfoStore';
import * as apis from '../apis';
// import Toast from 'react-native-root-toast';
import {navToLogin, navToMainTab} from '../navigation';

// 启动页
export default class GDLaunchPage extends Component {

    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
        tabBarHidden: false, // 默认隐藏底部标签栏
    };

    // 组件加载完成
    componentDidMount() {
        // TODO token无效转往登录页, 否则转往主页
        // setTimeout(() => {
        //     SActivityIndicator.hide(loading);
        //     this.props.navigator.replace({
        //         component:LoginPage
        //     });
        // }, 2000)

        // this.props.navigator.toggleNavBar({
        //     to: 'hidden',
        //     animated: false,
        // });

        let {isReset = false } = this.props;// 重置, 清理所有登录信息

        if (isReset) {
            this.reset();
            navToLogin();
        } else {
            UserInfoStore.getUserToken()
                .then((value) => {
                    UserInfoStore.token = value;
                    // Toast.show('token=' + value);
                    if(value !== null) {
                        this.readUserInfo();
                    } else {
                        navToLogin();
                    }
                });
        }
    }

    reset() {
        UserInfoStore.removeUserToken(null);
        UserInfoStore.removeUserInfo(null);
    }

    // 读取用户信息
    readUserInfo() {
        let loading = SActivityIndicator.show(true, "载入中...");
        apis.userInfo().then(
            (responseData) => {
                SActivityIndicator.hide(loading);
                console.log("用户信息读取成功返回:" , responseData);
                // Toast.show('用户信息读取成功返回' +  JSON.stringify(responseData));
                if(responseData !== null && responseData.data !== null) {
                    UserInfoStore.setUserInfo(responseData.data);
                    console.log("OK ===> Main:" );
                    navToMainTab();
                } else {
                    console.log("OK ===> LoginPage:" );
                    navToLogin();
                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("用户信息读取错误返回:" , e);
                // Toast.show('用户信息读取错误返回' + e.msg);
                navToLogin();
            },
        );
    }

    render() {
        return(
            // 启动页背景图
            <Image source={require('../img/bg.png')} style={styles.imageStyle} />
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
    }
});