/**
 * Created by jinglan on 2017/6/9.
 */
import React, {Component} from 'react';
import {Dimensions, InteractionManager} from 'react-native';
import JPushModule from 'jpush-react-native';
import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    AlertIndicatorIOS,
    ActivityIndicatorIOS,
    AlertIOS,
} from 'react-native';
import Toast from 'react-native-root-toast';
import CommunalNavBar from '../main/GDCommunalNavBar';

import SubViewTest from "../test/SubViewTest";
import styles from './css/MessageCenterStyle'
import MessageCell from './view/MessageCenterCell'
import Platform from "react-native";

var stickyId = 3

const window = Dimensions.get('window');

export const SCREEN_WIDTH = window.width;
export default class MessageCenterPage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2}),
            loaded:false,                   // 是否初始化 ListView
            // getRowData: getRowData,
        }
        this.messageArr = [];
        this.lastID = null;
        this.pageCount = 10;
        this._loadData = this._loadData.bind(this);
        this._loadMoreData = this._loadMoreData.bind(this);
        this.props.navigator.setTabBadge({
            badge: 88 // 数字气泡提示, 设置为null会删除
        });
    }


    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
    };

    dataBlob: {}
    sectionIDs: []
    rowIDs: []


    _loadData() {

        let loading = SActivityIndicator.show(true, "加载中...");
        this.lastID = null;
        apis.loadMessageData(this.pageCount,'').then(

        (responseData) => {
             SActivityIndicator.hide(loading);

            if(responseData !== null && responseData.data !== null) {
                this.messageArr = [];

                this.messageArr = this.messageArr.concat(responseData.data);
                // console.log(this.messageArr)

                if (this.messageArr.length == this.pageCount){
                    this.lastID = this.messageArr[this.pageCount - 1].msgId;
                    console.log(this.lastID +'你大爷');

                }

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.messageArr),
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

    _loadMoreData() {

        if (this.lastID == null){
            return;
        }

        apis.loadMessageData(this.pageCount,this.lastID).then(

            (responseData) => {

                this.messageArr = this.messageArr.concat(responseData.data);

                if (responseData.data.length == this.pageCount){
                    this.lastID = responseData.data[this.pageCount - 1].msgId;
                    console.log(this.lastID +'你大爷');

                }else {

                    this.lastID = null;
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.messageArr),
                    loaded:true,
                });

                if(responseData !== null && responseData.data !== null) {

                }
            },
            (e) => {
                console.log("获取失败" , e);
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    listViewHandleData(result) {
        var me = this,
            dataBlob = {},
            sectionIDs = ['s0', 's1'],
            rowIDs = [[], []],
            key,
            //result = Util.sortResource(data),        //重新排序
            length = result.length,
            splitIdx;

        //将数据分隔成两段
        for (var i = 0; i < length; i++) {
            key = result[i]['userId'];
            if (key === stickyId) {
                dataBlob['s1'] = result[i];
                splitIdx = true;
            } else {
                if (splitIdx) {
                    dataBlob['s1:' + key] = result[i];
                    rowIDs[1].push(key);
                } else {
                    dataBlob['s0:' + key] = result[i];
                    rowIDs[0].push(key);
                }

            }
        }
        console.log(dataBlob, sectionIDs, rowIDs);

        return {
            dataBlob: dataBlob,
            sectionIDs: sectionIDs,
            rowIDs: rowIDs
        }
    }



    componentDidMount() {

        Toast.show('componentDidMount ' + Platform.OS + (Platform.OS === 'android'));

        try {
            if (Platform.OS !== 'ios') {
                JPushModule.initPush();
                JPushModule.notifyJSDidLoad();

                JPushModule.addReceiveCustomMsgListener((message) => {
                    //this.setState({pushMsg: message});
                    console.log("receive 自定义消息: " + JSON.stringify(message));
                    Toast.show('receive 自定义消息: ' + JSON.stringify(message));
                });
                JPushModule.addReceiveNotificationListener((message) => {
                    console.log("receive notification: " + JSON.stringify(message));
                    Toast.show('receive notification: ' + JSON.stringify(message));
                })
            }
        } catch (e) {
            Toast.show('JPush error: ' + e.message);
        }
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
    }

    componentWillMount() {
        this._loadData();

    }

    toMyOutSideWork() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                // screen: 'VerifyCompanyName',
                screen: 'GetLicensePage',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)
            });
        });
    }

    static renderTitleItem() {
        return (
            <Text style={styles.navbarTitleItemStyle}>消息中心</Text>
        );
    }

    static renderbadTitleItem() {
        return (
            <Text style={styles.navbarTitleItemStyle}>获取失败</Text>
        );
    }

    _renderRow(rowData) {
        return (
            <TouchableOpacity onPress={() => {
                this.toMyOutSideWork()
            }}>
                {/*<View style={styles.rowStyle}>*/}


                <MessageCell messageTitle={rowData.title}
                             messageSubTitle = {rowData.subTitle}
                             messageTime = {rowData.date}
                             messageIcon={rowData.type == 'outservice'?  rowData.read ?  require('../img/system_y.png') : require('../img/system.png') : require('../img/field.png')}
                />


            </TouchableOpacity>
        );
    }


    // 根据网络状态决定是否渲染 ListView
    renderListView() {
        if (this.state.loaded === false) {      // 无数据
            return(
                <View style={[{flex : 1 , backgroundColor:'orange' }]}></View>
            );
        }else {         // 有数据
            return(
                <ListView ref="pullList"
                          // onPullRelease={(resolve) => this.loadData(resolve)}     // 下拉刷新操作
                          dataSource={this.state.dataSource}          // 设置数据源
                          renderRow={(rowData) => this._renderRow(rowData)}  // 根据数据创建相应 cell
                          showsHorizontalScrollIndicator={false}      // 隐藏水平指示器
                          style={styles.listViewcontainer}                // 样式
                          initialListSize={7}                         // 优化:一次渲染几条数据
                          // renderHeader={this.renderHeader}            // 设置头部视图
                          onEndReached={this._loadMoreData}                // 当接近底部特定距离时调用
                          // onEndReachedThreshold={60}                  // 当接近底部60时调用
                          // renderFooter={this.renderFooter}            // 设置尾部视图
                          // removeClippedSubviews={true}                // 优化
                          enableEmptySections={true}
                />
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CommunalNavBar
                    titleItem={() => MessageCenterPage.renderTitleItem()}
                />

                {this.renderListView()}

            </View>
        );
    }
}




