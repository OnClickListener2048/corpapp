/**
 * Created by jinglan on 2017/6/9.
 */
import React, {Component} from 'react';
// import React, {} from 'index';

import {Dimensions, InteractionManager, DeviceEventEmitter} from 'react-native';
import JPushModule from 'jpush-react-native';
import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import { PullList } from 'react-native-pull';
import NoMessage from '../test/NoMessage';
import {navToLogin, navToMainTab} from '../navigation';

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
            bagetNum : 0,
        }
        this.foot = 0;
             // 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
        this.messageArr = [];
        this.lastID = null;
        this.pageCount = 15;
        this._loadInitData = this._loadInitData.bind(this);

        this._loadData = this._loadData.bind(this);
        this._loadMoreData = this._loadMoreData.bind(this);
        this.toSystemMessagePage = this.toSystemMessagePage.bind(this);
        this._loadAllUnRead = this._loadAllUnRead.bind(this);
    }

    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
    };

    dataBlob: {}
    sectionIDs: []
    rowIDs: []


    _loadInitData(resolve) {

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
                    for (let  i = 0 ; i < this.messageArr.length ; i++){
                        let  secData = this.messageArr[i];
                        secData.rowIndex = i;

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
                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                // 关闭刷新动画
                console.log("获取失败" , e);
                // Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    _loadData(resolve) {

        this.lastID = null;

        apis.loadMessageData(this.pageCount,'').then(

        (responseData) => {
            {this._loadAllUnRead()}
            if(responseData !== null && responseData.data !== null) {
                this.messageArr = [];
                this.messageArr = this.messageArr.concat(responseData.data);
                // console.log(this.messageArr)

                if (this.messageArr.length == this.pageCount){
                    this.lastID = this.messageArr[this.pageCount - 1].msgId;
                    // console.log(this.lastID +'你大爷');
                }
                for (let  i = 0 ; i < this.messageArr.length ; i++){
                    let  secData = this.messageArr[i];
                    secData.rowIndex = i;

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
                // 关闭刷新动画
                if (resolve !== undefined){
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }
                console.log("获取失败" , e);
                // Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    _loadMoreData() {

        if (this.lastID === null){
            return;
        }

        apis.loadMessageData(this.pageCount,this.lastID).then(

            (responseData) => {

                console.log("最新数据" + responseData.data.length + '条' + 'lastId' + this.lastID + '结束');


                this.messageArr = this.messageArr.concat(responseData.data);

                if (responseData.data.length == this.pageCount){
                    this.lastID = responseData.data[this.pageCount - 1].msgId;

                }else {
                    this.lastID = null;
                }


                for (let  i = 0 ; i < this.messageArr.length ; i++){
                    let  secData = this.messageArr[i];
                    secData.rowIndex = i;
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

                // if(responseData !== null && responseData.data !== null) {
                //
                // }
            },
            (e) => {
                // 关闭刷新动画
                console.log("获取失败" , e);
                // Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    //已读信息
    _readed(msgid,rowData,index){


        apis.loadMessageReaded(msgid).then(

            (responseData) => {

                rowData.read = 'true';

                let  a =  this.messageArr[rowData.rowIndex];
                // console.log("点击成功了" + a.read);
                let data = [];
                this.messageArr.forEach(row => {
                    data.push(Object.assign({}, row));
                } );

                if (this.state.bagetNum > 0) {
                    this.state.bagetNum--;
                }

                this.props.navigator.setTabBadge({
                    badge: this.state.bagetNum <= 0 ? null : this.state.bagetNum // 数字气泡提示, 设置为null会删除
                });

                this.messageArr = data;

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.messageArr),
                    loaded:true,
                });


            },
            (e) => {
                console.log("点击失败");

                console.log("获取失败" , e);
            },
        );
    }

    _loadAllUnRead() {
        apis.loadMessageTotalReaded().then(
            (responseData) => {

                if(responseData !== null && responseData.data !== null) {
                    let cnt = responseData.data.count;
                    if(cnt !== null && cnt >= 0) {
                        this.props.navigator.setTabBadge({
                            badge: cnt == 0 ? null : cnt // 数字气泡提示, 设置为null会删除
                        });

                        this.state.bagetNum = cnt;

                        try {// 只支持iOS
                            JPushModule.setBadge(cnt, (success) => {
                                console.log("Badge", success)
                            });
                        } catch (e) {
                        }
                    }
                }
            },
            (e) => {
                console.log("所有未读获取失败" , e);
                this.props.navigator.setTabBadge({
                    badge: null // 数字气泡提示, 设置为null会删除
                });
            },
        );
    }

    componentDidMount() {
        // Toast.show('componentDidMount ' + Platform.OS + (Platform.OS === 'android'),
        //     {position: Toast.positions.TOP, duration: Toast.durations.LONG, backgroundColor: 'green'});
        // 跳转登录页的通知
        this.subscription = DeviceEventEmitter.addListener('goLoginPage', (data)=>{
            navToLogin();
        });

        this._loadAllUnRead();

        try {
            JPushModule.getRegistrationID((registrationId) => {
                console.log("Device register succeed, registrationId " + registrationId);
                apis.bindJPush(registrationId).then(
                    (responseData) => {console.log("jpush 绑定成功")},
                    (e) => {console.log("jpush 绑定失败")}
                );
                UserInfoStore.setJPushID(registrationId).then(
                    v => {},
                    e => console.log(e.message)
                );
            });

            if (Platform.OS !== 'ios') {
                JPushModule.initPush();
                JPushModule.notifyJSDidLoad();

                JPushModule.addReceiveOpenNotificationListener((message) => {
                    //this.setState({pushMsg: message});
                    console.log("点击通知消息: " + JSON.stringify(message));
                    // Toast.show('点击通知消息: ' + JSON.stringify(message));
                });
                // JPushModule.addReceiveNotificationListener((message) => {
                //     console.log("receive notification: " + JSON.stringify(message));
                //     Toast.show('receive notification: ' + JSON.stringify(message));
                // })
            }
        } catch (e) {
            console.log('JPush error: ' + e.message);
        }

        // NativeAppEventEmitter.addListener('networkDidSetup', (token) => {
        //     this.setState({ connectStatus: '已连接' });
        // });
        // NativeAppEventEmitter.addListener('networkDidClose', (token) => {
        //     this.setState({ connectStatus: '连接已断开' });
        // });
        // NativeAppEventEmitter.addListener('networkDidRegister', (token) => {
        //     this.setState({ connectStatus: '已注册' });
        // });
        // NativeAppEventEmitter.addListener('networkDidLogin', (token) => {
        //     this.setState({ connectStatus: '已登陆' });
        // });
        //
        //
        // var subscription = NativeAppEventEmitter.addListener(
        //     'ReceiveNotification',
        //     (notification) => console.log(notification)
        // );
    }

    componentWillUnmount() {
        try {
            JPushModule.removeReceiveCustomMsgListener();
            JPushModule.removeReceiveNotificationListener();
        } catch (e) {
        }
        // 销毁
        this.subscription.remove();
    }

    componentWillMount() {
        this._loadInitData();

    }

    toMyOutSideWork(msgId,rowData) {
        if (rowData.read === 'false'){
            this._readed(msgId,rowData);
        }

        let jumpUri = JSON.parse(rowData.content).jumpUri;
        // console.log('jumpUrijumpUri ===' + jumpUri);

        // let jumpUri = 'outsource?id=36&sec=12';
        let arr=jumpUri.split('?');

        let outPageId = '';

        if (arr.length > 1){
            let paramsStr = arr[1];
            let paramsArr=paramsStr.split('&');

            for (let i = 0 ; i < paramsArr.length ; i++) {
                let subParam = paramsArr[i];

                let specArr = subParam.split('=');
                if (specArr.length > 1)

                    if (specArr[0] === 'id') {
                        outPageId = specArr[1];
                    }
            }
        }

        console.log('jumpUriId ===' + outPageId);

        // let  a = jumpUri

        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                screen: 'MyOutSideTaskPage',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)

                passProps: {
                    taskId:outPageId,
                }
            });
        });
    }


    toSystemMessagePage(contentJson,msgId,rowData) {
        if (rowData.read === 'false'){
            this._readed(msgId,rowData);
        }
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                screen: 'SystemMessagePage',
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
         // console.log('row===' + rowData.rowIndex); //手动添加的数据 不要误会真的有这个属性哦!
        // console.log("点击renderRow" + rowData);
        return (
            <TouchableOpacity onPress={() => {
                 rowData.type === 'outservice'? this.toMyOutSideWork(rowData.msgId,rowData) : this.toSystemMessagePage(rowData.content,rowData.msgId,rowData); }}>

                <MessageCell messageTitle={rowData.title}
                             messageSubTitle = {rowData.subTitle}
                             messageTime = {rowData.date}
                             messageIcon={rowData.type === 'outservice'?  rowData.read === 'true'? require('../img/task_y.png') :  require('../img/task.png') : rowData.read === 'true'? require('../img/system_y.png') : require('../img/system.png')}
                />

            </TouchableOpacity>
        );
    }

    _endReached(){
        // if(this.state.foot != 0 ){
        //     return ;
        // }
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




