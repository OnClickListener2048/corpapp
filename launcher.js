import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen'
import {navToBootstrap,navToMainTab} from './app/navigation';
import {Navigation} from 'react-native-navigation';
import  './app/storage/UserInfoStore';

//SplashScreen.hide();
 navToBootstrap();
// navToMainTab();

// Navigation.startSingleScreenApp({
//     screen: {
//         screen: 'AreaPicker',
//     },
//     portraitOnlyMode: true,
// });