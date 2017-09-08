/**
 * Created by jinglan on 2017/9/8.
 */
import React, { Component,PropTypes } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    WebView
} from 'react-native';
import BComponent from '../base';
import styles from './css/SearchPageStyle'

export default class SearchPage extends BComponent {
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };
    constructor(props) {
        super(props);

        this.state = {

        };


        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }



    render() {
        return (
            <View style={styles.container}>


            </View>
        );
    }
}