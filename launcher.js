import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen'
import {navToBootstrap} from './app/navigation';

import  './app/storage/UserInfoStore';

SplashScreen.hide();
navToBootstrap();