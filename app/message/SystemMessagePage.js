/**
 * Created by jinglan on 2017/6/28.
 */
import React, { Component,PropTypes } from 'react';

import {
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager
} from 'react-native';


export default class SystemMessagePage extends Component{
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded:false,                   // 是否初始化 ListView
            taskId:this.props.taskId,
            faild:false,                   // 是否初始化 ListView

        };
        this._loadData = this._loadData.bind(this);
        this.stepsArr = [];
        this.info;

    }




    render() {
        return(
            <View>




            </View>
        );
    }
}