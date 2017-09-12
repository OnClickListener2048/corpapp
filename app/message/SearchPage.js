/**
 * Created by jinglan on 2017/9/8.
 */
import React, { Component,PropTypes } from 'react';
import '../storage/SearchHistoryStore'
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    RefreshControl,
    TouchableWithoutFeedback,
    WebView
} from 'react-native';
import BComponent from '../base';
import styles from './css/SearchPageStyle'
import SearchTextInputView from './view/SearchView'
import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import NoMessage from '../commonView/NoMessage';
import Toast from 'react-native-root-toast';
import SearchIndexCell from './view/SearchIndexCell';
import SearchInfoCell from './view/SearchInfoCell';
import SubmitButton from "../view/ui/SubmitButton";
import ClearHistoryButton from "./view/ClearHistoryButton";
const dismissKeyboard = require('dismissKeyboard');     // 获取键盘回收方法

export default class SearchPage extends BComponent {
    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };


    constructor(props) {
        super(props);

        this.state = {
            loadedStatus : '',  // loadedSucess,loadedFaild,loadedIndex 索引列表 ,loadedSearch,loadedHistory
            count:'10',//索引返回数据条数
            taskId:'118',//主任务ID
            isNoNetwork : false,
            isJumping : false, //防止重复点击
            lastID:'',//分页所需最后一项ID
            dataIndexSource:  new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2}),
            dataHistorySource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2}),
            lastID : null,
            loadingMore : 0,     //footer状态即上拉刷新的状态
            isRefreshing: false,//为了防止上拉下拉冲突
            dataSearcgSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2}),
        };

        this.searchInfoArr = [];
        this.indexInfoArr = [];//推荐索引数据

        this._pressIndexData = this._pressIndexData.bind(this);
        this._loadIndexData = this._loadIndexData.bind(this);
        this._loadSearchData = this._loadSearchData.bind(this);
        this.toMyOutSideWork = this.toMyOutSideWork.bind(this);
        this._loadSearchFirstPageData = this._loadSearchFirstPageData.bind(this);
        this._loadMoreSearchInfoData = this._loadMoreSearchInfoData.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this._clearHistory = this._clearHistory.bind(this);



        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }


        componentDidMount() {
            //历史纪录显示
            this.setState({
                dataHistorySource: this.state.dataHistorySource.cloneWithRows(SearchHistoryStore.loadAll('AllData')),
                loadedStatus : 'loadedHistory',
            });
        }

        //搜索索引
        _loadIndexData(indexStr){

            apis.loadSearchIndex(indexStr,this.state.count).then(
                (responseData) => {


                    if(responseData!==null&& responseData.data !== null){

                        if (responseData.data.length > 0){
                            this.indexInfoArr = [];
                            this.indexInfoArr= this.indexInfoArr.concat(responseData.data);
                            this.setState({
                                dataIndexSource: this.state.dataIndexSource.cloneWithRows(this.indexInfoArr),
                                loadedStatus : 'loadedIndex',
                            });
                            if(responseData.data.length===0){
                                this.setState({
                                    loadedStatus : 'loadedSearch',
                                });
                            }
                            console.log("===>>>>"+this.indexInfoArr);
                        }



                    }

                },
                (e) => {

                    console.log("获取失败" , e);
                    Toast.show(errorText( e ));
                },
            );
        }

    //点击确定，具体任务列表
    _loadSearchData(searchStr){

        console.log('确定搜索内容之后的搜索'+searchStr);

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
        this.setState({
            lastID: null
        });

        apis.loadSearchData(searchStr,this.state.count,null).then(
            (responseData) => {
                SActivityIndicator.hide(loading);

                this.searchInfoArr = [];
                this.searchInfoArr = this.searchInfoArr.concat(responseData.data);
                if (responseData.data.length === this.state.count){
                    this.setState({loadingMore: 0,
                        lastID : this.searchInfoArr[this.searchInfoArr.length - 1].msgId
                    });

                }else {
                    this.setState({loadingMore: 2});

                }

                for (let  i = 0 ; i < this.searchInfoArr.length ; i++){
                    let  secData = this.searchInfoArr[i];
                    secData.rowIndex = i;

                }

                this.setState({
                    dataSearcgSource: this.state.dataSearcgSource.cloneWithRows(this.searchInfoArr),
                    loadedStatus : 'loadedSearch',

                });

            },
            (e) => {
                SActivityIndicator.hide(loading);


                    // 关闭刷新动画
                    this.setState({
                        loadedStatus : 'loadedFaild',
                    });

                console.log("获取失败" , e);
                Toast.show(errorText( e ));
            },
        )
    }

    _loadSearchFirstPageData() {

        if(!NetInfoSingleton.isConnected) {
            Toast.show('暂无网络' );
            this.setState({isRefreshing: false});
            return;
        }


        this.setState({isRefreshing: true,
            lastID : null,
        });

        apis.loadSearchData(searchStr,this.state.count,null).then(

            (responseData) => {
                this.setState({isRefreshing: false});

                let cnt = responseData.unReadNum;
                if(cnt !== null && cnt >= 0) {
                    this.props.navigator.setTabBadge({
                        badge: cnt === 0 ? null : cnt // 数字气泡提示, 设置为null会删除
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
                    this.searchInfoArr = [];
                    this.searchInfoArr = this.searchInfoArr.concat(responseData.data);

                    if (responseData.data.length === this.state.pageCount){
                        this.setState({loadingMore: 0,
                            lastID : this.searchInfoArr[this.searchInfoArr.length - 1].msgId
                        });

                    }else {
                        this.setState({loadingMore: 2});

                    }

                    for (let  i = 0 ; i < this.searchInfoArr.length ; i++){
                        let  secData = this.searchInfoArr[i];
                        secData.rowIndex = i;

                    }

                    this.setState({
                        dataSearcgSource: this.state.dataSearcgSource.cloneWithRows(this.searchInfoArr),
                        loadedStatus : 'loadedSucess',

                    });



                }
            },
            (e) => {
                // 关闭刷新动画
                this.setState({isRefreshing: false});
                Toast.show(errorText( e ));
            },
        );
    }


    _loadMoreSearchInfoData() {
        if(!NetInfoSingleton.isConnected) {
            Toast.show('暂无网络' );
            return;
        }

        if (this.state.lastID === null){
            return;
        }

        if (this.state.isLoading === true){
            return;
        }
        this.setState({

            loadingMore: 1,
            isLoading : true,
        });


        apis.loadSearchData(searchStr,this.state.count,this.state.lastID).then(

            (responseData) => {
                let cnt = responseData.unReadNum;
                if(cnt !== null && cnt >= 0) {
                    this.props.navigator.setTabBadge({
                        badge: cnt === 0 ? null : cnt // 数字气泡提示, 设置为null会删除
                    });

                    this.state.bagetNum = cnt;

                    try {// 只支持iOS
                        JPushModule.setBadge(cnt, (success) => {
                            console.log("Badge", success)
                        });
                    } catch (e) {
                    }
                }

                this.setState({
                    lastID : null
                });


                this.searchInfoArr = this.searchInfoArr.concat(responseData.data);

                if (responseData.data.length === this.state.pageCount){

                    this.setState({loadingMore: 0,
                        lastID : this.searchInfoArr[this.searchInfoArr.length - 1].msgId});

                }else {
                    this.setState({loadingMore: 2});

                }

                //console.log("最新数据" + responseData.data.length + '条' + 'lastId' + this.state.lastID + '结束');

                for (let  i = 0 ; i < this.searchInfoArr.length ; i++){
                    let  secData = this.searchInfoArr[i];
                    secData.rowIndex = i;
                }

                this.setState({
                    dataSearcgSource: this.state.dataSearcgSource.cloneWithRows(this.searchInfoArr),
                    isLoading : false,
                    loadedStatus : 'loadedSucess',
                });



            },
            (e) => {
                // 关闭刷新动画
                console.log("获取失败" , e);
                this.setState({
                    isLoading : false
                });
                // Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }


    _callBackWithSelectType(type,str){

        console.log('信息' + type +str)

        if (type === 'cancle'){

            this.props.navigator.pop()

        }else if (type === 'index'){

           this._loadIndexData(str);

        }else if (type === 'search'){
            var inputStrData = {
                "corpName":str,
                "stepId":"",
                "stepName":"",
                "taskId":"",
                "taskName":"",
                "taskStatus":"",
                "connector":"",
                "createDate":""};
            if(SearchHistoryStore.filtered('AllData', 'corpName="'+str+'"').length===0){
                //保存到历史数据
                SearchHistoryStore.singleCreate('AllData', inputStrData);
            }else{
                //删除一条数据
                SearchHistoryStore.removeSingleData('AllData', 'corpName="'+str+'"');
                //保存到历史数据
                SearchHistoryStore.singleCreate('AllData', inputStrData);
            }
            this._loadSearchData(str);

        }
    }


    toMyOutSideWork(rowData) {
        if (this.state.isJumping === true){
            return;
        }

        this.setState({isJumping:true});

        //防重复点击
        this.timer = setTimeout(async()=>{
            await this.setState({isJumping:false})//1.5秒后可点击
        },1000);


        let jumpUri = JSON.parse(rowData.content).jumpUri;

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



        this.props.navigator.push({
            screen: 'MyOutSideTaskPage',
            backButtonTitle: '返回', // 返回按钮的文字 (可选)
            backButtonHidden: false, // 是否隐藏返回按钮 (可选)

            passProps: {
                taskId:outPageId,
            }
        });



    }

    //清空历史纪录
    _clearHistory(){
        console.log("==清空历史纪录==");
        SearchHistoryStore.removeAllData('AllData');
        //历史纪录显示
        this.setState({
            dataHistorySource: this.state.dataHistorySource.cloneWithRows(SearchHistoryStore.loadAll('AllData')),
            loadedStatus : 'loadedHistory',
        });
    }

    //点击某个历史纪录项，进入查询详细列表页
    _pressHistoryData(rowData){
        this.setState({
            taskId:rowData.taskId,
        })
        this._loadSearchData(rowData.corpName);
        dismissKeyboard();
    }

    //点击某个推荐项，进入查询详细列表页
    _pressIndexData(rowData){
        console.log("查询数据"+rowData.taskId+SearchHistoryStore.filtered('AllData', 'taskId="'+rowData.taskId+'"'));
        if(SearchHistoryStore.filtered('AllData', 'taskId="'+rowData.taskId+'"').length===0){
            //保存到历史数据
            SearchHistoryStore.singleCreate('AllData', rowData);
        }else{
            //删除一条数据
            SearchHistoryStore.removeSingleData('AllData', 'taskId="'+rowData.taskId+'"');
            //保存到历史数据
            SearchHistoryStore.singleCreate('AllData', rowData);
        }
        this.setState({
            taskId:rowData.taskId,
        })
        this._loadSearchData(rowData.corpName);
        dismissKeyboard();
    }

    //清空历史纪录点击按钮
    renderHistoryFooter(){
        if(SearchHistoryStore.loadAll('AllData').length===0){
            return(<View style={{flex : 1 , backgroundColor:'#FAFAFA',marginTop:30 }}>
                <NoMessage
                    textContent='暂无历史搜索记录'
                    active={require('../img/record.png')}/>
            </View>)
            return;

        }
        return(
            <ClearHistoryButton
                text="清空历史搜索"
                onPress={() => {
                    this._clearHistory()}}/>
        )
    }

    //历史纪录头部信息
    renderHistoryHeader(){
        if(SearchHistoryStore.loadAll('AllData').length===0)
            return;
        return(
            <SearchIndexCell
                corpName={'历史搜索'}
                color="#c8c8c8"
            />
        )
    }

    renderFooter(){
        if (this.state.loadingMore === 1){
            return(
                <View style={{height:60,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <ActivityIndicator size={'small'}/>
                    <Text style={{marginLeft: 10}}>加载中...</Text>

                </View>
            );
            //加载中..
        }else if (this.state.loadingMore === 0){
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

    _renderIndexRow(rowData) {

        return (
            <TouchableOpacity onPress={() => {
                this._pressIndexData(rowData)
            }}>
            <SearchIndexCell
                taskId= {rowData.taskId}
                corpName={rowData.corpName}
            />
            </TouchableOpacity>
        );
    }

    _renderHistoryRow(rowData){
        return (
            <TouchableOpacity onPress={() => {
                this._pressHistoryData(rowData)
            }}>
                <SearchIndexCell
                    taskId= {rowData.taskId}
                    corpName={rowData.corpName}
                />
            </TouchableOpacity>
        );
    }

    _renderSearchRow(rowData) {

        return (
            <SearchInfoCell messageTitle={rowData.corpName}
                         messageSubTitle = {rowData.stepName}
                         messageTime = {rowData.createDate}
            />
        );
    }


    renderListView() {
        console.log(this.indexInfoArr.length+"==="+this.state.loadedStatus);
        if (this.state.isNoNetwork === true) {      // 无网络
            return(
                <TouchableOpacity style={{flex : 1 , backgroundColor:'#FFFFFF'}} onPress={() => { this._loadInitData()}}>

                    <View style={{flex : 1 , backgroundColor:'#FFFFFF' }}>

                        <NoMessage
                            textContent='网络错误,点击重新开始'
                            active={require('../img/network_error.png')}/>
                    </View>
                </TouchableOpacity>
            );
        }else if (this.state.loadedStatus === '') {      // 没什么错但是还没开始请求数据

            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' }]}>

                </View>
            );
        }else if (this.state.loadedStatus === 'loadedFaild') {      // 数据加载失败
            return(
                <TouchableOpacity style={{flex : 1 , backgroundColor:'#FFFFFF'}} onPress={() => { this._loadInitData()}}>

                    <View style={{flex : 1 , backgroundColor:'#FFFFFF' }}>
                        <NoMessage
                            textContent='加载失败，点击重试'
                            active={require('../img/load_failed.png')}/>
                    </View>
                </TouchableOpacity>
            );
        }else if (this.searchInfoArr.length === 0 && this.state.loadedStatus === 'loadedSearch'){

            return(
                //<TouchableOpacity style={{flex : 1 , backgroundColor:'#FFFFFF'}} onPress={() => { this._loadInitData()}}>

                    <View style={{flex : 1 , backgroundColor:'#FFFFFF' }}>
                        <NoMessage
                            textContent='暂无搜索结果'
                            active={require('../img/no_message.png')}/>
                    </View>
                //</TouchableOpacity>

            );
        }else if (this.indexInfoArr.length > 0 && this.state.loadedStatus === 'loadedIndex'){

            return(
                <ListView    style={[{flex : 1 ,backgroundColor:'#FAFAFA'}]}
                             dataSource={this.state.dataIndexSource}
                             enableEmptySections={true}
                             onEndReachedThreshold={10}
                             renderRow={this._renderIndexRow.bind(this)}
                />

            );
        }else if (this.state.loadedStatus === 'loadedHistory'){

            return(
                <ListView    style={[{flex : 1 ,backgroundColor:'#FAFAFA'}]}
                             dataSource={this.state.dataHistorySource}
                             renderFooter={this.renderHistoryFooter.bind(this)}
                             renderHeader={this.renderHistoryHeader.bind(this)}
                             enableEmptySections={true}
                             onEndReachedThreshold={10}
                             renderRow={this._renderHistoryRow.bind(this)}
                />

            );
        }else if (this.searchInfoArr.length > 0 && this.state.loadedStatus === 'loadedSearch'){
            // 有数据
            return(

                <ListView    style={[{flex : 1 }]}
                             dataSource={this.state.dataSearcgSource}
                             onEndReached={this._loadMoreData}
                             renderFooter={this.renderFooter}
                             enableEmptySections={true}
                             onEndReachedThreshold={10}
                             renderRow={this._renderSearchRow.bind(this)}
                             refreshControl = {

                                 <RefreshControl
                                     refreshing={this.state.isRefreshing}
                                     onRefresh={this._loadSearchFirstPageData}
                                     title={'加载中...'}
                                     titleColor={'#b1b1b1'}
                                     colors={['#ff0000','#00ff00','#0000ff','#3ad564']}
                                     progressBackgroundColor={'#fafafa'}
                                 />
                             }
                />

            );
        }
    }

    rendertopView() {
            return (
                <view style={styles.searchViewContainer}/>

            );
        }

    renderSearchView() {
        return (
            < SearchTextInputView style={styles.searchViewContainer} callback={this._callBackWithSelectType.bind(this)}/>

        );
    }

    render() {
        return (

            <View style={styles.container}>
                {/*{this.rendertopView()}*/}
                {this.renderSearchView()}

                {this.renderListView()}

            </View>


        );
    }
}