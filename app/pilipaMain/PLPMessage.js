/**
 * Created by edianzu on 2017/6/6.
 */

import React,{Component}from 'react';
import {Text, View,StyleSheet
,DeviceEventEmitter,
    InteractionManager,} from "react-native";
import LoginPage from "../user/LoginPage";

export default class PLPMessage extends Component{

// 跳转到登录页面
    pushToLogin() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                component: LoginPage,
            });
        });
    }

    // 组件加载完成
    componentDidMount() {

        // 注册通知
        this.subscription = DeviceEventEmitter.addListener('clickMessageItem', () => this.clickTabBarItem());
        this.pushToLogin();
    }

    componentWillUnmount() {
        // 注销通知
        this.subscription.remove();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    消息中心
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});