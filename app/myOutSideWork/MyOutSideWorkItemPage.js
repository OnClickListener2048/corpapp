/**
 * Created by jiaxueting on 2017/6/14.
 */

import React,{Component,PropTypes}from 'react';
import {ListView, View, StyleSheet, TouchableOpacity, InteractionManager, Image, Text,Platform,
    RefreshControl,ActivityIndicator
} from "react-native";
import MyOutSideWorkCell from "./view/MyOutSideWorkCell";
import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../config';
import NoMessage from "../test/NoMessage";
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import Toast from 'react-native-root-toast';
import {loadOutSourceList} from "../apis/outSource";
import BComponent from "../base";

export default class MyOutSideWorkItemPage extends BComponent{

    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };


    constructor(props){
        super(props)

        this.state = {
            label: this.props.label,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2}),
            loaded:false,
            dataFaild:false,
            refresh:this.props.refresh,
            isRefreshing: false,
            loadingMore : 0,
            isNoNetwork : false,

        }
        this.lastID = null;
        this.isLoading = false;
        this.outList = [];
        this.pageCount = 15;
        this._loadList = this._loadList.bind(this);
        this._loadMoreData = this._loadMoreData.bind(this);
        this._loadAgainList = this._loadAgainList.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.setRefresh = this.setRefresh.bind(this);
        // this.setEndLoading = this.setEndLoading.bind(this);

    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        super.onNavigatorEvent(event);
    }

    static propTypes = {
        label: PropTypes.string,
        refresh:PropTypes.bool,
    };

    componentWillMount() {
        this._loadList();

    }

    //这里是收到需要刷新外勤列表的callBack 调用刷新方法 
    setRefresh(needRefresh){
        this._loadList();

    }

    // setEndLoading(){
    //     this.setState({isRefreshing: false});
    //     console.log("这里这里这里");
    //
    //
    // }

    //将ID传值给父组件
    _press(statusId) {
        console.log("====>>>"+statusId);
        if (this.props.label == null) {
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    screen: 'MyOutSideTaskPage',
                    backButtonTitle: '返回', // 返回按钮的文字 (可选)
                    backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                    passProps: {
                        taskId:statusId,
                    }
                });
            });
        } else {
        this.props.callback(statusId);
        }
    }

    _loadList(){

        if(!NetInfoSingleton.isConnected) {
            this.setState({
                isNoNetwork:true,
            });
            return;
        }
        this.setState({
            isNoNetwork:false,
        });


        let loading = SActivityIndicator.show(true, "加载中...");
        let taskType = this.props.label==null?'all':this.props.label;
        this.lastID = null;
        loadOutSourceList(this.pageCount,'',taskType).then(

            (responseData) => {
                SActivityIndicator.hide(loading);

                if(responseData !== null && responseData.data !== null) {
                    this.outList = [];
                    console.log("开始请求2----"+responseData.data);
                    this.outList= this.outList.concat(responseData.data);
                    console.log("开始请求outlist----"+this.outList);

                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(this.outList),
                            loaded:true,
                            dataFaild : false,
                    });

                    if (responseData.data.length === this.pageCount){
                        this.lastID = this.outList[this.outList.length - 1].stepId;

                    }else {
                        this.setState({loadingMore: 2});

                    }

                }

            },
            (e) => {
                SActivityIndicator.hide(loading);

                if ( this.outList.length > 0){
                    // 关闭刷新动画
                    this.setState({
                        loaded:true,
                        dataFaild: false,
                    });
                }else {
                    // 关闭刷新动画
                    this.setState({
                        loaded:true,
                        dataFaild: true,
                    });

                }
                console.log("获取失败" , e);
                Toast.show('获取失败' + e.msg);
            },
        );
    }

    _loadAgainList(){
        if(!NetInfoSingleton.isConnected) {
            Toast.show('暂无网络' );
            this.setState({isRefreshing: false});
            return;
        }

        let taskType = this.props.label==null?'all':this.props.label;
        this.setState({isRefreshing: true});
        this.lastID = null;
        loadOutSourceList(this.pageCount,'',taskType).then(

            (responseData) => {

                if(responseData !== null && responseData.data !== null) {
                    this.outList = [];
                    console.log("开始请求2----"+responseData.data);
                    this.outList= this.outList.concat(responseData.data);
                    console.log("开始请求outlist----"+this.outList);

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.outList),
                        loaded:true,
                        dataFaild : false,
                    });

                    if (responseData.data.length == this.pageCount){
                        this.lastID = this.outList[this.outList.length - 1].stepId;
                        this.setState({loadingMore: 0});

                    }else {
                        this.setState({loadingMore: 2});

                    }

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.outList),
                        loaded:true,
                    });
                    this.setState({isRefreshing: false});

                }

            },
            (e) => {
                // 关闭刷新动画
                this.setState({isRefreshing: false});
                console.log("获取失败" , e);
                Toast.show('获取失败');
            },
        );
    }

    _loadMoreData() {
        if(!NetInfoSingleton.isConnected) {
            Toast.show('暂无网络' );
            return;
        }

        console.log('加载更多哈哈');
        let taskType = this.props.label==null?'all':this.props.label;
        if (this.lastID === null){
            return;
        }
        if (this.isLoading === true){
            return;
        }
        this.setState({loadingMore: 1});

        this.isLoading = true;
        loadOutSourceList(this.pageCount,this.lastID,taskType).then(

            (responseData) => {

                if(responseData !== null && responseData.data !== null) {
                    console.log("开始请求2----"+responseData.data);
                    this.lastID = null
                    this.outList= this.outList.concat(responseData.data);
                    console.log("开始请求outlist----"+this.outList);

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.outList),
                        loaded:true,
                        dataFaild : false,
                    });

                    if (responseData.data.length == this.pageCount){
                        this.lastID = this.outList[this.outList.length - 1].stepId;

                        this.setState({loadingMore: 0});

                    }else {
                        this.setState({loadingMore: 2});

                    }

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.outList),
                        loaded:true,
                    });
                    this.isLoading = false;

                }

            },
            (e) => {
                // 关闭刷新动画
                this.isLoading = false;
                console.log("获取失败" , e);
                Toast.show('获取失败');
            },
        );
    }

    renderFooter(){
        if (this.state.loadingMore == 1){
            return(
                <View style={{height:60,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <ActivityIndicator size={'small'}/>
                    <Text style={{marginLeft: 10}}>加载中...</Text>

                </View>
            );
            //加载中..
        }else if (this.state.loadingMore == 0){
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>


                    <View style={{height:1,width:60 ,backgroundColor:'#dcdcdc',alignItems:'center',justifyContent:'center',}}>
                    </View>

                    <Text style={{color:'#999999',marginLeft:10,marginRight:10,fontSize:12,alignItems:'center',justifyContent:'center'}}>
                        {'历史消息'}
                    </Text>
                    <View style={{height:1,width:60 ,backgroundColor:'#dcdcdc',alignItems:'center',justifyContent:'center',}}>
                    </View>
                </View>);

        }else {
            return null;
        }
    }

    _renderRow(rowData) {
        let statusicon = rowData.taskName.substring(0,1);
        if(rowData.taskStatus==='已取消'){
            return (
                    <MyOutSideWorkCell
                        statusIcon = {statusicon}
                        statusName = {rowData.taskName}
                        companyName = {rowData.corpName}
                        statusContent = {rowData. stepName}
                        statusCourse = {rowData.taskStatus}
                    />
            );
        }else {
            return (
                <TouchableOpacity onPress={() => {
                    this._press(rowData.taskId)
                }}>
                    <MyOutSideWorkCell
                        statusIcon={statusicon}
                        statusName={rowData.taskName}
                        companyName={rowData.corpName}
                        statusContent={rowData.stepName}
                        statusCourse={rowData.taskStatus}
                    />


                </TouchableOpacity>
            );
        }
    }


    renderListView() {
        if (this.state.isNoNetwork === true) {      // 无网络
            return(


            <View style={[{flex : 1 , backgroundColor:'#FFFFFF' ,height: this.props.label == null ? SCREEN_HEIGHT - 65 : SCREEN_HEIGHT - 112}]}>
                <TouchableOpacity onPress={() => {this._loadAgainList()}}>
                    <NoMessage
                        textContent='网络错误,点击重新开始'
                        active={require('../img/network_error.png')}/>
                </TouchableOpacity>
            </View>

            );
        }else if (this.state.dataFaild === true) {      // 数据加载失败
            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' ,height: this.props.label == null ? SCREEN_HEIGHT - 65 : SCREEN_HEIGHT - 112}]}>
                    <TouchableOpacity onPress={() => {this._loadList()}}>
                    <NoMessage
                        textContent='加载失败，点击重试'
                        active={require('../img/load_failed.png')}/>
                    </TouchableOpacity>
                </View>
            );
        }else if (this.outList.length == 0){

            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' ,height: this.props.label == null ? SCREEN_HEIGHT - 65 : SCREEN_HEIGHT - 112}]}>
                    <TouchableOpacity onPress={() => {this._loadList()}}>
                    <NoMessage
                        textContent='暂无消息'
                        active={require('../img/no_message.png')}/>
                    </TouchableOpacity>
                </View>
            );
        }else {
            return (

                <ListView
                    style={[{flex : 1 }]}
                    dataSource={this.state.dataSource}
                    onEndReached={this._loadMoreData}
                    renderFooter={this.renderFooter}
                    enableEmptySections={true}
                    onEndReachedThreshold={10}
                    renderRow={this._renderRow.bind(this)}
                    refreshControl ={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._loadAgainList}
                            title={'加载中...'}
                            titleColor={'#b1b1b1'}
                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor={'#fafafa'}

                        />
                    }
                />
            )
        }


    }



    render() {
        if(this.props.label==null){

            var allListHeight = Platform.OS === 'ios' ? SCREEN_HEIGHT-65 : SCREEN_HEIGHT-83;
        }else{
            var allListHeight = Platform.OS === 'ios' ? SCREEN_HEIGHT-112 : SCREEN_HEIGHT-127;
        }
        return (
            <View style={[styles.container,{height:allListHeight}]}>

                {this.renderListView()}

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
        width:SCREEN_WIDTH,
        backgroundColor: '#FAFAFA',
        flexDirection: 'column'
    },
    noMessageContainer:{
        justifyContent:'center',
        alignItems:'center',
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