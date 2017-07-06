import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen'
import {navToBootstrap,navToMainTab} from './app/navigation';
import {Navigation} from 'react-native-navigation';
import  './app/storage/UserInfoStore';

// 测试准备, 关闭Warning框
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

//SplashScreen.hide();
//  navToBootstrap();
navToMainTab();

// Navigation.startSingleScreenApp({
//     screen: {
//         screen: 'AreaPicker',
//         title: '选择器',
//     },
//     portraitOnlyMode: true,
// });