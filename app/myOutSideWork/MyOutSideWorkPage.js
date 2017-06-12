/**
 * Created by edianzu on 2017/6/9.
 */

import React, { Component } from 'react';
import {
    Text,
    DeviceEventEmitter,
    TouchableOpacity, View, Image,
    StyleSheet,
} from "react-native";
import CommunalNavBar from '../main/GDCommunalNavBar';


export default class MyOutSideWorkPage extends Component{

    // 返回
    pop() {

        this.props.navigator.pop();
    }

    // 返回左边按钮
    renderLeftItem() {
        return(
            <TouchableOpacity
                onPress={() => {this.pop()}}
            >
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={{uri:'back'}} style={styles.navBarLeftItemStyle} />
                    <Text>返回</Text>
                </View>

            </TouchableOpacity>
        );
    }

    // 准备加载组件
    componentWillMount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', true);
    }

    // 准备销毁组件
    componentWillUnmount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', false);
    }



    // 返回中间按钮
    renderTitleItem() {
        return(
            <Text style={styles.navBarTitleItemStyle}>我的外勤</Text>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <CommunalNavBar
                    leftItem = {() => this.renderLeftItem()}
                    titleItem = {() => this.renderTitleItem()}
                />
                <Text style={{color:'red',fontSize:15,marginTop:40,}}>
                    我的外勤
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },

    navBarLeftItemStyle: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },

    navBarTitleItemStyle: {
        fontSize:17,
        color:'black',
        marginRight:50
    },
});