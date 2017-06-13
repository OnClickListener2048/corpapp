/**
 * Created by jinglan on 2017/6/12.
 */
import React, { Component } from 'react';
import {Text} from "react-native";

import {
    View
} from 'react-native';

import styles from './style/SubViewStyle'
import CompanyInfoView from './view/CompanyInfoView'
import CommunalNavBar from '../main/GDCommunalNavBar';


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

            </View>
        );
    }
}