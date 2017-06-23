/**
 * Created by jiaxueting on 2017/6/14.
 */

import React,{Component,PropTypes}from 'react';
import {ListView, View, StyleSheet, TouchableOpacity, InteractionManager, Image, Text} from "react-native";
import MyOutSideWorkCell from "./view/MyOutSideWorkCell";
import SubViewTest from "../test/SubViewTest";
import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../config';
import NoMessage from "../test/NoMessage";
import MyOutSideWorkPage from "./MyOutSideWorkPage";
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import Toast from 'react-native-root-toast';
import {loadOutSourceList} from "../apis/outSource";

//模拟我的外勤数据
var data = (function(){
    var obj = {};
    var _pending = [];
    for(var i = 0;i < 15; i++){//待处理
        _pending.push({
            "userId" : i,
            "statusIcon": "注",
            "statusName": "注册公司",
            "companyName": "医保化纤电子商务",
            "statusContent": "银行开户",
            "statusCourse": "待处理",
            "statusIconBg": "orange",
        })
    }

    var _waiting = [];
    for(var i = 0;i < 15; i++){//进行中
        _waiting.push({
            "userId" : i,
            "statusIcon": "名",
            "statusName": "名称变更",
            "companyName": "张三丰",
            "statusContent": "核实名称",
            "statusCourse": "进行中",
            "statusIconBg": "green",
        })
    }

    var _finished = [];
    for(var i = 0;i < 15; i++){//已完成
        _finished.push({
            "userId" : i,
            "statusIcon": "名",
            "statusName": "名称变更",
            "companyName": "张三丰",
            "statusContent": "核实名称",
            "statusCourse": "已完成",
            "statusIconBg": "red",
        })
    }

    obj = {"_pending":_pending,"_waiting":_waiting,"_finished":_finished}
    return obj;
})()

export default class MyOutSideWorkItemPage extends Component{

    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };


    constructor(props){
        super(props)
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        this.state = {
            label: this.props.label,
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                // getSectionHeaderData: getSectionData, //组头信息
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            loaded:false,
        }
        this.outList = [];
    }

    static propTypes = {
        label: PropTypes.string,
    };

    componentWillMount() {
        this._loadList();

    }

    //将ID传值给父组件
    _press(statusId) {
        if (this.props.label == null) {
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    screen: 'SubViewTest',
                    backButtonTitle: '返回', // 返回按钮的文字 (可选)
                    backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                });
            });
        } else {
        this.props.callback(statusId);
        }
    }

    _loadList(){
        let loading = SActivityIndicator.show(true, "加载中...");
        let taskType = this.props.label==null?'all':this.props.label;
        loadOutSourceList(15,'',taskType).then(

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
                    });


                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("获取失败" , e);
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    listViewHandleData(result){
        var me = this,
            dataBlob = {},
            sectionIDs = ['s0'],//'s0','s1'
            rowIDs = [[]],
            key,
            length = result.length

        for(var i = 0;i < length; i++){
            key = result[i]['userId'];
            dataBlob['s0:' + key] = result[i];
            rowIDs[0].push(key);
        }

        console.log('dataBlob==',dataBlob,'sectionIDs==',sectionIDs,'rowIDs==',rowIDs);

        return {
            dataBlob : dataBlob,
            sectionIDs : sectionIDs,
            rowIDs : rowIDs
        }
    }

    // componentWillMount(){
    //     this._loadList();
    //     var res = this.listViewHandleData(this.outList);
    //     console.log(res)
    //     this.setState({
    //         dataSource: this.state.dataSource.cloneWithRowsAndSections(res.dataBlob,res.sectionIDs,res.rowIDs),
    //         loaded: true
    //     });
    // }

    _renderRow(rowData) {

        return (
            <TouchableOpacity onPress={() => {this._press(this, 1)}}>
                <MyOutSideWorkCell
                    statusIcon = {rowData.stepId}
                    statusName = {rowData.stepName}
                    companyName = {rowData.corpName}
                    statusContent = {rowData. taskName}
                    statusCourse = {rowData.taskStatus}
                />


            </TouchableOpacity>
        );
    }

    render() {

        if (this.state.loaded === false) {      // 数据加载失败
            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' ,height: this.props.label == null ? SCREEN_HEIGHT - 65 : SCREEN_HEIGHT - 112}]}>
                    <NoMessage
                        textContent='加载失败，点击重试'
                        active={require('../img/load_failed.png')}/>
                </View>
            );
        }else if (this.outList.length == 0){

            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' ,height: this.props.label == null ? SCREEN_HEIGHT - 65 : SCREEN_HEIGHT - 112}]}>
                    <NoMessage
                        textContent='暂无消息'
                        active={require('../img/no_message.png')}/>
                </View>
            );
        }else {
            return (
                <View
                    style={[styles.container, {height: this.props.label == null ? SCREEN_HEIGHT - 65 : SCREEN_HEIGHT - 112}]}>
                    {/*{this.props.label == "待处理"&&data._pending.length === 0&&*/}
                    {/*<NoMessage*/}
                    {/*textContent='暂无消息'*/}
                    {/*active={require('../img/no_message.png')}/>*/}
                    {/*}*/}

                    {/*{this.props.label == "进行中"&&data._waiting.length === 0&&*/}
                    {/*<NoMessage*/}
                    {/*textContent='加载失败，点击重试'*/}
                    {/*active={require('../img/load_failed.png')}/>*/}
                    {/*}*/}

                    {/*{this.props.label == "已完成"&&data._finished.length === 0&&*/}
                    {/*<NoMessage*/}
                    {/*textContent='网络错误（错误代码：4009）下拉重新开始'*/}
                    {/*active={require('../img/network_error.png')}/>*/}
                    {/*}*/}

                    {/*{this.props.label == "全部"&&data._finished.length === 0&&*/}
                    {/*<NoMessage*/}
                    {/*textContent='暂无消息'*/}
                    {/*active={require('../img/no_message.png')}/>*/}
                    {/*}*/}


                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => this._renderRow(rowData)}
                    />
                </View>
            )
        }
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
        height:SCREEN_HEIGHT-112,
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