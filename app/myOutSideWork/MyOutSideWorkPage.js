/**
 * 我的外勤
 * Created by jiaxueting on 2017/6/13.
 */

import React,{Component}from 'react';
import {Text, View, Dimensions, TouchableOpacity,InteractionManager, Image,DeviceEventEmitter,ListView,} from "react-native";
import MyOutSideWorkItemPage from "./MyOutSideWorkItemPage";
import {loadOutSourceCount} from "../apis/outSource";
const window = Dimensions.get('window');
export const height = window.height;
export const width = window.width;
let naviButtonWidth = width / 3;    //计算导航条每个宽度
let naviButtonHeight = width * 0.75;   // 导航条每个高度
const dismissKeyboard = require('dismissKeyboard');
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../myOutSideWork/view/TabBar';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import Toast from 'react-native-root-toast';



export default class MyOutSideWorkPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            outSourceCountObj : {},
            loaded:false,
            needLoding:true,
        }
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this._loadCount = this._loadCount.bind(this);
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

    //点击右按钮
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

            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    screen: 'MyOutSideTaskPage',
                    backButtonTitle: '返回', // 返回按钮的文字 (可选)
                    backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                    passProps: {
                        taskId:statusId,
                        callback : this._loadCount
                    }
                });
            });
    }

    componentWillMount() {
        this._loadCount(true);
        console.log('componentWillMount');
    }

        //获取每个外勤状态数量
    _loadCount(needLoding){

        let loading;

        console.log("你你你==="+ needLoding);

        if (!needLoding){

            this.setState({
                needLoding:false,
            })

            let callback = this.props.callback;
            if(callback) {
                callback(false);
            }

            if(this.refs.toDo) {
                this.refs.toDo.setRefresh(true);
            }

            if(this.refs.doing) {
                this.refs.doing.setRefresh(true);
            }

            if(this.refs.done) {
                this.refs.done.setRefresh(true);
            }
        }

        if (needLoding){
            loading  = SActivityIndicator.show(true, "加载中...");
        }



        loadOutSourceCount().then(

            (responseData) => {
                if (needLoding){
                    SActivityIndicator.hide(loading);
                }
                if(responseData !== null && responseData.data !== null) {
                    this.outSourceCountObj = {};
                    console.log("开始请求2是"+responseData.data.todoNum+"，"+responseData.data.totalNum+"，"+responseData.data.inProgressNum);

                    this.setState({
                        outSourceCountObj: responseData.data,
                        loaded:true,
                    });
                    console.log("===>>>"+this.state.outSourceCountObj.todoNum+this.state.outSourceCountObj.inProgressNum+this.state.outSourceCountObj.totalNum);
                }
            },
            (e) => {
                if (needLoding){
                    SActivityIndicator.hide(loading);
                }                console.log("获取失败" , e);
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );

    }



    _renderScrollView(){
    if (this.state.loaded){
        return   <ScrollableTabView
            tabBarUnderlineColor="#FF0000"
            tabBarActiveTextColor="#FF0000"
            renderTabBar={() => <TabBar underlineColor={'#FF0000'}

                                        tabBarTextStyle={{fontSize: 18}}/>}
        >
            {/*
             We have to use tabLabel to pass tab options to TabBar component,
             because ScrollableTabView passing only this prop to tabs.
             */}
            <MyOutSideWorkItemPage
                ref="toDo"
                tabLabel={{label: '待处理', badge: this.state.outSourceCountObj.todoNum, theLast: 1}}
                label="todo" callback={this._callback.bind(this)}
                refresh={this.state.needLoding}
            />
            <MyOutSideWorkItemPage  ref="doing"
                tabLabel={{label: "进行中", badge: this.state.outSourceCountObj.inProgressNum, theLast: 1}}
                label="inProgress"
                refresh={this.state.needLoding}
                callback={this._callback.bind(this)}/>
            <MyOutSideWorkItemPage  ref="done" tabLabel={{label: "已完成", badge: 0, theLast: 0}}
                                   label="end"
                                   refresh={this.state.needLoding}
                                   callback={this._callback.bind(this)}/>

        </ScrollableTabView>

    }else {

        return <View style={{backgroundColor : '#FFFFFF' , flex:1}}></View>
    }

    }


    render(){
        console.log("render你妹==="+this.state.data);
        return(
            <View style={{flex:1}}>
                {this.navigatorStyle}
                {this._renderScrollView()}
            </View>
        );
}

}