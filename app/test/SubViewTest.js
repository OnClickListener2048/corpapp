/**
 * Created by jinglan on 2017/6/12.
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

import styles from './style/SubViewStyle'
import CompanyInfoView from './view/CompanyInfoView'
import CommunalNavBar from '../main/GDCommunalNavBar';
import RegisterCompanyCell from './view/RegisterCompanyCell'

var details = [
    {processName:'长途',workManName:'小白',processState:'待处理'},
    {processName:'交通',workManName:'小黑',processState:'进行中'},
    {processName:'住宿',workManName:'小黑',processState:'待处理'},
    {processName:'餐饮',workManName:'小红5',processState:'待处理'},
    {processName:'补助',workManName:'226',processState:'待处理'},
    {processName:'办公',workManName:'2.11',processState:'待处理'},
    {processName:'福利',workManName:'20112',processState:'待处理'},
    {processName:'市场',workManName:'2013',processState:'待处理'},
    {processName:'研发',workManName:'2014',processState:'待处理'},
    {processName:'广告',workManName:'205',processState:'待处理'},
];

export default class SubViewTest extends Component{
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    constructor(props) {
        super(props);


        this.state = {
        };

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
                <RegisterCompanyCell key={i} detail={item} isFirst={i == 0} isLast={i == details.length - 1}/>
            </TouchableOpacity>
    )
    }

    renderTest() {

        return  <CompanyInfoView companyName='CRM'
                                 ContactsName='野原新之助'
                                 ContactsPhone='13256738495'
                                 SalesName='销售员'
                                 SalesPhone='13522805747'
        />
    }
    render() {
        return(
            <View style={styles.container}>


                <ScrollView style={styles.container}>

                     {this.renderTest()}

                    {<View style={[{height:15}]}></View>}

                    {details.map((item,i)=>this.renderExpenseItem(item,i))}

                </ScrollView>


            </View>
        );
    }
}