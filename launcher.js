/**
 * 启动入口
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    BackAndroid,
    Navigator,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
// 引入外部文件
import LaunchPage from './app/main/GDLaunchPage';
// 引用外部文件
import Main from './app/main/GDMain';
import LoginPage from './app/user/LoginPage';

export default class CorpApp extends Component {
    render() {
        return (
            <LoginPage />
        );
    }

    componentDidMount(){
        SplashScreen.hide()
        // BackAndroid.addEventListener('hardwareBackPress', function () {
        //     BackAndroid.exitApp(0)
        //     return true
        // })
    }
}

AppRegistry.registerComponent('corpapp', () => CorpApp);