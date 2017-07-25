/**
 * 我的外勤
 * Created by jiaxueting on 2017/6/13.
 */

import React,{Component}from 'react';
import {Text, View, Dimensions, TouchableOpacity,InteractionManager, Image,Platform,DeviceEventEmitter,ListView,} from "react-native";
import MyOutSideWorkItemPage from "./MyOutSideWorkItemPage";
import {loadOutSourceCount} from "../apis/outSource";
import BComponent from "../base";
import NoNetEmptyView from "../base/NoNetEmptyView";
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
import NoMessage from "../test/NoMessage";
import NetInfoSingleton from "../util/NetInfoSingleton";
import errorText from '../util/ErrorMsg';

export default class MyOutSideWorkPage extends BComponent{

    constructor(props) {
        super(props);
        this.state = {
            outSourceCountObj : {},
            loaded:false,
            needLoding:true,
            canClickBtn : false,

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
        super.onNavigatorEvent(event);
        if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'edit') { // this is the same id field from the static navigatorButtons definition
                if (this.state.canClickBtn === false){
                    return;
                }

                this.state.canClickBtn = false;

                    this.props.navigator.push({
                        screen: 'MyOutSideWorkItemPage',
                        backButtonTitle: '返回', // 返回按钮的文字 (可选)
                        backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                        title:'我的外勤',
                    });
            }
        }


        console.log('ApplicationCenterPage event.type', event.type);
        if(event.id==='willAppear'){
            this.state.canClickBtn = true;
        }

    }

    //获取item列表项的ID，跳转并传值
    _callback(statusId) {

        this.setState({
            status: statusId,
        });
        if (this.state.canClickBtn === false){
            return;
        }

        this.state.canClickBtn = false;

                this.props.navigator.push({
                    screen: 'MyOutSideTaskPage',
                    backButtonTitle: '返回', // 返回按钮的文字 (可选)
                    backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                    passProps: {
                        taskId:statusId,
                        callback : this._loadCount
                    }
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
                Toast.show(errorText(e));
            },
        );

    }

    // _closepull(page){
        // if(page===2){
        //     console.log("==关闭下拉刷新==");

            // if(this.refs.toDo) {
            //     this.refs.toDo.setEndLoading();
            // }
            //
            // if(this.refs.doing) {
            //     this.refs.doing.setEndLoading();
            // }
            //
            // if(this.refs.done) {
            //     this.refs.done.setEndLoading();
            // }

    //     }
    // }


    _renderScrollView(){
        // if (NetInfoSingleton.isConnected === false) {      // 无网络
        //     return(
        //
        //
        //         <View style={[{flex : 1 , backgroundColor:'#FFFFFF' ,flex : 1}]}>
        //             <TouchableOpacity onPress={() => {this._loadCount(true)}}>
        //                 <NoMessage
        //                     textContent='网络错误,点击重新开始'
        //                     active={require('../img/network_error.png')}/>
        //             </TouchableOpacity>
        //         </View>
        //
        //     );
        // }
        //else
        console.log("外勤入口 this.state.loaded=", this.state.loaded);
            if (this.state.loaded){
        return   <ScrollableTabView
            tabBarUnderlineColor="#FF0000"
            tabBarActiveTextColor="#FF0000"
            // locked={true}
            renderTabBar={() => <TabBar
                underlineColor={'transparent'}
                // underlineColor={Platform.OS==='ios'?'#FF0000':'transparent'}
                                        // callback={this._closepull.bind(this)}
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

         return   <View style={[{flex : 1 , backgroundColor:'#FFFFFF' ,flex : 1}]}>
                <TouchableOpacity onPress={() => {this._loadCount(true)}}>
                    <NoMessage
                        textContent='网络错误,点击重新开始'
                        active={require('../img/network_error.png')}/>
                </TouchableOpacity>
            </View>
        // return <View style={{backgroundColor : '#FFFFFF' , flex:1}}></View>
    }

    }


    render(){
        return(
            <View style={{flex:1}}>
                <NoNetEmptyView onClick={() => {this._loadCount(true)}} />
                {this.navigatorStyle}
                {this._renderScrollView()}
            </View>
        );
}

}