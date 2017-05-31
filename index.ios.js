/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

// 引用外部文件
import Main from './app/main/GDMain';

export default class CorpApp extends Component {
    render() {
        return (
            <Main />
        );
    }
}

AppRegistry.registerComponent('corpapp', () => CorpApp);
