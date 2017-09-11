/**
 * Created by jinglan on 2017/9/8.
 */
import React, { Component,PropTypes } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    WebView
} from 'react-native';
import BComponent from '../base';
import styles from './css/SearchPageStyle'
import SearchTextInputView from './view/SearchTextInputView'
import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import NoMessage from '../commonView/NoMessage';
import Toast from 'react-native-root-toast';
import SearchIndexCell from "./view/SearchIndexCell";

export default class SearchPage extends BComponent {
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };


    constructor(props) {
        super(props);

        this.state = {
            loadedStatus : '',  // loadedSucess,loadedFaild,loadedIndex 索引列表 ,loadedSearch
            count:'10',//索引返回数据条数
            taskId:'118',//主任务ID
            isNoNetwork : false,
            isJumping : false, //防止重复点击
            lastID:'',//分页所需最后一项ID
            searchData: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2}),
        };

        this.searchInfoArr = [];
        this.indexInfoArr = [];//推荐索引数据

        this._loadIndexData = this._loadIndexData.bind(this);
        this._loadSearchData = this._loadSearchData.bind(this);
        this.toMyOutSideWork = this.toMyOutSideWork.bind(this);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }



    //搜索索引
    _loadIndexData(indexStr){
        if(!NetInfoSingleton.isConnected) {
            this.setState({
                isNoNetwork:true,
            });
            return;
        }
        this.setState({
            isNoNetwork:false,
        });

        apis.loadSearchIndex(indexStr,this.state.count).then(
            (responseData) => {
                if(responseData!==null&& responseData.data !== null){
                    this.indexInfoArr = [];
                    this.indexInfoArr= this.indexInfoArr.concat(responseData.data);
                    this.setState({
                        searchData: this.state.searchData.cloneWithRows(this.indexInfoArr),
                        loadedStatus : 'loadedIndex',
                    });
                    if(responseData.data.length===0){
                        this.setState({
                            loadedStatus : 'loadedSearch',
                        });
                    }
                }

            },
            (e) => {

                    this.setState({
                        loadedStatus : 'loadedFaild',
                    });

                console.log("获取失败" , e);
                Toast.show(errorText( e ));
            },
        );
    }

    //点击确定，具体任务列表
    _loadSearchData(searchStr){

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

        apis.loadSearchData(searchStr,this.state.taskId).then(
            (responseData) => {
                SActivityIndicator.hide(loading);

            },
            (e) => {
                SActivityIndicator.hide(loading);

                if ( this.messageArr.length > 0){
                    // 关闭刷新动画
                    this.setState({
                        loadedStatus : 'loadedSucess',

                    });
                }else {
                    // 关闭刷新动画
                    this.setState({
                        loadedStatus : 'loadedFaild',
                    });

                }
                console.log("获取失败" , e);
                Toast.show(errorText( e ));
            },
        )
    }



    _callBackWithSelectType(type,str){

        console.log('信息' + type +str)
        //type : 'index'; 'search'

        if (type === 'index'){
            this._loadIndexData(str);
        }else if (type === 'search'){

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


    //点击某个推荐项，进入查询详细列表页
    _pressIndexData(str,taskId){
        this.setState({
            taskId:taskId,
        })
        this._loadSearchData(str);
    }

    _renderHeader(rowData){
        return(
            <SearchTextInputView style={[{height:60  }]} callback={this._callBackWithSelectType.bind(this)}/>


        );
    };


    _renderIndexRow(rowData) {

        return (
            <TouchableOpacity onPress={() => {
                this._pressIndexData(rowData.corpName,rowData.taskId)
            }}>
            <SearchIndexCell
                taskId= {rowData.taskId}
                corpName={rowData.corpName}
                corpStr={'北京'}
            />
            </TouchableOpacity>
        );
    }

    _renderSearchRow(rowData) {

        return (
            <TouchableOpacity onPress={() => {
               this.toMyOutSideWork(rowData)}}>
            <View style={styles.searchRowStyle}></View>
            </TouchableOpacity>

        );
    }


    renderListView() {
        console.log(this.indexInfoArr.length+"==="+this.state.loadedStatus);
        if (this.state.isNoNetwork === true) {      // 无网络
            return(
                <TouchableOpacity style={{flex : 1 , backgroundColor:'#FFFFFF'}} onPress={() => { this._loadInitData()}}>

                    <View style={{flex : 1 , backgroundColor:'#FFFFFF' }}>
                        <SearchTextInputView style={[{height:60  }]} callback={this._callBackWithSelectType.bind(this)}/>

                        <NoMessage
                            textContent='网络错误,点击重新开始'
                            active={require('../img/network_error.png')}/>
                    </View>
                </TouchableOpacity>
            );
        }else if (this.state.loadedStatus === '') {      // 没什么错但是还没开始请求数据

            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' }]}>
                    <SearchTextInputView style={[{height:60  }]} callback={this._callBackWithSelectType.bind(this)}/>

                </View>
            );
        }else if (this.state.loadedStatus === 'loadedFaild') {      // 数据加载失败
            return(
                <TouchableOpacity style={{flex : 1 , backgroundColor:'#FFFFFF'}} onPress={() => { this._loadInitData()}}>
                    <SearchTextInputView style={[{height:60  }]} callback={this._callBackWithSelectType.bind(this)}/>

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
                <ListView    style={[{flex : 1 }]}
                             dataSource={this.state.searchData}
                             enableEmptySections={true}
                             onEndReachedThreshold={10}
                             renderRow={this._renderIndexRow.bind(this)}
                             renderHeader={this._renderHeader.bind(this)}
                />

            );
        }
        else {         // 有数据
            return(

                <ListView    style={[{flex : 1 }]}
                             dataSource={this.state.dataSource}
                             onEndReached={this._loadMoreData}
                             renderFooter={this.renderFooter}
                             enableEmptySections={true}
                             onEndReachedThreshold={10}
                             renderRow={this._renderSearchRow.bind(this)}
                             renderHeader={this._renderHeader.bind(this)}
                             refreshControl = {
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._loadData}
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

    render() {
        return (
            <View style={styles.container}>
                {this.renderListView()}

            </View>
        );
    }
}