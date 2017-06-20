/**
 * 我的外勤
 * Created by jiaxueting on 2017/6/13.
 */

import React,{Component}from 'react';
import {Text, View, Dimensions, TouchableOpacity,InteractionManager, Image,DeviceEventEmitter,ListView,} from "react-native";
import MyOutSideWorkItemPage from "./MyOutSideWorkItemPage";
const window = Dimensions.get('window');
export const height = window.height;
export const width = window.width;
let naviButtonWidth = width / 3;    //计算导航条每个宽度
let naviButtonHeight = width * 0.75;   // 导航条每个高度
const dismissKeyboard = require('dismissKeyboard');
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../myOutSideWork/view/TabBar';

export default class MyOutSideWorkPage extends Component{

    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    static navigatorButtons = {
        rightButtons: [
            {
                title: '全部', // for a textual button, provide the button title (label)
                buttonColor: 'black', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                id: 'edit'
            }]

    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                InteractionManager.runAfterInteractions(() => {
                    this.props.navigator.push({
                        screen: 'MyOutSideWorkItemPage',
                        backButtonTitle: '返回', // 返回按钮的文字 (可选)
                        backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                        title:'我的外勤',
                    });
                });
            }
        }

    }

    //获取item列表项的ID，跳转并传值
    _callback(statusId) {

        this.setState({
            status: statusId,
        });

        if(statusId!=0){
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    screen: 'SubViewTest',
                    backButtonTitle: '返回', // 返回按钮的文字 (可选)
                    backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                });
            });
        }

    }


    render(){
        return(
            <View style={{flex:1}}>
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
                    <MyOutSideWorkItemPage tabLabel={{label: "待处理", badge: 2,theLast:1}}
                          label="待处理" callback={this._callback.bind(this)}
                    />
                    <MyOutSideWorkItemPage tabLabel={{label: "进行中", badge: 700,theLast:1}} label="进行中"
                                           callback={this._callback.bind(this)}/>
                    <MyOutSideWorkItemPage tabLabel={{label: "已完成", badge: 10,theLast:0}} label="已完成"
                                           callback={this._callback.bind(this)}/>
                </ScrollableTabView>
            </View>
        );
}

}
// const styles = StyleSheet.create({
//     navBarLeftItemStyle: {
//         width:20,
//         height:20,
//         marginLeft:15,
//     },
//     navBarTitleItemStyle: {
//         fontSize:17,
//         color:'black',
//         marginRight:50
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#FAFAFA',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     welcome: {
//         fontSize: 18,
//         marginTop:20,
//         color:'#969696',
//     },
//     noMessageImg:{
//         marginTop:160,
//     }
// });