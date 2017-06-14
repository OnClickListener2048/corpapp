/**
 * Created by jinglan on 2017/6/12.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView
} from 'react-native';

import styles from './style/SubViewStyle'
import CompanyInfoView from './view/CompanyInfoView'
import CommunalNavBar from '../main/GDCommunalNavBar';
import RegisterCompnayProcessview from './view/RegisterCompanyProcessView'
import RegisterCompanyCell from './view/RegisterCompanyCell'

//
// var dataArr = (function(){
//     var _arr = [];
//     for(var i = 0;i <= 10; i++){
//         _arr.push({
//             "processName" : '核实名称',
//             "Name" : "野原小白",
//             "processState" : "待处理"
//         })
//     }
//
//
//
//     return _arr;
// })()


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

    static renderTitleItem() {
        return(
            <Text style={styles.navbarTitleItemStyle}>自定义View</Text>
        );
    }
    renderExpenseItem(item , i) {
        return <RegisterCompanyCell key={i} detail={item}/>;
    }


    render() {
        return(
            <View style={styles.container}>
                <CommunalNavBar

                    titleItem = {() => SubViewTest.renderTitleItem()}
                />





                <CompanyInfoView companyName='CRM'
                ContactsName='野原新之助'
                ContactsPhone='13256738495'
                SalesName='销售员'
                SalesPhone='11193834747'
                />

                <ScrollView>
                    {


                        



                        details.map((item,i)=>this.renderExpenseItem(item,i))
                    }
                </ScrollView>





                {/*<Text*/}
                    {/*textAlign='left'*/}
                    {/*style={[{fontSize: 12,marginTop: 15, marginLeft : 0 , color : '#323232'}] }>{dataArr.length}</Text>*/}
                {/*/!*<Text*!/*/}
                    {/*/!*textAlign='left'*!/*/}
                    {/*/!*style={[{fontSize: 12,marginTop: 15, marginLeft : 0 , color : '#323232'}] }>{dataArr}</Text>*!/*/}


                {/*<RegisterCompnayProcessview registerCompanyProgressArr={dataArr}*/}
                {/*/>*/}

            </View>
        );
    }
}