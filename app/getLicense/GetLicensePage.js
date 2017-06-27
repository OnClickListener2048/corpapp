/**
 * 领取执照
 * Created by jiaxueting on 2017/6/16.
 */

import React, { Component,PropTypes } from 'react';

import {
    Text,
    View,
    ScrollView,InteractionManager,
    Dimensions, Image, TouchableOpacity,NativeModules,
} from 'react-native';

import styles from '../VerifyCompanyInfo/css/VerifyCompanyStyle'
import CompanyInfoView from '../test/view/CompanyInfoView'
import VerifyProcessTipView from '../VerifyCompanyInfo/view/VerifyProcessTipView'
import CompanyAddress from "../test/view/CompanyAddress";
import TextInputView from "./view/TextInputView";
import ProcessBtnView from "../VerifyCompanyInfo/view/ProcessBtnView";
import BusinessTimeView from "./view/BusinessTimeView";
import CompanyAddressView from "./view/CompanyAddressView";
import PickerWidget from "./view/PickerWidget";

import * as apis from '../apis';
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import DataTimerView from "../view/DataTimerView";
import AlertPhotoModal from "../view/AlertPhotoModal";
import DottedLine from "../VerifyCompanyInfo/view/DottedLine";

const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;


export default class GetLicensePage extends Component{
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    constructor(props) {
        super(props);

        this.state = {
            renderUnderline: true,
            currentStep : 0,
            visible: this.props.visible,
            reImage: null,
            linImage:null,
            photoType:null,
            dateType:null,
            firstDate:"",
            lastDate:"",
            isDateTimePickerVisible:this.props.isDateTimePickerVisible,
            detailObj:{},
            loaded:false,

        };
        this._loadData = this._loadData.bind(this);
        this._loadAreaData = this._loadAreaData.bind(this);

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
                        detailObj : responseData.data,
                        loaded:true,
                    });

                    this.props.navigator.setTitle({
                        title: this.state.detailObj.taskName // the new title of the screen as appears in the nav bar
                    });

                    console.log("detailObj赋值="+this.state.detailObj.bizTime);
                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                this.setState({
                    loaded:false,
                });
                console.log("获取失败" , e);
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    _loadAreaData(resolve) {

        let loading = SActivityIndicator.show(true, "加载中...");
        this.lastID = null;

        apis.loadDicArea().then(

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
        if (this.state.loaded === true) {
            return <CompanyInfoView companyName={this.state.detailObj.corpName}
                                    ContactsName={this.state.detailObj.contactName}
                                    ContactsPhone={this.state.detailObj.contactPhone}
                                    SalesName={this.state.detailObj.salesmanName}
                                    SalesPhone={this.state.detailObj.salesmanPhone}
                                    callback={this._callback.bind(this)}
            />
        }
    }

    renderVerifyProcessTipView(){

        return <VerifyProcessTipView currentNum={0}/>
    }

    renderVerifyBtnView(){

        return <ProcessBtnView currentNum={this.state.currentStep}  callback={this.stepBtnClick.bind(this)} />
    }

    renderBusinessTimeView() {

        if (this.state.detailObj.bizTime.startDate != null) {
            return <BusinessTimeView
                callback={this._toMyDataTimer.bind(this)}
                firstDate={this.state.detailObj.bizTime.startDate}
                lastDate={this.state.detailObj.bizTime.endDate}/>
        } else {

            return <BusinessTimeView
                callback={this._toMyDataTimer.bind(this)}
                firstDate={this.state.firstDate}
                lastDate={this.state.lastDate}/>
        }
    }

    _addressBtnClick(){
        this._loadAreaData();

    }


    renderCompanyAddressView(){

        return <CompanyAddressView callback={this._addressBtnClick.bind(this)}/>
    }



    //输入框回调
    _callback(content) {

        this.setState({
            status: content,
        });
    }

    _toMyDataTimer(isDateTimePickerVisible){
        console.log("传值=====>>"+isDateTimePickerVisible);

        if(isDateTimePickerVisible!=null) {
            this.setState({isDateTimePickerVisible: true, visible: false,
                dateType:isDateTimePickerVisible,});
            console.log("传值==>>"+isDateTimePickerVisible);
        }

    }

    toAlertModal(photoType){
        this.setState({ visible: true,isDateTimePickerVisible:false,
            photoType:photoType});
    }

    _callbackPhoto(image,visible) {//获取图片

        if(this.state.photoType=="reverse"){
            this.setState({
                reImage: image,
                visible:visible,
            });
        }else{
            this.setState({
                linImage: image,
                visible:visible,
            });
        }

    }
    _dateFormat(fmt) {
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        console.log(">>>>>"+fmt.Format("yyyy-MM-dd"));
        return fmt.Format("yyyy-MM-dd");
    }

    _callbackData(date,isDateTimePickerVisible){//获取日期
        if(date!="") {
            var dateFormat = this._dateFormat(date);
            if (this.state.dateType == "firstTime") {
                this.setState({
                    isDateTimePickerVisible: isDateTimePickerVisible,
                    firstDate: dateFormat,
                });
                console.log("==f=>>>" + this.state.firstDate);
            } else {
                this.setState({
                    isDateTimePickerVisible: isDateTimePickerVisible,
                    lastDate: dateFormat,
                });
                console.log("==l=>>>" + this.state.lastDate);
            }
        }else {
            this.setState({
                isDateTimePickerVisible: isDateTimePickerVisible,
            });
        }

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
            {this.state.visible == true &&
            <AlertPhotoModal
                callback={this._callbackPhoto.bind(this)}/>}
            {this.state.isDateTimePickerVisible == true &&
                <DataTimerView
                callback={this._callbackData.bind(this)}/>
            }
            {this.state.loaded === true &&
            <ScrollView style={styles.container}>

                {this.renderVerifyProcessTipView()}
                {this.renderVerifyBtnView()}


                {<View style={[{height: 15}]}></View>}
                {this.renderCompanyTipView()}
                {this.renderLineView()}

                {<View >
                    {this.renderTest()}

                </View>}

                {/*{<View >*/}
                {/*{this.customerMessage()}*/}

                {/*</View>}*/}

                <TextInputView
                textName={'法       人：'}
                inputWidth={{width: 75}}
                winWidth={{width: SCREEN_WIDTH - 110}}
                callback={this._callback.bind(this)}
                content={this.state.detailObj.legalEntity}
                />
                <View style={styles.identityCardPhoto}>
                <Text style={{marginLeft: 15, fontSize: 15, marginTop: 10}}>身 份 证：</Text>
                <TouchableOpacity onPress={() => {
                this.toAlertModal("reverse")
            }}>
                {this.state.reImage != null ?
                    <Image source={this.state.reImage} style={{marginTop: 15, height: 75, width: 110}}/> :
                    this.state.detailObj.idCards!=null?<Image source={{uri: 'https://'+this.state.detailObj.idCards}} style={{marginTop: 15, height: 75, width: 110}}/>:
                    <Image source={require('../img/reverse.png')} style={{marginTop: 15}}/>}

                </TouchableOpacity>

                {/*<Image source={require('../img/obverse.png')} style={{marginLeft:27,marginTop:15,*/}
                {/*justifyContent:'flex-end'}}/>*/}
                </View>
                <View
                style={{paddingTop: 5, backgroundColor: 'white'}}>
                <TextInputView
                textName={'注  册  号：'}
                inputWidth={{width: 80}}
                winWidth={{width: SCREEN_WIDTH - 115}}
                callback={this._callback.bind(this)}
                content={this.state.detailObj.regId}
                />
                </View>
                <View
                style={{paddingTop: 15, backgroundColor: 'white'}}>
                <TextInputView
                textName={'国税登记号：'}
                inputWidth={{width: 93}}
                winWidth={{width: SCREEN_WIDTH - 130}}
                callback={this._callback.bind(this)}
                content={this.state.detailObj.nationalTaxId}
                />
                </View>
                <View
                style={{paddingTop: 15, backgroundColor: 'white'}}>
                <TextInputView
                textName={'地税登记号：'}
                inputWidth={{width: 93}}
                winWidth={{width: SCREEN_WIDTH - 130}}
                callback={this._callback.bind(this)}
                content={this.state.detailObj.localTaxId}
                />
                </View>

                {this.renderBusinessTimeView()}

                <View
                style={{paddingTop: 15, backgroundColor: 'white'}}>
                <TextInputView
                textName={'注册资金：'}
                inputWidth={{width: 80}}
                winWidth={{width: SCREEN_WIDTH - 115}}
                callback={this._callback.bind(this)}
                content={this.state.detailObj.regFunds}
                />
                </View>
                {this.renderCompanyAddressView()}
                <View
                style={{paddingTop: 15, backgroundColor: 'white'}}>
                <TextInputView
                textName={'经营范围：'}
                inputWidth={{width: 80}}
                winWidth={{width: SCREEN_WIDTH - 115}}
                callback={this._callback.bind(this)}
                content={this.state.detailObj.bizRange}
                />
                </View>
                <View style={[styles.identityCardPhoto, {height: 150}]}>
                <Text style={{marginLeft: 15, fontSize: 15, marginTop: 10}}>经营执照：</Text>
                <TouchableOpacity onPress={() => {
                this.toAlertModal("blicense")
            }}>
                {this.state.linImage != null ?
                    <Image source={this.state.linImage} style={{marginTop: 10, height: 75, width: 110}}/> :
                    this.state.detailObj.bizLics!=null?<Image source={{uri: 'http://'+this.state.detailObj.bizLics}} style={{marginTop: 10, height: 75, width: 110}}/>:
                        <Image source={require('../img/blicense.png')} style={{marginTop: 10}}/>
                }

                </TouchableOpacity>

                </View>
                </ScrollView>
            }
        </View>
        );
    }
}