/**
 * Created by jinglan on 2017/6/22.
 */
import React, { Component,PropTypes } from 'react';

import {
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    DeviceEventEmitter
} from 'react-native';

import styles from './css/MyOutSideTaskStyle'
import CompanyInfoView from '../test/view/CompanyInfoView'
import CommunalNavBar from '../main/GDCommunalNavBar';
import RegisterCompanyCell from '../test/view/RegisterCompanyCell'
import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import NoMessage from "../test/NoMessage";
import Toast from 'react-native-root-toast';

export default class MyOutSideTaskPage extends Component{
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded:false,                   // 是否初始化 ListView
            taskId:this.props.taskId,
            faild:false,                   // 是否初始化 ListView
            currentStepId : '',
            toastStr : this.props.toastStr,
            canClickBtn : false,
        };
        this._loadData = this._loadData.bind(this);
        this.stepsArr = [];
        this.info;
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    // console.log('ApplicationCenterPage event.type', event.type);
    if(event.id==='willAppear'){
        this.state.canClickBtn = true;
    }
}


_loadData(needLoding) {

        let loading;

        if (!needLoding){

            let callback = this.props.callback;
            if(callback) {
                callback(false);
            }
        }

        if (needLoding){
            loading  = SActivityIndicator.show(true, "加载中...");
        }


        apis.loadOutSourceTask(this.props.taskId).then(

            (responseData) => {
                if (needLoding){
                    SActivityIndicator.hide(loading);
                }

                if(responseData !== null && responseData.data !== null) {
                    this.stepsArr = [];
                    this.info = responseData.data;

                    this.stepsArr = this.stepsArr.concat(responseData.data.steps);
                    this.setState({
                        loaded:true,
                    });
                    this.props.navigator.setTitle({
                        title: this.info.taskName // the new title of the screen as appears in the nav bar
                    });
                    if(this.refs.companyInfoView) {
                        this.refs.companyInfoView.setCompanyInfo(this.info.corpName,this.info.contactName,this.info.contactPhone,
                            this.info.salesmanName,this.info.salesmanPhone,false);
                    }
                    // this.info.salesmanPhone
                    }
            },
            (e) => {
                if (needLoding){
                    SActivityIndicator.hide(loading);
                }
                this.setState({
                    faild:true,
                });
                console.log("获取失败" , e);
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );



    }

    componentWillMount() {
        this._loadData(true);

    }




//
//


//跳转客户审核具体信息
    toLicense(stepId){
        if (this.state.canClickBtn === false){
            return;
        }

        this.state.canClickBtn = false;

        this.state.currentStepId = stepId;
            this.props.navigator.push({
                screen: 'GetLicensePage',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                passProps: {
                    stepId:stepId,
                    taskId:this.props.taskId,
                    callback : this._loadData
                }
            });
    }

    renderExpenseItem(item , i) {

        return (
            <TouchableOpacity onPress={() => {
                this.toLicense(this.stepsArr[i].stepId)}}>
                <RegisterCompanyCell key={i} detail={item} processState={this.stepsArr[i].stepStatus} isFirst={i == 0} isLast={i == this.stepsArr.length - 1}/>
            </TouchableOpacity>
        )
    }

    renderCompanyInfoView() {

        return  <CompanyInfoView ref="companyInfoView"
                                 companyName= {this.info.corpName}
                                 ContactsName={this.info.contactName}
                                 ContactsPhone={this.info.contactPhone}
                                 SalesName={this.info.salesmanName}
                                 SalesPhone={this.info.salesmanPhone}
                />
    }

    renderScrollView() {
        console.log( '点击renderScrollView');

        if (this.state.loaded === false) {      // 无数据
            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' }]}>

                </View>
            );
        }else if(this.state.faild === true){
            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' }]}>
                    <TouchableOpacity onPress={() => { this._loadData() }}>
                    <NoMessage
                    textContent='加载失败，点击重试'
                    active={require('../img/load_failed.png')}/>
                    </TouchableOpacity>
                </View>
            );
        }else{
            console.log( '点击else');

            return(

                <ScrollView style={styles.container}>

                    {this.renderCompanyInfoView()}

                    {<View style={[{height:15}]}></View>}

                    {this.stepsArr.map((item,i)=>this.renderExpenseItem(item,i))}

                </ScrollView>
            );
        }
    }



    render() {
        return(
            <View style={styles.container}>
                {this.renderScrollView()}
            </View>
        );
    }


}