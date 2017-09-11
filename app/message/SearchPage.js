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

export default class SearchPage extends BComponent {
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };


    constructor(props) {
        super(props);

        this.state = {
            loadedStatus : '',  // loadedSucess,loadedFaild,loadedIndex 索引列表 ,loadedSearch

        };

        this.searchInfoArr = [];
        this.indexInfoArr = [];

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    _loadIndexData(){

    }


    _loadSearchData(){


    }



    _renderHeader(rowData){
        return(
            <TouchableOpacity style={{width : SCREEN_WIDTH , height : 60 , backgroundColor:'orange' }} onPress={() => {this.toSearchPage()}}>

                <View style={{width : SCREEN_WIDTH , height : 60 }}>

                </View>
            </TouchableOpacity>

        );
    };


    _renderIndexRow(rowData) {

        return (
            <view style={styles.rowStyle}></view>
        );
    }

    _renderSearchRow(rowData) {

        return (
            <view style={styles.searchRowStyle}></view>
        );
    }


    renderListView() {

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
                <ListView    style={[{flex : 1 }]}
                             dataSource={this.state.dataSource}
                             onEndReached={this._loadMoreData}
                             renderFooter={this.renderFooter}
                             enableEmptySections={true}
                             onEndReachedThreshold={10}
                             renderRow={this._renderIndexRow.bind(this)}
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
        }else {         // 有数据
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
                <SearchTextInputView  callback={this._loadIndexData.bind(this)}/>
                {this.renderListView()}

            </View>
        );
    }
}