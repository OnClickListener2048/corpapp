import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
// 引入外部文件
import LaunchPage from './app/main/GDLaunchPage';
import  './app/storage/UserInfoStore';

// 引用外部文件
import Main from './app/pilipaMain/PLPMain';
import GMain from './app/main/GDMain';
import LoginPage from './app/user/LoginPage';

export default class CorpApp extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    name:'launchPage',
                    component:LoginPage,
                }}

                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }}
            />
        );
    }

    componentDidMount() {

        SplashScreen.hide()
        // BackAndroid.addEventListener('hardwareBackPress', function () {
        //     BackAndroid.exitApp(0)
        //     return true
        // })
        // Toast.show(API_BASE_URL);

    }


}

AppRegistry.registerComponent('corpapp', () => CorpApp);