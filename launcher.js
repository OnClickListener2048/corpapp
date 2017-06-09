import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
// 引入外部文件
import LaunchPage from './app/main/GDLaunchPage';
import Toast from 'react-native-root-toast';
import {API_BASE_URL} from './app/config';

export default class CorpApp extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    name:'launchPage',
                    component:LaunchPage
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
        Toast.show(API_BASE_URL);
    }
}

AppRegistry.registerComponent('corpapp', () => CorpApp);