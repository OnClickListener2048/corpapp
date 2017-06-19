/**
 * 领取执照
 * Created by jiaxueting on 2017/6/16.
 */

import React, { Component,PropTypes } from 'react';

import {
    Text,
    View,
    ScrollView,
    Dimensions
} from 'react-native';

import styles from '../VerifyCompanyInfo/css/VerifyCompanyStyle'
import CompanyInfoView from '../test/view/CompanyInfoView'
import VerifyProcessTipView from '../VerifyCompanyInfo/view/VerifyProcessTipView'
import CompanyAddress from "../test/view/CompanyAddress";
import TextInputView from "./view/TextInputView";
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

var details = [
    {processName:'确认材料'},
    {processName:'开始任务'},
    {processName:'结束任务'},
];

export default class GetLicensePage extends Component{
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

        return <VerifyProcessTipView messageTitle={'呵呵哒'} currentNum={0}/>
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

                    {/*{<View >*/}
                        {/*{this.customerMessage()}*/}

                    {/*</View>}*/}

                    <TextInputView
                        textName={'法       人：'}
                        inputWidth={{width:75}}
                        winWidth={{width:SCREEN_WIDTH-110}}
                    />
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'注  册  号：'}
                        inputWidth={{width:80}}
                        winWidth={{width:SCREEN_WIDTH-115}}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'国税登记号：'}
                        inputWidth={{width:93}}
                        winWidth={{width:SCREEN_WIDTH-130}}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'地税登记号：'}
                        inputWidth={{width:93}}
                        winWidth={{width:SCREEN_WIDTH-130}}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'注册资金：'}
                        inputWidth={{width:80}}
                        winWidth={{width:SCREEN_WIDTH-115}}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'经营范围：'}
                        inputWidth={{width:80}}
                        winWidth={{width:SCREEN_WIDTH-115}}
                    />
                    </View>
                </ScrollView>


            </View>
        );
    }
}