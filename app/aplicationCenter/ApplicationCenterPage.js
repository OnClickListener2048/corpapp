/**
 * Created by jinglan on 2017/6/7.
 */
import React, {Component} from 'react';
import {Dimensions, TouchableOpacity
,InteractionManager,Platform} from 'react-native';

import {loadOutSourceCount} from "../apis/outSource";
import {
    Text,
    Image,
    View,
} from 'react-native';
import CommunalNavBar from '../main/GDCommunalNavBar';

import TopcenterImgBottomTitleView from '../view/TopcenterImgBottomTitleView';
import styles from './css/ApplictionCenterPageStyle'
const window = Dimensions.get('window');
import Swiper from 'react-native-swiper'
import MyOutSideWorkPage from "../myOutSideWork/MyOutSideWorkPage";
import Toast from 'react-native-root-toast';
import ScrollViewTop from "./scrollViewTop";

export const SCREEN_WIDTH = window.width;
export default class ApplicationCenterPage extends Component{
    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
    };
    constructor(props) {
        super(props);

        this.state = {
            bdNum:null,
        };

        this._loadCount = this._loadCount.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        // console.log('ApplicationCenterPage event.type', event.type);
        console.log('ApplicationCenterPage event', JSON.stringify(event));
        if(event.id==='willAppear'){
            this._loadCount();
        }
    }
    static renderTitleItem() {
        return(
            <Text style={styles.navbarTitleItemStyle}>应用中心</Text>
        );
    }

    toMyOutSideWork(){
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                screen: 'MyOutSideWorkPage',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                title:'我的外勤',

            });
        });
    }

    renderImg(){
        var imageViews=[];
        for(var i=0;i<3;i++) {
            if (i === 0) {
            var image = require('../img/banner.png');
            }else if(i===1){
                var image = require('../img/banner1.png');
            }else if(i===2){
                var image = require('../img/banner2.png');
            }
            imageViews.push(
                <Image
                    key={i}
                    style={{flex:1}}
                    source={image}
                />
            );
        }
        return imageViews;
    }

    componentWillMount() {
        this._loadCount(true);

    }

    //获取每个外勤状态数量
    _loadCount(){

        // let loading  = SActivityIndicator.show(true, "加载中...");
        loadOutSourceCount().then(

            (responseData) => {
                // SActivityIndicator.hide(loading);
                if(responseData !== null && responseData.data !== null) {
                    this.outSourceCountObj = {};
                    console.log("开始请求2是"+responseData.data.todoNum+"，"+responseData.data.totalNum+"，"+responseData.data.inProgressNum);

                    this.setState({
                        bdNum:responseData.data.todoNum+responseData.data.inProgressNum,
                    });

                    if(this.refs.myoutItem) {
                        this.refs.myoutItem._setBageNum(this.state.bdNum);
                    }

                }
            },
            (e) => {
                    // SActivityIndicator.hide(loading);
                          console.log("获取失败" , e);
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );

    }



    render() {
        console.log("应用中心render="+this.state.bdNum);
        return(
        <View style={styles.container}>

            <CommunalNavBar

                titleItem = {() => ApplicationCenterPage.renderTitleItem()}
            />
            {Platform.OS === 'ios' ?
            <Swiper height={200}
            >
                {this.renderImg()}
            </Swiper>:
                <ScrollViewTop/>
            }

            <View style={styles.applicationViewContainer}>

                <TouchableOpacity
                    onPress={() => {this.toMyOutSideWork()}}
                    style={{ marginLeft: 15,marginTop: 15, height: 100, width: (SCREEN_WIDTH - 45)/2,}}

                >
                    <TopcenterImgBottomTitleView ref="myoutItem"
                                                 applicationTitle='我的外勤'
                                                 applicationImg = {require('../img/field.png')}
                                                 style={{height: 100, width: (SCREEN_WIDTH - 45)/2,}}
                                                 textStyle={{color: '#ef0c35',  alignSelf: 'flex-end'}}
                                                 badge={this.state.bdNum}
                    />
                </TouchableOpacity>
                <TopcenterImgBottomTitleView applicationTitle='CRM'
                                             applicationImg = {require('../img/crm_h.png')}
                                             style={{ marginLeft: 15, marginTop: 15,height: 100, width: (SCREEN_WIDTH - 45)/2, alignSelf: 'flex-start',}}
                                             textStyle={{color: '#ef0c35',  alignSelf: 'flex-end'}}
                                             badge={0}
                />
                <TopcenterImgBottomTitleView applicationTitle='工作统计'
                                             applicationImg = {require('../img/statistical_h.png')}
                                             style={{ marginLeft: 15, marginTop: 15,height: 100, width: (SCREEN_WIDTH - 45)/2, alignSelf: 'flex-start',}}
                                             textStyle={{color: '#ef0c35',  alignSelf: 'flex-end'}}
                                             badge={0}
                />
                <TopcenterImgBottomTitleView applicationTitle='工作日志'
                                             applicationImg = {require('../img/log_h.png')}
                                             style={{ marginLeft: 15, marginTop: 15,height: 100, width: (SCREEN_WIDTH - 45)/2, alignSelf: 'flex-start',}}
                                             textStyle={{color: '#ef0c35',  alignSelf: 'center'}}
                                             badge={0}
                />
            </View>

        </View>
        );
    }
}