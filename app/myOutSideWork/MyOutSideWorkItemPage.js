/**
 * Created by jiaxueting on 2017/6/14.
 */

import React,{Component,PropTypes}from 'react';
import {ListView, View, StyleSheet, TouchableOpacity, InteractionManager, Image, Text} from "react-native";
import MyOutSideWorkCell from "./view/MyOutSideWorkCell";
import SubViewTest from "../test/SubViewTest";
import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../config';
import NoMessage from "../test/NoMessage";
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import Toast from 'react-native-root-toast';
import {loadOutSourceList} from "../apis/outSource";

export default class MyOutSideWorkItemPage extends Component{

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
        }
        this.outList = [];
        this._loadList = this._loadList.bind(this);

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

    _renderRow(rowData) {
        let statusicon = rowData.stepName.substring(0,1);
        return (
            <TouchableOpacity onPress={() => {this._press(this, 1)}}>
                <MyOutSideWorkCell
                    statusIcon = {statusicon}
                    statusName = {rowData.stepName}
                    companyName = {rowData.corpName}
                    statusContent = {rowData. taskName}
                    statusCourse = {rowData.taskStatus}
                />


            </TouchableOpacity>
        );
    }


    renderListView() {

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

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this._renderRow(rowData)}
                />


            )
        }
        

    }



    render() {
        return (
            <View style={styles.container}>

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