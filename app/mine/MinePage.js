/**
 * 我的页面
 * Created by edianzu on 2017/6/6.
 */

import commonStyles from '../css/styles'
import {
    Image
    , StyleSheet, Text,
} from "react-native";
import React, {Component} from 'react';
import px2dp from '../util'


export default class MinePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isHiddenTabBar:false,   // 是否隐藏tabBar
        };
    }

    render(){
        return(
            <Image source={require('../img/bg.png')} style={commonStyles.fullScreen}
             >
                <Text style={styles.headBackground}>王小二</Text>

            </Image>

        );
    }
}

const styles = StyleSheet.create({
    headBackground:{
        color:'#f08e5f',
        fontSize:20,
        marginTop:px2dp(100),
        textAlign:'center'
    }
});