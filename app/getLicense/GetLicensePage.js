/**
 * 领取执照
 * Created by jiaxueting on 2017/6/16.
 */

import React, { Component,PropTypes } from 'react';

import {
    Text,
    View,
    ScrollView,InteractionManager,
    Dimensions, Image, TouchableOpacity,NativeModules
} from 'react-native';

import styles from '../VerifyCompanyInfo/css/VerifyCompanyStyle'
import CompanyInfoView from '../test/view/CompanyInfoView'
import VerifyProcessTipView from '../VerifyCompanyInfo/view/VerifyProcessTipView'
import CompanyAddress from "../test/view/CompanyAddress";
import TextInputView from "./view/TextInputView";
import AlertModal from "../view/AlertPhotoModal";
import ProcessBtnView from "../VerifyCompanyInfo/view/ProcessBtnView";
import BusinessTimeView from "./view/BusinessTimeView";
import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';

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
            currentStep : 0
        };
        this._loadData = this._loadData.bind(this);

    }

    stepBtnClick(status){





        this.setState({
            currentStep:status + 1,
        });

        console.log("点我的最新数字是" + this.state.currentStep);

    }

    componentWillMount() {
        this._loadData();

    }

    _loadData(resolve) {

        let loading = SActivityIndicator.show(true, "加载中...");
        this.lastID = null;

        apis.loadOutSourceTaskStep('1','1').then(

            (responseData) => {
                SActivityIndicator.hide(loading);

                if(responseData !== null && responseData.data !== null) {


                    this.setState({

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

        return <VerifyProcessTipView currentNum={0}/>
    }

    renderVerifyBtnView(){

        return <ProcessBtnView currentNum={this.state.currentStep}  callback={this.stepBtnClick.bind(this)} />
    }

    renderBusinessTimeView(){

        return <BusinessTimeView/>
    }



    //输入框回调
    _callback(content) {

        this.setState({
            status: content,
        });
    }

    toAlertModal(){

    }

    render() {
        return(
            <View style={styles.container}>


                <ScrollView style={styles.container}>

                    {this.renderVerifyProcessTipView()}
                    {this.renderVerifyBtnView()}


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
                        callback={this._callback.bind(this)}
                    />
                    <View style={styles.identityCardPhoto}>
                        <Text style={{marginLeft : 15,fontSize:15,marginTop:10}}>身  份  证：</Text>
                        <TouchableOpacity onPress={this.toAlertModal()}>
                        <Image source={require('../img/reverse.png')} style={{marginTop:15}}/>
                        </TouchableOpacity>
                        {/*<Image source={require('../img/obverse.png')} style={{marginLeft:27,marginTop:15,*/}
                            {/*justifyContent:'flex-end'}}/>*/}
                    </View>
                    <View
                        style={{paddingTop:5,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'注  册  号：'}
                        inputWidth={{width:80}}
                        winWidth={{width:SCREEN_WIDTH-115}}
                        callback={this._callback.bind(this)}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'国税登记号：'}
                        inputWidth={{width:93}}
                        winWidth={{width:SCREEN_WIDTH-130}}
                        callback={this._callback.bind(this)}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'地税登记号：'}
                        inputWidth={{width:93}}
                        winWidth={{width:SCREEN_WIDTH-130}}
                        callback={this._callback.bind(this)}
                    />
                    </View>

                    {this.renderBusinessTimeView()}

                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'注册资金：'}
                        inputWidth={{width:80}}
                        winWidth={{width:SCREEN_WIDTH-115}}
                        callback={this._callback.bind(this)}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'经营范围：'}
                        inputWidth={{width:80}}
                        winWidth={{width:SCREEN_WIDTH-115}}
                        callback={this._callback.bind(this)}
                    />
                    </View>
                    <View style={[styles.identityCardPhoto,{height:150}]}>
                        <Text style={{marginLeft : 15,fontSize:15,marginTop:10}} >经营执照：</Text>
                        <Image source={require('../img/blicense.png')} style={{marginTop:10}}/>
                    </View>
                </ScrollView>

            </View>
        );
    }
}