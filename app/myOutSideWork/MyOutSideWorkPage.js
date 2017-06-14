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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../myOutSideWork/view/TabBar';

const Page = ({label}) => (
    <View style={styles.container}>
        <Image style={styles.noMessageImg}
               source = {require('../img/no_message.png')}/>
        <Text style={styles.welcome}>
            {label}
        </Text>


    </View>
);

export default class MyOutSideWorkPage extends Component{

    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    render(){
        return(



            <View style={{height:height,width:width}}>
                {this.navigatorStyle}
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
                          label="暂无消息"/>
                    <Page tabLabel={{label: "进行中", badge: 700,theLast:1}} label="暂无消息!"/>
                    <Page tabLabel={{label: "已完成", badge: 0,theLast:0}} label="暂无消息3"/>
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
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 18,
        marginTop:20,
        color:'#969696',
    },
    noMessageImg:{
        marginTop:160,
    }
});