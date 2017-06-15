/**
 * Created by jinglan on 2017/6/14.
 */
import React, { Component,PropTypes } from 'react';

import {
    Text,
    View,
    ScrollView,
    Dimensions
} from 'react-native';

import styles from './css/VerifyCompanyStyle'
import CompanyInfoView from '../test/view/CompanyInfoView'
import CommunalNavBar from '../main/GDCommunalNavBar';
import VerifyProcessTipView from './view/VerifyProcessTipView'

var details = [
    {processName:'确认材料'},
    {processName:'开始任务'},
    {processName:'结束任务'},
];

export default class SubViewTest extends Component{
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    constructor(props) {
        super(props);


        this.state = {
            renderUnderline: true,
        };

    }


    // renderExpenseItem(item , i) {
    //     return <RegisterCompanyCell key={i} detail={item} isFirst={i == 0} isLast={i == details.length - 1}/>;
    // }

    renderTest() {

        return  <CompanyInfoView companyName='CRM'
                                 ContactsName='野原新之助'
                                 ContactsPhone='13256738495'
                                 SalesName='销售员'
                                 SalesPhone='13522805747'
        />
    }

    renderVerifyProcessTipView(){


    }

    render() {
        return(
            <View style={styles.container}>


                <ScrollView style={styles.container}>


                    {this.renderVerifyProcessTipView()}


                    {<View style={[{height:15}]}></View>}

                    {<View >
                        {this.renderTest()}

                    </View>}


                </ScrollView>


            </View>
        );
    }
}