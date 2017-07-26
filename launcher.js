import React, { Component } from 'react';
import {navToBootstrap,navToMainTab} from './app/navigation';
import  './app/storage/UserInfoStore';
import './app/util/LoginJumpSingleton';
import './app/util/NetInfoSingleton';
import {Navigation} from 'react-native-navigation';
import { Text } from 'react-native';

Text.defaultProps.allowFontScaling=false;// 全部禁用字体缩放

// 测试准备, 关闭Warning框
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
console.log("NetInfoSingleton", NetInfoSingleton.isConnected);

navToMainTab();

// Navigation.startSingleScreenApp({
//     screen: {
//         screen: 'demo/ImageZoom',
//         title: '图片缩放',
//     },
//     portraitOnlyMode: true,
// });