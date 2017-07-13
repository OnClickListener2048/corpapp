import React, { Component } from 'react';
import {navToBootstrap,navToMainTab} from './app/navigation';
import  './app/storage/UserInfoStore';
import './app/util/LoginJumpSingleton';

// 测试准备, 关闭Warning框
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

navToMainTab();

// Navigation.startSingleScreenApp({
//     screen: {
//         screen: 'AreaPicker',
//         title: '选择器',
//     },
//     portraitOnlyMode: true,
// });