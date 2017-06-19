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
        }
    }

    static propTypes = {
        label: PropTypes.string,
    };

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

    componentWillMount(){
        if(this.props.label == "待处理"){
            var res = this.listViewHandleData(data._pending);
        }else if(this.props.label == "进行中"){
            var res = this.listViewHandleData(data._waiting);
        }else if(this.props.label == "已完成"){
            var res = this.listViewHandleData(data._finished);
        }else if(this.props.label == "全部"){
            var res = this.listViewHandleData(data._finished);
        }else{
            var res = this.listViewHandleData(data._finished);
        }
        console.log(res)
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(res.dataBlob,res.sectionIDs,res.rowIDs),
            loaded: true
        });
    }

    _renderRow(rowData, sectionID, rowID) {

        return (
            <TouchableOpacity onPress={() => {this._press(this, 1)}}>
                <MyOutSideWorkCell
                    statusIcon = {rowData.statusIcon}
                    statusName = {rowData.statusName}
                    companyName = {rowData.companyName}
                    statusContent = {rowData.statusContent}
                    statusCourse = {rowData.statusCourse}
                    statusIconBg = {rowData.statusIconBg}
                />


            </TouchableOpacity>
        );
    }

    render() {
        return(

            <View style={[styles.container,{height:this.props.label == null?SCREEN_HEIGHT-65:SCREEN_HEIGHT-112}]}>
                {this.props.label == "待处理"&&data._pending.length === 0&&
                    <NoMessage/>
                }

                {this.props.label == "进行中"&&data._waiting.length === 0&&
                    <NoMessage/>
                }

                {this.props.label == "已完成"&&data._finished.length === 0&&
                    <NoMessage/>
                }

                {this.props.label == "全部"&&data._finished.length === 0&&
                    <NoMessage/>
                }

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID, highlightRow) => this._renderRow(rowData, sectionID, rowID, highlightRow)}
                />
            </View>
        )
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