/**
 * 领取执照
 * Created by jiaxueting on 2017/6/16.
 */

import React, { Component,PropTypes } from 'react';
import Picker from 'react-native-picker';

import {
    Text,
    View,
    ScrollView,InteractionManager,
    Dimensions, Image, TouchableOpacity,NativeModules,
    KeyboardAvoidingView
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
import MultiTextInputView from "./view/MultiTextInputView";

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
            isDateTimePickerVisible:this.props.isDateTimePickerVisible,
            detailObj:{},
            loaded:false,
            editables:false,//不可编辑
            allowEditInfo:false,

            //保存数据类型
            legalEntity:null,//法人
            regId:null,//注册号
            nationalTaxId:null,//国税登记号
            localTaxId:null,//地税登记号
            regFunds:null,//注册资金
            bizRange:null,//经营范围
            bizLics:null,//营业执照
            idCards:null,//身份证
            endDate:"",//结束时间
            startDate:"",//开始时间

            city:"北京",        //市
            contactName:null,    //联系人名称
            contactPhone:null,   //联系人电话
            corpAddress:"北京市朝阳区",     //公司地址
            corpName:null,          //公司名称
            corpType:"私营",          //企业类型
            district:"朝阳区",          //县或区
            industry:"IT",         //所属行业
            stepId:this.props.stepId,          //步骤 ID
            taskId:this.props.taskId,          //任务ID, 必填
            unlimited:false,        //营业期限不限
            loadedArea:false,
            areaArr:[],
            selectArea:[],  //选择的地址信息 ['北京', '朝阳区']  用这个判断到底有没有市区选择 如果没有也没用默认值的话 说明未选择
            areaCodeArr:[],
            selectAreaCode:[],  //选择地址的 id

            areaCodeIndexArr:[],
            areaCodeTmpIndexArr:[],   //临时的选择

        };
        this._loadData = this._loadData.bind(this);
        this._loadAreaData = this._loadAreaData.bind(this);
        this._postClientData = this._postClientData.bind(this);
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

        apis.loadOutSourceTaskStep(this.state.stepId,this.state.taskId).then(

            (responseData) => {
                SActivityIndicator.hide(loading);

                if(responseData !== null && responseData.data !== null) {


                    this.setState({
                        detailObj : responseData.data,
                        allowEditInfo:responseData.data.allowEditInfo,
                        loaded:true,
                            bizLics:	responseData.data.bizLics,//营业执照
                            bizRange:	responseData.data.bizRange,//经营范围
                            city	: responseData.data.city,        //市
                            contactName:	responseData.data.contactName,    //联系人名称
                            contactPhone:	responseData.data.contactPhone,    //联系人电话
                            corpAddress:	responseData.data.corpAddress,     //公司地址
                            corpName:	responseData.data.corpName,          //公司名称
                            corpType:	responseData.data.corpType,          //企业类型
                            district:	responseData.data.district,          //县或区
                            endDate:	responseData.data.bizTime.endDate,//营业期限结束日期
                            idCards:	responseData.data.idCards,//身份证正反两面(目前只用一张),file组件
                            industry:	responseData.data.industry,           //所属行业
                            legalEntity:	responseData.data.legalEntity,//法人
                            localTaxId:	responseData.data.localTaxId,//地税登记号
                            nationalTaxId:	responseData.data.nationalTaxId,//国税登记号
                            regFunds:	responseData.data.regFunds,//注册资金
                            regId:	responseData.data.regId,//注册号
                            startDate:	responseData.data.bizTime.startDate,//营业期限开始日期
                            stepId:	responseData.data.stepId,          //步骤 ID
                            taskId:	responseData.data.taskId,          //任务ID, 必填
                            unlimited:responseData.data.bizTime.unlimited,        //营业期限不限
                            selectArea : [responseData.data.corpAddressArea.city,responseData.data.corpAddressArea.district],
                    });

                    if(this.state.selectArea.length > 1 && this.state.selectArea[0].length > 0 && this.state.selectArea[1].length > 0 && this.refs.companyAddressView) {
                            this.refs.companyAddressView.setArea(this.state.selectArea);
                    }

                    this.props.navigator.setTitle({
                        title: this.state.detailObj.stepName // the new title of the screen as appears in the nav bar
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

                   this.state.loadedArea = true;
                    this.state.areaArr = [];
                    this.state.areaCodeArr = [];

                    for(let index in responseData.data) {

                        let  secDic = new Object();
                        secDic["" + index + ""] = responseData.data[index].name;

                        this.state.areaArr = this.state.areaArr.concat(secDic);

                        let  secCodeDic = new Object();
                        secCodeDic["" + responseData.data[index].code + ""] = responseData.data[index].codes;

                        this.state.areaCodeArr = this.state.areaCodeArr.concat(secCodeDic);

                    }

                    this._showAreaPicker();

                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("获取失败" , e);
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    _postClientData(cilentObj){
        let loading = SActivityIndicator.show(true, "加载中...");

        apis.postClientMessage(cilentObj).then(
            (responseData) => {
                SActivityIndicator.hide(loading);
                console.log("提交成功cc" , responseData);

                if(responseData !== null && responseData.data !== null) {

                    console.log("提交成功" , responseData.data);
                    this.setState({

                    });

                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("提交失败" , e);
                Toast.show('提交失败' + JSON.stringify(e));
            },
        );
    }


    // renderExpenseItem(item , i) {
    //     return <RegisterCompanyCell key={i} detail={item} isFirst={i == 0} isLast={i == details.length - 1}/>;
    // }

    renderTest() {
        if (this.state.loaded === true) {
            console.log(""+this.state.editables);
            return <CompanyInfoView companyName={this.state.detailObj.corpName}
                                    ContactsName={this.state.detailObj.contactName}
                                    ContactsPhone={this.state.detailObj.contactPhone}
                                    SalesName={this.state.detailObj.salesmanName}
                                    SalesPhone={this.state.detailObj.salesmanPhone}
                                    isFocusData={this.state.editables}
                                    callbackCom={this._callbackComp.bind(this)}
                                    callbackCon={this._callbackCon.bind(this)}
                                    callbackPho={this._callbackPho.bind(this)}
            />
        }
    }

    //输入框回调 公司名
    _callbackComp(content) {
        console.log("输入框树枝公司名称="+content+this.state.visible);
        this.setState({
            corpName:content,//公司名称
            visible:false,
        });
    }

    //输入框回调 联系人
    _callbackCon(content) {
        console.log("输入框树枝联系人="+content+this.state.visible);
        this.setState({
            contactName:content,
            visible:false,
        });
    }

    //输入框回调 联系电话
    _callbackPho(content) {
        console.log("输入框树枝电话="+content+this.state.visible);
        this.setState({
            contactPhone:content,
            visible:false,
        });
    }

    renderVerifyProcessTipView(){

        return <VerifyProcessTipView currentNum={0}/>
    }

    renderVerifyBtnView(){

        return <ProcessBtnView currentNum={this.state.currentStep}  callback={this.stepBtnClick.bind(this)} />
    }

    renderBusinessTimeView() {

            return <BusinessTimeView
                callback={this._toMyDataTimer.bind(this)}
                callbackAll={this._unlimit.bind(this)}
                firstDate={this.state.startDate}
                lastDate={this.state.endDate}
                isFocus={this.state.editables}/>
    }


    _showAreaPicker() {

        // selectedValue = ['a', 2];
        Picker.init({
            pickerTitleText: '请选择注册地',
            pickerData: this.state.areaArr,
            // pickerData: pickerData,
            selectedValue: this.state.selectArea,
            onPickerConfirm: pickedValue => {
                this.setState({
                    selectArea : pickedValue,
                    areaCodeIndexArr : this.state.areaCodeTmpIndexArr,
                });

                let  cityIndex = this.state.areaCodeIndexArr[0];
                let  districtIndex = this.state.areaCodeIndexArr[1];



                let secDic = this.state.areaCodeArr[cityIndex];  //找到市所在的一组数据 {'市' : ['区','区']}}

                for(let secCode in secDic) {
                    let cityCodeId = secCode;
                    let districtArr = secDic[secCode]; //区数组
                    let districtCodeId = districtArr[districtIndex];
                    this.state.selectAreaCode = [cityCodeId,districtCodeId];
                }

                console.log('呵呵', this.state.selectAreaCode);



                if(this.refs.companyAddressView) {
                    this.refs.companyAddressView.setArea(this.state.selectArea);
                }
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                this.state.areaCodeTmpIndexArr = pickedIndex;

                // console.log('Select Area areaCodeTmpIndexArr', pickedValue, pickedIndex , this.state.areaCodeTmpIndexArr );
            }
        });
        Picker.show();
    }


    _addressBtnClick(){

        if (this.state.loadedArea){
            this._showAreaPicker();
            return;
        }else {
            this._loadAreaData();
        }
    }


    renderCompanyAddressView(){
        return   <CompanyAddressView ref="companyAddressView" city={'市'} district={'区'} callback={this._addressBtnClick.bind(this)}/>
    }



    //输入框回调 法人
    _callbacklegal(content) {
        console.log("输入框树枝fa="+content);
        this.setState({
            legalEntity:content,//法人
            visible:false,
        });
    }
    //输入框回调 注册号
    _callbackreg(content) {
        console.log("输入框树枝zhu="+content);
        this.setState({
            regId:content,//注册号
            visible:false,
        });
    }
    //输入框回调 国税登记号
    _callbacknation(content) {
        console.log("输入框树枝guo ="+content);
        this.setState({
            nationalTaxId:content,//国税登记号
            visible:false,
        });
    }
    //输入框回调 地税登记号
    _callbackdetail(content) {
        console.log("输入框树枝di="+content);
        this.setState({
            localTaxId:content,//地税登记号
            visible:false,
        });
    }
    //输入框回调 注册资金
    _callbackregFunds(content) {
        console.log("输入框树枝jin="+content);
        this.setState({
            regFunds:content,//注册资金
            visible:false,
        });
    }
    //输入框回调 经营范围
    _callbackbiz(content) {
        console.log("输入框树枝jing="+content);
        this.setState({
            bizRange:content,//经营范围
            visible:false,
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

    _unlimit(allTimePressBtnSelected){
        this.setState({
            unlimited:allTimePressBtnSelected,
        });
        console.log("打印是否限制时间="+this.state.unlimited);
    }

    toAlertModal(photoType){
        this.setState({ visible: true,isDateTimePickerVisible:false,
            photoType:photoType});
    }

    _callbackPhoto(image,visible) {//获取图片

        if(this.state.photoType=="reverse"){
            let rePhoto = {
                uri: image,
                type: 'reImage/jpeg',
                name: 'reImage.jpg',
            };
            this.setState({
                reImage: image,
                visible:visible,
                idCards:rePhoto,

            });
        }else{
            let linPhoto = {
                uri: image,
                type: 'linImage/jpeg',
                name: 'linImage.jpg',
            };
            this.setState({
                linImage: image,
                visible:visible,
                bizLics:linPhoto,

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
                    startDate: dateFormat,
                });
                console.log("==f=>>>" + this.state.startDate);
            } else {
                this.setState({
                    isDateTimePickerVisible: isDateTimePickerVisible,
                    endDate: dateFormat,
                });
                console.log("==l=>>>" + this.state.endDate);
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

    _edit(editables){
        if(editables==false){//点击保存，赋值并保存
            let saveObject={"bizLics":	this.state.bizLics,//营业执照
                "bizRange":	this.state.bizRange,//经营范围
                "city"	: this.state.city,        //市
                "contactName":	this.state.contactName,    //联系人名称
                "contactPhone":	this.state.contactPhone,    //联系人电话
                "corpAddress":	this.state.corpAddress,     //公司地址
                "corpName":	this.state.corpName,          //公司名称
                "corpType":	this.state.corpType,          //企业类型
                "district":	this.state.district,          //县或区
                "endDate":	this.state.endDate,//营业期限结束日期
                "idCards":	this.state.idCards,//身份证正反两面(目前只用一张),file组件
                "industry":	this.state.industry,           //所属行业
                "legalEntity":	this.state.legalEntity,//法人
                "localTaxId":	this.state.localTaxId,//地税登记号
                "nationalTaxId":	this.state.nationalTaxId,//国税登记号
                "regFunds":	this.state.regFunds,//注册资金
                "regId":	this.state.regId,//注册号
                "startDate":	this.state.startDate,//营业期限开始日期
                "stepId":	this.state.stepId,          //步骤 ID
                "taskId":	this.state.taskId,          //任务ID, 必填
                "unlimited":this.state.unlimited, }       //营业期限不限
            console.log("提交=="+saveObject.regFunds+"???"+saveObject);
            this._postClientData(saveObject);

        }
        this.setState({
            editables:editables,
        });
    }

    renderCompanyTipView(){
        // let allowEditInfo = this.state.detailObj.allowEditInfo;
        console.log("输出是否可编辑="+this.state.allowEditInfo+this.state.editables);


        return  (<View style={[{ height:58, width : SCREEN_WIDTH,backgroundColor:'#FFFFFF',flexDirection:'row',alignItems: 'center'}]}>
            <Text style={{fontSize:18,marginLeft:15,marginTop:20,marginBottom:20, textAlign:'left', justifyContent: 'center',color:'#323232'}}>{'客户基本信息'}</Text>
            {this.state.editables == false&&this.state.allowEditInfo&&
                <TouchableOpacity onPress={() => {
                    this._edit(true)
                }}>
                <Image source={require("../img/editor.png")}
                       style={{marginLeft: 210}}/>
                </TouchableOpacity> }
            {this.state.editables == true &&this.state.allowEditInfo&&
                <TouchableOpacity onPress={() => {
                    this._edit(false)
                }}>
                    <View style={{
                        marginLeft: 185,
                        height: 40,
                        width: 50,
                        borderRadius: 2.5,
                        alignItems: 'center',
                        backgroundColor: '#e5151b',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 15, textAlign: 'center', justifyContent: 'center', color: '#FFFFFF'}}>
                            {'保存'}</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>)
    }

    render() {
        return(


        <KeyboardAvoidingView behavior='padding' style={styles.container}>
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
                callback={this._callbacklegal.bind(this)}
                content={this.state.detailObj.legalEntity}
                textEditable={this.state.editables}/>
                <View style={styles.identityCardPhoto}>
                <Text style={{marginLeft: 15, fontSize: 15, marginTop: 10}}>身 份 证：</Text>
                    {this.state.editables === true ?
                        <TouchableOpacity onPress={() => {
                            this.toAlertModal("reverse")
                        }}>
                            {this.state.reImage != null ?
                                <Image source={this.state.reImage} style={{marginTop: 15, height: 75, width: 110}}/> :
                                this.state.detailObj.idCards != null ?
                                    <Image source={{uri: 'https://' + this.state.detailObj.idCards}}
                                           style={{marginTop: 15, height: 75, width: 110}}/> :
                                    <Image source={require('../img/reverse.png')} style={{marginTop: 15}}/>}

                        </TouchableOpacity> :
                        <View>
                            {this.state.reImage != null ?
                                <Image source={this.state.reImage} style={{marginTop: 15, height: 75, width: 110}}/> :
                                this.state.detailObj.idCards != null ?
                                    <Image source={{uri: 'https://' + this.state.detailObj.idCards}}
                                           style={{marginTop: 15, height: 75, width: 110}}/> :
                                    <Image source={require('../img/reverse.png')} style={{marginTop: 15}}/>}

                        </View>
                    }

                {/*<Image source={require('../img/obverse.png')} style={{marginLeft:27,marginTop:15,*/}
                {/*justifyContent:'flex-end'}}/>*/}
                </View>
                <View
                style={{paddingTop: 5, backgroundColor: 'white'}}>
                <TextInputView
                textName={'注  册  号：'}
                inputWidth={{width: 80}}
                winWidth={{width: SCREEN_WIDTH - 115}}
                callback={this._callbackreg.bind(this)}
                content={this.state.detailObj.regId}
                textEditable={this.state.editables}/>
                </View>
                <View
                style={{paddingTop: 15, backgroundColor: 'white'}}>
                <TextInputView
                textName={'国税登记号：'}
                inputWidth={{width: 93}}
                winWidth={{width: SCREEN_WIDTH - 130}}
                callback={this._callbacknation.bind(this)}
                content={this.state.detailObj.nationalTaxId}
                textEditable={this.state.editables}/>
                </View>
                <View
                style={{paddingTop: 15, backgroundColor: 'white'}}>
                <TextInputView
                textName={'地税登记号：'}
                inputWidth={{width: 93}}
                winWidth={{width: SCREEN_WIDTH - 130}}
                callback={this._callbackdetail.bind(this)}
                content={this.state.detailObj.localTaxId}
                textEditable={this.state.editables}/>
                </View>

                {this.renderBusinessTimeView()}

                <View
                style={{paddingTop: 15, backgroundColor: 'white'}}>
                <TextInputView
                textName={'注册资金：'}
                inputWidth={{width: 80}}
                winWidth={{width: SCREEN_WIDTH - 115}}
                callback={this._callbackregFunds.bind(this)}
                content={this.state.detailObj.regFunds}
                textEditable={this.state.editables}/>
                </View>
                {this.renderCompanyAddressView()}
                <View
                style={{paddingTop: 15, backgroundColor: 'white'}}>
                <MultiTextInputView
                textName={'经营范围：'}
                inputWidth={{width: 80}}
                winWidth={{width: SCREEN_WIDTH - 115}}
                callback={this._callbackbiz.bind(this)}
                content={this.state.detailObj.bizRange}
                textEditable={this.state.editables}/>
                </View>
                <View style={[styles.identityCardPhoto, {height: 150}]}>
                <Text style={{marginLeft: 15, fontSize: 15, marginTop: 10}}>经营执照：</Text>
                    {this.state.editables === true ?
                        <TouchableOpacity onPress={() => {
                            this.toAlertModal("blicense")
                        }}>
                            {this.state.linImage != null ?
                                <Image source={this.state.linImage} style={{marginTop: 10, height: 75, width: 110}}/> :
                                this.state.detailObj.bizLics != null ?
                                    <Image source={{uri: 'http://' + this.state.detailObj.bizLics}}
                                           style={{marginTop: 10, height: 75, width: 110}}/> :
                                    <Image source={require('../img/blicense.png')} style={{marginTop: 10}}/>
                            }

                        </TouchableOpacity> :
                        <View>
                            {this.state.linImage != null ?
                                <Image source={this.state.linImage} style={{marginTop: 10, height: 75, width: 110}}/> :
                                this.state.detailObj.bizLics != null ?
                                    <Image source={{uri: 'http://' + this.state.detailObj.bizLics}}
                                           style={{marginTop: 10, height: 75, width: 110}}/> :
                                    <Image source={require('../img/blicense.png')} style={{marginTop: 10}}/>
                            }

                        </View>
                    }

                </View>
                </ScrollView>
            }
        </KeyboardAvoidingView>
        );
    }
}