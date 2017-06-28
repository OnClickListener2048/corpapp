/**
 * Created by jinglan on 2017/6/9.
 */
import React, {Component} from 'react';
import {Dimensions, InteractionManager} from 'react-native';
import JPushModule from 'jpush-react-native';
import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import { PullList } from 'react-native-pull';
import NoMessage from '../test/NoMessage';

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
import styles from './css/MessageCenterStyle'
import MessageCell from './view/MessageCenterCell'
import Platform from "react-native";

var stickyId = 3

const window = Dimensions.get('window');
const moreText = "加载完毕";
export const SCREEN_WIDTH = window.width;
export default class MessageCenterPage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2}),
            loaded:false,                   // 是否初始化 ListView
            // getRowData: getRowData,
            isReaded:false,
        }
        this.foot = 0;
             // 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
        this.messageArr = [];
        this.lastID = null;
        this.pageCount = 10;
        this._loadData = this._loadData.bind(this);
        this._loadMoreData = this._loadMoreData.bind(this);
        this.toSystemMessagePage = this.toSystemMessagePage.bind(this);
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


    _loadData(resolve) {

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
                    // console.log(this.lastID +'你大爷');
                }


                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.messageArr),
                    loaded:true,
                });

                if(responseData.length < this.pageCount){
                    //当当前返回的数据小于PageSize时，认为已加载完毕
                    this.setState({ foot:1,moreText:moreText});
                }else{//设置foot 隐藏Footer
                    this.setState({foot:0});
                }

                // 关闭刷新动画
                if (resolve !== undefined){
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }
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

        if (this.lastID === null){
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

                if(responseData.length < this.pageCount){
                    this.setState({foot:0});

                    //当当前返回的数据小于PageSize时，认为已加载完毕
                }else{//设置foot 隐藏Footer
                    this.setState({ foot:1});

                }

                if(responseData !== null && responseData.data !== null) {

                }
            },
            (e) => {
                console.log("获取失败" , e);
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    //已读信息
    _readed(msgid){
        apis.loadMessageReaded(msgid).then(

            (responseData) => {
                this.setState({
                    isReaded:true,
                });
                console.log("成功");
                if(responseData !== null && responseData.data !== null) {

                }
            },
            (e) => {
                console.log("获取失败" , e);
            },
        );
    }

    componentDidMount() {

        Toast.show('componentDidMount ' + Platform.OS + (Platform.OS === 'android'),
            {position: Toast.positions.TOP, duration: Toast.durations.LONG, backgroundColor: 'green'});

        try {// 只支持iOS
            JPushModule.setBadge(5, (success) => {
                console.log("Badge", success)
            });
        } catch (e) {
        }

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
            // Toast.show('JPush error: ' + e.message);
        }
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
    }

    componentWillMount() {
        this._loadData();

    }

    toMyOutSideWork(msgId) {
        this._readed(msgId);
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                // screen: 'VerifyCompanyName',
                screen: 'MyOutSideTaskPage',
                // screen:'GetLicensePage',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                passProps: {
                    taskId:msgId,
                }
            });
        });
    }


    toSystemMessagePage(contentJson) {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                // screen: 'VerifyCompanyName',
                screen: 'SystemMessagePage',
                // screen:'GetLicensePage',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                title: '系统通知',
                passProps: {
                    contentJson:contentJson,
                }
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
        let a = rowData.content;
        console.log('rowData===' + rowData.msgId);
        // this.setState({
        //     isReaded:rowData.read,
        // });

        return (
            <TouchableOpacity onPress={() => {
                 rowData.type === 'outservice'? this.toMyOutSideWork(rowData.msgId) : this.toSystemMessagePage(rowData.content);

                // rowData.type === 'outservice'? this.toSystemMessagePage(rowData.content) : this.toSystemMessagePage(rowData.content);

            }}>
                {/*<View style={styles.rowStyle}>*/}


                <MessageCell messageTitle={rowData.title}
                             messageSubTitle = {rowData.subTitle}
                             messageTime = {rowData.date}
                             messageIcon={rowData.type === 'outservice'?  this.state.isReaded === true?  require('../img/system_y.png') : require('../img/system.png') : rowData.read === 'true'? require('../img/task_y.png') :  require('../img/task.png')}
                />


            </TouchableOpacity>
        );
    }

    _endReached(){
        if(this.state.foot != 0 ){
            return ;
        }
        this.setState({
            foot:2,
        });
        this.timer = setTimeout(
            () => {
                this._loadMoreData();
            },50);
    }

    _renderFooter() {
        if(this.state.foot === 1){//加载完毕 没有下一页
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
        }else if(this.state.foot === 2) {//加载中

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

            // return (
            //     <View style={{height:40,backgroundColor:'blue',alignItems:'center',justifyContent:'center',}}>
            //         {this.state.moreText}
            //
            //         {/*<Image source={{uri:loadgif}} style={{width:20,height:20}}/>*/}
            //     </View>);
        }
    }

    // 根据网络状态决定是否渲染 ListView
    renderListView() {

        if (this.state.loaded === false) {      // 无数据
            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' }]}>
                    {/*<TouchableOpacity onPress={() => {this._loadData()}}>*/}
                        {/*<NoMessage*/}
                            {/*textContent='加载失败，点击重试'*/}
                            {/*active={require('../img/load_failed.png')}/>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            );
        }else if (this.messageArr.length == 0){

            return(
                <TouchableOpacity style={{flex : 1 , backgroundColor:'#FFFFFF'}} onPress={() => { this._loadData()}}>

                 <View style={{flex : 1 , backgroundColor:'#FFFFFF' }}>
                    <NoMessage
                    textContent='暂无消息'
                    active={require('../img/no_message.png')}/>
                  </View>
                </TouchableOpacity>

            );
        }else {         // 有数据
            return(
                <PullList ref="pullList"
                          onPullRelease={(resolve) => this._loadData(resolve)}     // 下拉刷新操作
                         // onEndReachedThreshold={30}                  // 当接近底部60时调用
                          dataSource={this.state.dataSource}          // 设置数据源
                          renderRow={(rowData) => this._renderRow(rowData)}  // 根据数据创建相应 cell
                          showsHorizontalScrollIndicator={false}      // 隐藏水平指示器
                          style={styles.listViewcontainer}                // 样式
                          initialListSize={7}                         // 优化:一次渲染几条数据
                         // onEndReached={this._loadMoreData}                // 当接近底部特定距离时调用
                          enableEmptySections={true}
                          renderFooter={this._renderFooter.bind(this)}
                          onEndReached={this._endReached.bind(this)}

                    // renderHeader={this._renderHeader}            // 设置头部视图
                    //renderHeader={this.renderHeader}            // 设置头部视图
                    // removeClippedSubviews={true}                // 优化
                    // renderFooter={this.renderFooter}            // 设置尾部视图
                     removeClippedSubviews={true}                // 优化

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




