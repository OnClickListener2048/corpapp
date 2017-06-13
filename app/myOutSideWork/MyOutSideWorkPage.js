/**
 * 我的外勤
 * Created by jiaxueting on 2017/6/13.
 */

import React,{Component}from 'react';
import {Text, View, Dimensions, TouchableOpacity, Image,StyleSheet,DeviceEventEmitter} from "react-native";
const window = Dimensions.get('window');
export const height = window.height;
export const width = window.width;
let naviButtonWidth = width / 3;    //计算导航条每个宽度
let naviButtonHeight = width * 0.75;   // 导航条每个高度
const dismissKeyboard = require('dismissKeyboard');
import CommunalNavBar from '../main/GDCommunalNavBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../myOutSideWork/view/TabBar';

const Page = ({label}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            {label}
        </Text>
        <Text style={styles.instructions}>
            To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
        </Text>
    </View>
);

export default class MyOutSideWorkPage extends Component{

    // 返回
    pop() {
        // 回收键盘
        dismissKeyboard();

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

    // 返回中间按钮
    renderTitleItem() {
        return(
            <Text style={styles.navBarTitleItemStyle}>我的外勤</Text>
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

    render(){
        return(



            <View style={{height:height,width:width}}>
                <CommunalNavBar
                    leftItem = {() => this.renderLeftItem()}
                    titleItem = {() => this.renderTitleItem()}
                />
                <ScrollableTabView
                    tabBarUnderlineColor="#FF0000"
                    tabBarActiveTextColor="#FF0000"
                    renderTabBar={() => <TabBar underlineColor={'#FF0000'}

                                                tabBarTextStyle={{fontSize:18}}/>}
                >
                    {/*
                     We have to use tabLabel to pass tab options to TabBar component,
                     because ScrollableTabView passing only this prop to tabs.
                     */}
                    <Page tabLabel={{label: "待处理", badge: 2,theLast:1}}
                          label="Page #1"/>
                    <Page tabLabel={{label: "进行中", badge: 700,theLast:1}} label="Page #2 aka Long!"/>
                    <Page tabLabel={{label: "已完成", badge: 0,theLast:0}} label="Page #3"/>
                </ScrollableTabView>
            </View>
        );
}

}
const styles = StyleSheet.create({
    navBarLeftItemStyle: {
        width:20,
        height:20,
        marginLeft:15,
    },
    navBarTitleItemStyle: {
        fontSize:17,
        color:'black',
        marginRight:50
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});