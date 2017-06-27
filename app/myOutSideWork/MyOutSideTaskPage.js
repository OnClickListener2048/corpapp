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
    InteractionManager
} from 'react-native';

import styles from './css/MyOutSideTaskStyle'
import CompanyInfoView from '../test/view/CompanyInfoView'
import CommunalNavBar from '../main/GDCommunalNavBar';
import RegisterCompanyCell from '../test/view/RegisterCompanyCell'
import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';

export default class MyOutSideTaskPage extends Component{
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded:false,                   // 是否初始化 ListView

        };
        this._loadData = this._loadData.bind(this);
        this.stepsArr = [];
        this.info;

    }

    _loadData() {
        let loading = SActivityIndicator.show(true, "加载中...");
        console.log("开始请求1");

        apis.loadOutSourceTask('1').then(

            (responseData) => {
                  SActivityIndicator.hide(loading);

                if(responseData !== null && responseData.data !== null) {
                    this.stepsArr = [];
                    console.log("开始请求2");
                    this.info = responseData.data;
                    console.log(this.info);

                    this.stepsArr = this.stepsArr.concat(responseData.data.steps);
                    this.setState({
                        loaded:true,
                    });
                    this.props.navigator.setTitle({
                        title: this.info.taskName // the new title of the screen as appears in the nav bar
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

    componentWillMount() {
        this._loadData();

    }

    //跳转客户审核具体信息
    toLicense(){
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                screen: 'GetLicensePage',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)
            });
        });
    }

    renderExpenseItem(item , i) {
        return (
            <TouchableOpacity onPress={() => {
                this.toLicense()
            }}>
                <RegisterCompanyCell key={i} detail={item} isFirst={i == 0} isLast={i == this.stepsArr.length - 1}/>
            </TouchableOpacity>
        )
    }

    renderTest() {

        return  <CompanyInfoView companyName= {this.info.corpName}
                                 ContactsName={this.info.contactName}
                                 ContactsPhone={this.info.contactPhone}
                                 SalesName={this.info.salesmanName}
                                 SalesPhone={this.info.salesmanPhone}
        />
    }

    renderScrollView() {
        if (this.state.loaded === false) {      // 无数据
            return(
                <View style={[{flex : 1 , backgroundColor:'#FFFFFF' }]}>

                </View>
            );
        }else{

            return(
                <ScrollView style={styles.container}>

                    {this.renderTest()}

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