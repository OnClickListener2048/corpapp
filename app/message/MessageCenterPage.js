/**
 * Created by jinglan on 2017/6/9.
 */
import React, {Component} from 'react';
// import React, {} from 'index';

import {Dimensions, InteractionManager, DeviceEventEmitter} from 'react-native';
import JPushModule from 'jpush-react-native';
import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import NoMessage from '../test/NoMessage';
import {navToLogin, navToMainTab} from '../navigation';

import {
    SwRefreshScrollView, //支持下拉刷新的ScrollView
    SwRefreshListView, //支持下拉刷新和上拉加载的ListView
    RefreshStatus, //刷新状态 用于自定义下拉刷新视图时使用
    LoadMoreStatus //上拉加载状态 用于自定义上拉加载视图时使用
} from '../../node_modules/react-native-swRefresh-master'

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
            faild : false,
            bagetNum : 0,
        }
        this.messageArr = [];
        this.lastID = null;
        this.isLoading = false;
        this.isJumping = false;  //只要这个在进行就不可以跳转其他任何一页

        this.pageCount = 15;
        this._loadInitData = this._loadInitData.bind(this);

        this._loadData = this._loadData.bind(this);
        this._loadMoreData = this._loadMoreData.bind(this);
        this.toSystemMessagePage = this.toSystemMessagePage.bind(this);
        this.setisJumping = this.setisJumping.bind(this);

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
                let cnt = responseData.unReadNum;
                if(cnt !== null && cnt >= 0) {
                    this.props.navigator.setTabBadge({
                        badge: cnt == 0 ? null : cnt // 数字气泡提示, 设置为null会删除
                    });

                    this.state.bagetNum = cnt;

                    try {// 只支持iOS
                        JPushModule.setBadge(responseData.unReadNum, (success) => {
                            console.log("Badge", success)
                        });
                    } catch (e) {
                    }
                }

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

                }
            },
            (e) => {
                SActivityIndicator.hide(loading);

                if ( this.messageArr.length > 0){
                    // 关闭刷新动画
                    this.setState({
                        loaded:true,
                        faild: false,
                    });
                }else {
                    // 关闭刷新动画
                    this.setState({
                        loaded:true,
                        faild: true,
                    });

                }
                this.props.navigator.setTabBadge({
                    badge: null // 数字气泡提示, 设置为null会删除
                });

                console.log("获取失败" , e);
                // Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    _loadData(end) {

        this.lastID = null;


        apis.loadMessageData(this.pageCount,'').then(

        (responseData) => {
            let cnt = responseData.unReadNum;
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
            if(responseData !== null && responseData.data !== null) {
                this.messageArr = [];
                this.messageArr = this.messageArr.concat(responseData.data);
                // console.log(this.messageArr)

                if (responseData.data.length == this.pageCount){
                    this.lastID = this.messageArr[this.messageArr.length - 1].msgId;
                    this.refs.listView.resetStatus() //重置上拉加载的状态

                    // console.log(this.lastID +'你大爷');
                }else {

                    this.refs.listView.setNoMoreData() //设置为没有更多数据了的状态

                }

                for (let  i = 0 ; i < this.messageArr.length ; i++){
                    let  secData = this.messageArr[i];
                    secData.rowIndex = i;

                }


                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.messageArr),
                    loaded:true,
                });

                let timer =  setTimeout(()=>{
                    clearTimeout(timer)
                end()//刷新成功后需要调用end结束刷新 不管成功或者失败都应该结束
                },1500)

            }
            },
            (e) => {
                // 关闭刷新动画

                let timer =  setTimeout(()=>{
                    clearTimeout(timer)
                    end()//刷新成功后需要调用end结束刷新 不管成功或者失败都应该结束
                },1500)
                console.log("获取失败" , e);
                // Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    _loadMoreData(end) {

        if (this.lastID === null){
            return;
        }

        if (this.isLoading === true){
            return;
        }

        this.isLoading = true;

        apis.loadMessageData(this.pageCount,this.lastID).then(

            (responseData) => {
                let cnt = responseData.unReadNum;
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

                this.lastID = null


                this.messageArr = this.messageArr.concat(responseData.data);

                if (responseData.data.length == this.pageCount){
                    this.lastID = this.messageArr[this.messageArr.length - 1].msgId;
                    this.refs.listView.resetStatus() //重置上拉加载的状态

                    // console.log(this.lastID +'你大爷');
                }else {
                    this.refs.listView.setNoMoreData() //设置为没有更多数据了的状态

                }

                console.log("最新数据" + responseData.data.length + '条' + 'lastId' + this.lastID + '结束');

                for (let  i = 0 ; i < this.messageArr.length ; i++){
                    let  secData = this.messageArr[i];
                    secData.rowIndex = i;
                }

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.messageArr),
                    loaded:true,
                });

                this.isLoading = false;
                this.refs.listView.endLoadMore(responseData.data.length < this.pageCount)


            },
            (e) => {
                // 关闭刷新动画
                console.log("获取失败" , e);
                this.isLoading = false;
                let timer =  setTimeout(()=>{
                    clearTimeout(timer)
                    end()//刷新成功后需要调用end结束刷新 不管成功或者失败都应该结束
                },1500)
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

                try {// 只支持iOS
                    JPushModule.setBadge(this.state.bagetNum, (success) => {
                    });
                } catch (e) {
                }

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

    componentDidMount() {
        // Toast.show('componentDidMount ' + Platform.OS + (Platform.OS === 'android'),
        //     {position: Toast.positions.TOP, duration: Toast.durations.LONG, backgroundColor: 'green'});
        // 跳转登录页的通知
        this.subscription = DeviceEventEmitter.addListener('goLoginPage', (data)=>{
            navToLogin();
        });

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
        // console.log(this.props.navigator.subarray().length);
        if (this.isJumping === true){
            return;
        }

        this.isJumping = true;

        let jumpUri = JSON.parse(rowData.content).jumpUri;
        // console.log('jumpUrijumpUri ===' + jumpUri);

        // let jumpUri = 'outsource?id=36&sec=12';
        let arr=jumpUri.split('?');

        let outPageId = '';
        let paramsStr1 = '';
        let paramsArr1 = [];
        let subParam1 = '';
        let specArr1 = [];

        if (arr.length > 1){
            paramsStr1 = arr[1];
            paramsArr1=paramsStr1.split('&');

            let paramsStr = arr[1];
            let paramsArr=paramsStr.split('&');

            for (let i = 0 ; i < paramsArr.length ; i++) {
                subParam1 = paramsArr[i];

                let subParam = paramsArr[i];
                specArr1 = subParam.split('=');

                let specArr = subParam.split('=');
                if (specArr.length > 1) {

                    if (specArr[0] === 'id') {
                        outPageId = specArr[1];
                        break;
                    }
                }
            }
        }

        let a = 'arrCount' + arr.length + 'msgId' + rowData.msgId  + 'content信息' + rowData.content + 'outPageId' + outPageId  + 'paramsStr' + paramsStr1 + 'paramsArrLength'
            + paramsArr1.length + 'subParam' + subParam1 + 'specArr' + specArr1.length;


        // Toast.show(a);

            this.props.navigator.push({
                screen: 'MyOutSideTaskPage',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)

                passProps: {
                    taskId:outPageId,
                    toastStr : a,
                }
            });

        this.isJumping = false;


        if (rowData.read === 'false'){
            this._readed(msgId,rowData);
        }



    }


    toSystemMessagePage(contentJson,msgId,rowData) {
        if (this.isJumping === true){
            return;
        }
        this.isJumping = true;

        this.props.navigator.push({
                screen: 'SystemMessagePage',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                title: '系统通知',
                passProps: {
                    contentJson:contentJson,
                    callback : this.setisJumping
                }
            });

        if (rowData.read === 'false'){
            this._readed(msgId,rowData);
        }
    }

    setisJumping(){
        this.isJumping = false;
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

        this.timer = setTimeout(
            () => {
                this._loadMoreData();
            },1000);
    }

    _renderFooter() {
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

    }

    // 根据网络状态决定是否渲染 ListView
    renderListView() {

        if (this.state.loaded === false) {      // 无数据
            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' }]}>
                </View>
            );
        }else if (this.state.faild == true) {      // 数据加载失败
            return(
                    <TouchableOpacity style={{flex : 1 , backgroundColor:'#FFFFFF'}} onPress={() => { this._loadInitData()}}>

                         <View style={{flex : 1 , backgroundColor:'#FFFFFF' }}>
                         <NoMessage
                            textContent='加载失败，点击重试'
                          active={require('../img/load_failed.png')}/>
                     </View>
            </TouchableOpacity>
            );
        }else if (this.messageArr.length == 0){

            return(
                <TouchableOpacity style={{flex : 1 , backgroundColor:'#FFFFFF'}} onPress={() => { this._loadInitData()}}>

                 <View style={{flex : 1 , backgroundColor:'#FFFFFF' }}>
                    <NoMessage
                    textContent='暂无消息'
                    active={require('../img/no_message.png')}/>
                  </View>
                </TouchableOpacity>

            );
        }else {         // 有数据
            return(


                <SwRefreshListView
            dataSource={this.state.dataSource}
            ref="listView"
            renderRow={this._renderRow.bind(this)}
            onRefresh={this._loadData.bind(this)}//设置下拉刷新的方法 传递参数end函数 当刷新操作结束时
            onLoadMore={this._loadMoreData.bind(this)} //设置上拉加载执行的方法 传递参数end函数 当刷新操作结束时 end函数可接受一个bool值参数表示刷新结束后是否已经无更多数据了。
            //isShowLoadMore={false} //可以通过state控制是否显示上拉加载组件，可用于数据不足一屏或者要求数据全部加载完毕时不显示上拉加载控件
            // customRefreshView={(refresStatus,offsetY)=>{
            //     return (<Text>{'状态:'+refresStatus+','+offsetY}</Text>)
            // }} //自定义下拉刷新视图参数，refresStatus是上面引入的RefreshStatus类型，对应刷新状态各个状态。offsetY对应下拉的偏移量,可用于定制动画。自定义视图必须通过customRefreshViewHeight指定高度

            // renderFooter={()=>{return
            //     (<View style={{backgroundColor:'blue',height:30}}>
            //         <Text>我是footer</Text>
            //     </View>)
            // }}

            noMoreDataTitle = '  历史消息  '

            // customRefreshViewHeight={60} //自定义刷新视图时必须指定高度

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




