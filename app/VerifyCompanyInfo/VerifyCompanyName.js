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
import DottedLine from './view/DottedLine'

import CompanyAddress from "../test/view/CompanyAddress";
import ProcessBtnView from "./view/ProcessBtnView";
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

export default class VerifyCompanyName extends Component{
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


    renderWorkerInfo() {

        return  <CompanyInfoView companyName='CRM'
                                 ContactsName='野原新之助'
                                 ContactsPhone='13256738495'
                                 SalesName='销售员'
                                 SalesPhone='13522805747'
        />
    }

    //公司地址
    compAddress() {

        return  <CompanyAddress companyAddress='北京市 朝阳区 小营路25号 房地置业大厦 1105室'
        />
    }

    renderVerifyProcessTipView(){

        return <VerifyProcessTipView currentNum={0}/>
    }

    renderProcessBtnView(){

        return <ProcessBtnView/>
    }



    renderLineView(){

        return      <View style={[{width : SCREEN_WIDTH - 30,marginLeft:15, height : 1}]}>
            <DottedLine style={{height : 1, flex: 1,marginLeft:15,alignItems:'center',justifyContent:'center', backgroundColor :'#c8c8c8'}}
                        dottedLineWidth={SCREEN_WIDTH - 30} grayWidth={2} whiteWidth={2}/>
        </View>
    }

    renderCompanyTipView(){

        return  <View style={[{width : SCREEN_WIDTH,backgroundColor:'#FFFFFF'}]}>
            <Text style={{fontSize:18,marginLeft:15,marginTop:20,marginBottom:20, textAlign:'left', justifyContent: 'center',color:'#323232'}}>{'客户基本信息'}</Text>
                 </View>
    }

    render() {
        return(
            <View style={styles.container}>


                <ScrollView style={styles.container}>


                    {this.renderVerifyProcessTipView()}
                    {this.renderProcessBtnView()}


                    {<View style={[{height:15}]}></View>}
                    {this.renderCompanyTipView()}

                    {this.renderLineView()}

                    {this.renderWorkerInfo()}
                    {this.compAddress()}

                </ScrollView>


            </View>
        );
    }
}