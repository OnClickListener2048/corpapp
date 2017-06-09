/**
 * Created by yeshaojian on 2017/3/25.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';

import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../config';

import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import LoginPage from '../user/LoginPage';
import Main from './GDMain';

export default class GDLaunchPage extends Component {

    // 组件加载完成
    componentDidMount() {
        let loading = SActivityIndicator.show(true, "登录中");
        // TODO token无效转往登录页, 否则转往主页
        setTimeout(() => {
            SActivityIndicator.hide(loading);
            this.props.navigator.replace({
                component:LoginPage
            });
        }, 2000)
    }

    render() {
        return(
            // 启动页
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