/**
 * Created by edianzu on 2017/6/6.
 */

import React,{Component}from 'react';
import {DeviceEventEmitter}from 'react-native';

export default class PLPApplit extends Component{
    componentDidMount() {
        // 注册通知
        this.subscription = DeviceEventEmitter.addListener('clicApplitItem', () => this.clickTabBarItem());
    }

    componentWillUnmount() {
        // 注销通知
        this.subscription.remove();
    }
}