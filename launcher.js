/**
 * 启动入口
 */
import React, {Component} from 'react';
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
            /*<Main />*/
        );
    }

    componentDidMount() {
        SplashScreen.hide()
        // BackAndroid.addEventListener('hardwareBackPress', function () {
        //     BackAndroid.exitApp(0)
        //     return true
        // })
    }

    // 构造
    constructor(props) {
        super(props);

        // Debug async web request
        // this.getMoviesFromApi = this.getMoviesFromApi.bind(this);

        // this.getMoviesFromApi().then(
        //     v => console.log("返回数据===>", v),
        //     e =>
        //         Alert.alert(
        //             '网络错误',
        //             e.toString(),
        //             [
        //                 {text: 'OK', onPress: () => console.log('OK Pressed!')},
        //             ]
        //         )
        // )

        let params = {
            "phone": '18211137768',
            "smsCode": '888888'
        };

        HTTPBase.postEx(
            'http://123.56.31.133:8081/api/v0/user/login/phone',
            // 'http://rapapi.org/mockjsdata/19607/common_demo',
            params)
            .then(
                (responseData) => {
                    console.log("登录成功返回:" , responseData);
                },
                (e) => {
                    console.log("登录错误返回:" , e);
                },
            )
            // .catch((error) => {
            //     console.log("登录错误返回:" + error.message);
            // });
    }

    // 注意这个方法前面有async关键字
    async getMoviesFromApi() {
        // 注意这里的await语句，其所在的函数必须有async关键字声明
        let response = await fetch('http://m.helijia.com/customer/user/login/check?t=1495079097159');
        //'https://facebook.github.io/react-native/movies.json');
        // let responseJson = await response.json();
        // return responseJson.movies;
        return await response;
    }
}

AppRegistry.registerComponent('corpapp', () => CorpApp);