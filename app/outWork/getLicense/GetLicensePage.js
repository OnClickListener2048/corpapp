/**
 * 领取执照
 * Created by jiaxueting on 2017/6/16.
 */

import React, { Component,PropTypes,} from 'react';
import Picker from 'react-native-picker';
import errorText from '../../util/ErrorMsg';

import {
    Alert,
    Text,
    View,
    ScrollView, InteractionManager,BackAndroid,
    Dimensions, Image, TouchableOpacity, NativeModules,
    KeyboardAvoidingView, TextInput,Platform,
    DeviceEventEmitter

} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import styles from '../VerifyCompanyInfo/css/VerifyCompanyStyle'
import CompanyInfoView from '../../commonView/view/CompanyInfoView'
import VerifyProcessTipView from '../../outWork/VerifyCompanyInfo/view/VerifyProcessTipView'
import CompanyAddress from "../../commonView/view/CompanyAddress";
import TextInputView from "./view/TextInputView";
import ProcessBtnView from "../VerifyCompanyInfo/view/ProcessBtnView";
import BusinessTimeView from "./view/BusinessTimeView";
import CompanyAddressView from "./view/CompanyAddressView";
import PickerWidget from "./view/PickerWidget";

import * as apis from '../../apis/index';
import SActivityIndicator from '../../modules/react-native-sww-activity-indicator/index';
import DataTimerView from "../../view/DataTimerView";
import AlertPhotoModal from "../../view/AlertPhotoModal";
import DottedLine from "../VerifyCompanyInfo/view/DottedLine";
import MultiTextInputView from "./view/MultiTextInputView";
import SinglePickerView from "./view/SinglePickerView";
import Toast from 'react-native-root-toast';
import ImageLoad from "../../view/ImageLoad";
import WatchImageModal from "./view/WatchImageModal";
import BComponent from '../../base/index';
import NoNetView from "../../base/NoNetView";
import NoMessage from "../../commonView/NoMessage";
import NoNetEmptyView from "../../base/NoNetEmptyView";

const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;


export default class GetLicensePage extends BComponent {
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    constructor(props) {
        super(props);

        this.state = {
            renderUnderline: true,
            currentStep : 0,
            imgVisibles:this.props.imgVisibles,//是否显示选择图片弹窗
            reImage: null,
            linImage:null,
            photoType:null,
            dateType:null,
            isDateTimePickerVisible:this.props.isDateTimePickerVisible,
            detailObj:{},
            loaded:null,
            editables:false,//不可编辑
            allowEditInfo:false,//登陆人员权限，是否可编辑
            inProgressEdit:false,//开始任务才可编辑
            isPickerOpen:false,//地址和类型选择器是否打开

            //保存数据类型
            legalEntity:null,//法人
            regId:null,//注册号
            nationalTaxId:null,//国税登记号
            localTaxId:null,//地税登记号
            regFunds:null,//注册资金
            bizRange:this.props.bizRange,//经营范围
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
            corpTypeId: null, // 企业类型ID
            district:"朝阳区",          //县或区
            industry:"IT",         //所属行业
            industryId: null, // 所属行业ID
            stepId:this.props.stepId,          //步骤 ID
            taskId:this.props.taskId,          //任务ID, 必填
            unlimited:false,        //营业期限不限
            loadedArea:false,
            areaArr:[],
            selectArea:[],  //选择的地址信息 ['北京', '朝阳区']  用这个判断到底有没有市区选择 如果没有也没用默认值的话 说明未选择
            areaCodeArr:[],
            selectAreaCode:[],  //选择地址的 id 保存的时候用
            areaCodeIndexArr:[],
            canClickBtn : true,
        };
        this._loadData = this._loadData.bind(this);
        this._loadAreaData = this._loadAreaData.bind(this);
        this._postClientData = this._postClientData.bind(this);
        this._bizRanageContent = this._bizRanageContent.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        super.onNavigatorEvent(event);

        console.log('ApplicationCenterPage event.type', event.type);
        if(event.id==='backPress'){
            console.log("监听返回键");
            if(this.state.isPickerOpen){
                console.log("关闭弹窗");
                Picker.hide();
                this.setState({
                    isPickerOpen : false,
                });
            }else{
                console.log("关闭页面");
                this.props.navigator.pop();
            }
        }
    }

    //详情状态操作按钮操作
    stepBtnClick(status){
        let callback = this.props.callback;
        if(callback) {
            callback();
        }

        this.setState({
            // currentStep:status + 1,
        });
        if(this.refs.verifyProcessTipView) {
            this.refs.verifyProcessTipView.setCurrentNum(status);
        }

        console.log("点我的最新数字是" + status);  //1确认材料完成 2 任务完成
        if(status===1){
            this.setState({
                inProgressEdit:true,

            });
            this._loadData();
            if(this.refs.companyInfoView) {
                this.refs.companyInfoView.setRefresh(true,this.state.detailObj.corpName,this.state.detailObj.contactName,this.state.detailObj.contactPhone);
            }
        }else{
            this.setState({
                inProgressEdit:false,
            });
        }

    }

    componentWillMount() {
        this._loadData();

    }

    //关闭弹窗
    componentWillUnmount(){
        if(this.state.isPickerOpen){
            Picker.hide();
        }
    }

    //获取详情页所有客户信息
    _loadData() {

        let loading = SActivityIndicator.show(true, "加载中...");
        this.lastID = null;

        apis.loadOutSourceTaskStep(this.state.stepId,this.state.taskId).then(

            (responseData) => {
                SActivityIndicator.hide(loading);

                if(responseData !== null && responseData.data !== null) {

                    this.setState({
                        detailObj : responseData.data,
                        allowEditInfo:responseData.data.allowEditInfo,
                        inProgressEdit :(responseData.data.allowEditInfo==='true'&&responseData.data.progress.materialConfirm==='true'),
                        loaded:true,
                            // bizLics:	responseData.data.bizLics,//营业执照
                            bizRange:	responseData.data.bizRange,//经营范围
                            city	: responseData.data.corpAddressArea.cityId,        //市
                            contactName:	responseData.data.contactName,    //联系人名称
                            contactPhone:	responseData.data.contactPhone,    //联系人电话
                            corpAddress:	responseData.data.corpAddress,     //公司地址
                            corpName:	responseData.data.corpName,          //公司名称
                            corpType:	responseData.data.corpType,          //企业类型
                            corpTypeId:responseData.data.corpTypeId,
                            district:	responseData.data.corpAddressArea.districtId,          //县或区
                            endDate:	responseData.data.bizTime.endDate,//营业期限结束日期
                            // idCards:	responseData.data.idCards,//身份证正反两面(目前只用一张),file组件
                            industry:	responseData.data.industry,           //所属行业
                            industryId:responseData.data.industryId,
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
                            selectAreaCode:[responseData.data.corpAddressArea.cityId,responseData.data.corpAddressArea.districtId],
                    });
                    console.log(this.state.allowEditInfo+",=,"+this.state.detailObj.progress.materialConfirm)
                    if(this.refs.companyAddressView) {
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
                Toast.show(errorText( e ));
            },
        );
    }

    //获取城市数据信息
    _loadAreaData() {

        let loading = SActivityIndicator.show(true, "加载中...");
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

                        if (responseData.data[index].name.length == 0){
                            secDic["" + index + ""] = ['(空)']
                        }

                        this.state.areaArr = this.state.areaArr.concat(secDic);

                        let  secCodeDic = new Object();
                        secCodeDic["" + responseData.data[index].code + ""] = responseData.data[index].codes;

                        if (responseData.data[index].name.length == 0){
                            secCodeDic["" + responseData.data[index].code + ""] = ['']
                        }

                        this.state.areaCodeArr = this.state.areaCodeArr.concat(secCodeDic);

                    }

                    this._showAreaPicker();

                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("获取失败" , e);
                Toast.show(errorText( e ));
            },
        );
    }

    //提交修改的数据
    _postClientData(cilentObj){
        let loading = SActivityIndicator.show(true, "加载中...");

        apis.postClientMessage(cilentObj).then(
            (responseData) => {
                SActivityIndicator.hide(loading);
                console.log("提交成功cc" , responseData);
                Toast.show('提交成功');
                this.setState({
                    loaded:true,
                });
                if(responseData !== null && responseData.data !== null) {

                    console.log("提交成功" , responseData.data);

                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("提交失败" , e);

                Toast.show(errorText( e ));
            },
        );
    }


    // renderExpenseItem(item , i) {
    //     return <RegisterCompanyCell key={i} detail={item} isFirst={i == 0} isLast={i == details.length - 1}/>;
    // }

    //客户基本信息显示
    renderTest() {
        if (this.state.loaded === true) {
            console.log(""+this.state.editables);
            return <CompanyInfoView
                ref="companyInfoView"
                companyName={this.state.detailObj.corpName}
                                    ContactsName={this.state.detailObj.contactName}
                                    ContactsPhone={this.state.detailObj.contactPhone}
                                    SalesName={this.state.detailObj.salesmanName}
                                    SalesPhone={this.state.detailObj.salesmanPhone}
                                    isFocusData={this.state.editables}
            />
        }
    }

    //输入框子组件
    renderInput(textType,textName,textContent){
        return(
            <TextInputView
                ref={textType}
                textName={textName}
                content={textContent}
                textEditable={this.state.editables}/>
            )

    }

    //详情状态
    renderVerifyProcessTipView(){

        return <VerifyProcessTipView ref="verifyProcessTipView"
                                     currentNum={this.state.detailObj.progress.finished === 'true' ? 2 :
                                         this.state.detailObj.progress.materialConfirm === 'true' ? 1 : 0}/>
    }

    //详情状态操作按钮
    renderVerifyBtnView(){
        return <ProcessBtnView allowEdit={this.state.allowEditInfo === 'true'}
                               stepId={this.state.stepId}
                               taskId={this.state.taskId}
                               ref="ProcessBtnView"
                               finished={this.state.detailObj.progress.finished === 'true'}
                               materialConfirm={this.state.detailObj.progress.materialConfirm === 'true'}
                               inProgress={this.state.detailObj.progress.inProgress === 'true'}
                               callback={this.stepBtnClick.bind(this)} />
    }

    //营业期限时间显示子组件
    renderBusinessTimeView() {

            return <BusinessTimeView
                callback={this._toMyDataTimer.bind(this)}
                callbackAll={this._unlimit.bind(this)}
                firstDate={this.state.startDate}
                lastDate={this.state.endDate}
                isFocus={this.state.editables}
                allTimePressBtnSelected={this.state.unlimited}/>
    }

    //市区picker弹框
    _showAreaPicker() {
        this.setState({
            isPickerOpen : true,
            imgVisibles:false,
        });
        Picker.init({
            pickerConfirmBtnText: '确认',
            pickerConfirmBtnColor: [0xe5, 0x15 ,0x1d, 1],
            pickerCancelBtnText: '取消',
            pickerCancelBtnColor: [0, 0 ,0, 1],
            pickerTitleText: '请选择注册地',
            pickerData: this.state.areaArr,
            pickerBg :  [0xff, 0xff ,0xff, 1],
           // pickerToolBarBg : [0xff, 0xff ,0xff, 1],
            // pickerData: pickerData,
            selectedValue: this.state.selectArea,
            onPickerConfirm: pickedValue => {
                //因为若什么都不选择的时候是不会走onPickerSelect方法的 但是会走此方法把默认的值传过来 即不管选择与否都会走这个方法
                //所以直接在这个方法里面拿到选择的地址名称(pickeValue就是['北京','朝阳区']),去遍历codeId找到选择的'市Id','区Id'
                this.setState({
                    isPickerOpen : false,
                });

                for (let  i = 0 ; i < this.state.areaArr.length ; i++){
                    let isBreak = false;
                    let  areaDic = this.state.areaArr[i];

                    for(let areaSec in areaDic) {
                        let cityName = areaSec;          //市名称
                        if (cityName === pickedValue[0]){
                            let districtsArr = areaDic[cityName]; //区数组

                            for (let  j = 0 ; j < districtsArr.length ; j++) {
                                let districtName = districtsArr[j];
                                if (districtName === pickedValue[1]) {
                                    this.state.areaCodeIndexArr = [i,j];
                                    break;
                                }
                            }
                            isBreak = true;
                            break;
                        }
                    }
                    if (isBreak){
                        break;
                    }
                }
                console.log('哈哈自己筛选后==>', this.state.areaCodeIndexArr[0],this.state.areaCodeIndexArr[1]);

                let  cityIndex = this.state.areaCodeIndexArr[0];
                let  districtIndex = this.state.areaCodeIndexArr[1];

                let secDic = this.state.areaCodeArr[cityIndex];  //找到市所在的一组数据 {'市Id' : ['区Id','区Id']}}

                for(let secCode in secDic) {
                    let cityCodeId = secCode;          //市id
                    let districtArr = secDic[secCode]; //区数组
                    let districtCodeId = districtArr[districtIndex];
                    this.state.selectAreaCode = [cityCodeId,districtCodeId];
                    this.setState({
                        city:cityCodeId,
                        district:districtCodeId,
                    });
                }

                if(this.refs.companyAddressView) {
                    this.refs.companyAddressView.setArea(pickedValue);
                }

            },
            onPickerCancel: pickedValue => {
                // console.log('area', pickedValue);
                this.setState({
                    isPickerOpen : false,
                });
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                // this.state.areaCodeTmpIndexArr = pickedIndex;

                // console.log('Select Area areaCodeTmpIndexArr', pickedValue, pickedIndex , this.state.areaCodeTmpIndexArr );
            }
        });
        Picker.show();

    }

    //获取城市数据信息
    _addressBtnClick(){
        if (this.state.loadedArea){
            this._showAreaPicker();
            return;
        }else {
            this._loadAreaData();
        }
    }

    //城市显示子组件
    renderCompanyAddressView(){
        return   <CompanyAddressView
            isFouces={this.state.editables}
            ref="companyAddressView" city={'市'} district={'区'} callback={this._addressBtnClick.bind(this)}/>
    }

    //输入框回调 经营范围
    _callbackbiz(content) {
        console.log("输入框树枝jing="+content);
        this.setState({
            bizRange:content,//经营范围
        });
    }

    //营业期限时间显示逻辑及类型
    _toMyDataTimer(isDateTimePickerVisible){
        console.log("传值=====>>"+isDateTimePickerVisible);
        this.setState({
            imgVisibles:false,
        })
        if(isDateTimePickerVisible!=null) {
            this.setState({isDateTimePickerVisible: true, visible: false,
                dateType:isDateTimePickerVisible,});
            console.log("传值==>>"+isDateTimePickerVisible);
        }

    }

    //营业期限时间是否限制
    _unlimit(allTimePressBtnSelected){
        this.setState({
            imgVisibles:false,
        })
        this.setState({
            unlimited:allTimePressBtnSelected,
        });
        console.log("打印是否限制时间="+this.state.unlimited);
    }

    //图片类型判断：身份证／营业执照
    toAlertModal(photoType){
        if(this.state.editables === false){
            return;
        }
        this.setState({isDateTimePickerVisible:false,
            photoType:photoType});
        console.log("photoType="+photoType+this.state.visible);
        this._watchImVisible(photoType);
    }

    //实时更新参数值
    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible,
            photoType:props.photoType,
            imgVisibles:props.imgVisibles,
            isPickerOpen:props.isPickerOpen,
        });
    }

    //图片获取完成后的显示和赋值
    _callbackPhoto(image,imgVisibles) {//获取图片
        console.log("callback="+image);
        this.setState({
            imgVisibles: false,
        });
        if(image===null){
            console.log("callback=1"+image);
            this.setState({
                imgVisibles:false,
            })
            return;
        }
        if(this.state.photoType=="reverse"){

            let rePhoto = {
                uri: image.uri,
                type: 'reImage/jpeg',
                name: 'reImage.jpg',
            };
            console.log("图片地址显示image==="+image);

            this.setState({
                reImage: image,
                imgVisibles:imgVisibles,
                idCards:rePhoto,
                // idCards:image,
            });
        }else{
            let linPhoto = {
                uri: image.uri,
                type: 'linImage/jpeg',
                name: 'linImage.jpg',
            };
            this.setState({
                linImage: image,
                imgVisibles:imgVisibles,
                bizLics:linPhoto,
                // bizLics:image,
            });
        }

    }

    //是否有图片，及图片大图展示
    _watchImVisible(photoType){
        let imgVisibles = false;
        console.log("photoTypeWatch="+photoType);
        console.log("imgVisibles="+imgVisibles);
        if(photoType==="reverse"&&this.state.reImage === null&&(this.state.detailObj.idCards === null ||this.state.detailObj.idCards.length===0)){
            imgVisibles = true;
            console.log("imgVisibles,reverse="+imgVisibles);
        }else if(photoType==="blicense"&&this.state.linImage === null&&(this.state.detailObj.bizLics === null ||this.state.detailObj.bizLics.length===0)){
            imgVisibles = true;
            console.log("imgVisibles,blicense="+imgVisibles);

        }else{
            if (this.state.canClickBtn === false){
                return;
            }

            this.state.canClickBtn = false;

            this.timer = setTimeout(async()=>{
                await this.setState({canClickBtn:true})//1.5秒后可点击
            },500)
            const imageUrl= photoType == "reverse" ? this.state.detailObj.idCards : this.state.detailObj.bizLics;
            const imageFile= photoType == "reverse" ? (this.state.idCards === null ? null : this.state.idCards.uri) : (this.state.bizLics === null ? null : this.state.bizLics.uri);
            const failImage=photoType == "reverse" ?require('../../img/blicense.png'):require('../../img/reverse.png');
            console.log("客户信息图片=="+imageUrl+"&*"+imageFile);
                this.props.navigator.push({
                    screen: 'WatchImageModalPage',
                    // backButtonTitle: '返回', // 返回按钮的文字 (可选)
                    backButtonHidden: false, // 是否隐藏返回按钮 (可选)
                    passProps: {
                        title:photoType == "reverse" ? '身份证' : '经营执照',
                        imageUrl: imageUrl,
                        imageFile:imageFile,
                        failImageSource:failImage,
                        callback: this._callbackPhoto.bind(this),
                    }
                });
        }
        this.setState({
            imgVisibles:imgVisibles
        })
    }

    //日期按需求格式化
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

    //虚线显示
    renderLineView(){

        return      <View style={[{backgroundColor:'white',width : SCREEN_WIDTH,paddingLeft:15,paddingRight:15, height : 1}]}>
            <DottedLine style={{height : 1, flex: 1,marginLeft:15,alignItems:'center',justifyContent:'center', backgroundColor :'#c8c8c8'}}
                        dottedLineWidth={SCREEN_WIDTH - 30} grayWidth={2} whiteWidth={2}/>
        </View>
    }

    //保存数据赋值
    _edit(editables){
        if(editables===false){//点击保存，赋值并保存
            console.log("公司地址ID是否唯恐"+this.state.selectAreaCode[0]+","+this.state.selectAreaCode[1]);
            console.log("==========1");
            // TODO 有效性检查
            if(this.state.selectAreaCode.length !== 2) {
                Alert.alert('请选择公司地址');
                return;
            }

            if(this.state.industryId === null) {
                Alert.alert('请选择所属行业');
                return;
            }

            if(this.state.corpTypeId === null) {
                Alert.alert('请选择企业类型');
                return;
            }

            let saveObject={"bizLics":	this.state.bizLics,//营业执照
                "bizRange":	this.state.bizRange,//经营范围
                "city"	: this.state.selectAreaCode[0],        //市ID
                "contactName":	this.refs.companyInfoView.state.ContactsName,    //联系人名称
                "contactPhone":	this.refs.companyInfoView.state.ContactsPhone,    //联系人电话
                "corpAddress":	this.state.corpAddress,     //公司地址
                "corpName":	this.refs.companyInfoView.state.companyName,          //公司名称
                "corpType":	this.state.corpTypeId,          //企业类型ID
                "district":	this.state.selectAreaCode[1],          //县或区
                "endDate":	this.state.endDate,//营业期限结束日期
                "idCards":	this.state.idCards,//身份证正反两面(目前只用一张),file组件
                "industry":	this.state.industryId,           //所属行业ID
                "legalEntity":	this.refs.legal.state.content,//法人
                "localTaxId":	this.refs.detail.state.content,//地税登记号
                "nationalTaxId":	this.refs.nation.state.content,//国税登记号
                "regFunds":	this.refs.regfunds.state.content,//注册资金
                "regId":	this.refs.reg.state.content,//注册号
                "startDate":	this.state.startDate,//营业期限开始日期
                "stepId":	this.state.stepId,          //步骤 ID
                "taskId":	this.state.taskId,          //任务ID, 必填
                "unlimited":this.state.unlimited, }       //营业期限不限
            console.log("提交=="+saveObject.regFunds+"???"+saveObject);
            this._postClientData(saveObject);
        }
        console.log("==========2");

        //否则不可更改任务进度
        if(this.refs.ProcessBtnView) {
            console.log("==========3"+editables);
            this.refs.ProcessBtnView.setProcessInfo(editables);
        }
        this.setState({
            editables:editables,
            imgVisibles:false,
        });
    }

    //客户基本信息是否可编辑栏
    renderCompanyTipView(){
        // let allowEditInfo = this.state.detailObj.allowEditInfo;

        if(this.state.loaded===true){
            console.log("输出是否可编辑="+this.state.allowEditInfo+","+this.state.inProgressEdit);

            return  (<View style={[{ height:58, width : SCREEN_WIDTH,backgroundColor:'#FFFFFF',justifyContent:'space-between',flexDirection:'row',alignItems: 'center'}]}>
            <Text style={{fontSize:18,marginLeft:15,marginTop:20,marginBottom:20, textAlign:'left', justifyContent: 'center',color:'#323232'}}>{'客户基本信息'}</Text>

            {this.state.editables === false&&this.state.inProgressEdit===true&&
                <TouchableOpacity onPress={() => {
                    this._edit(true)
                }}
                style={{width:50,height:40,marginRight: 15,justifyContent:'center',alignItems:'flex-end'}}>
                <Image source={require("../../img/editor.png")}/>
                </TouchableOpacity> }
            {this.state.editables === true&&this.state.inProgressEdit===true&&
                <TouchableOpacity onPress={() => {
                    this._edit(false)
                }}style={{width:50,height:40,marginRight:15}}>
                    <View style={{
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
        </View>)}
    }

    // 企业类型选择
    _corpTypePickerClick() {
        console.log('_corpTypePickerClick');
        let loading = SActivityIndicator.show(true, "加载中...");
        this.lastID = null;
        apis.loadDicData().then(
            (responseData) => {
                SActivityIndicator.hide(loading);
                if(responseData !== null && responseData.data !== null
                    && responseData.data.corpType !== null ) {

                    let industryNames = [];
                    responseData.data.corpType.forEach(key => industryNames.push(key.Text) );
                    let corpType = this.state.corpType;

                    let selectedValue = [''];
                    if(corpType !== undefined) {
                        selectedValue = [corpType];
                    }

                    this._showSinglePicker(industryNames, selectedValue,
                        '请选择企业类型', (value) => {
                            this.setState({corpType: value});
                            console.log('选中企业类型' + value);
                            responseData.data.corpType.forEach(key => {
                                if(key.Text == value) {
                                    //Toast.show('选中' + value + ",id=" + key.Id);
                                    this.setState({corpTypeId: key.Id});
                                }
                            } );
                        });
                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("获取失败" , e);
                Toast.show(errorText( e ));
            },
        );
    }

    // 行业选择
    _industryPickerClick() {
        console.log('_industryPickerClick');

        let loading = SActivityIndicator.show(true, "加载中...");
        this.lastID = null;

        apis.loadDicData().then(
            (responseData) => {
                SActivityIndicator.hide(loading);
                if(responseData !== null && responseData.data !== null
                    && responseData.data.industry !== null ) {

                    let industryNames = [];
                    responseData.data.industry.forEach(key => industryNames.push(key.Text) );
                    let industry = this.state.industry;

                    let selectedValue = [''];
                    if(industry !== undefined) {
                        selectedValue = [industry];
                    }

                    this._showSinglePicker(industryNames, selectedValue,
                        '请选择所属行业', (value) => {
                        this.setState({industry: value});
                        responseData.data.industry.forEach(key => {
                            if(key.Text == value) {
                                //Toast.show('选中' + value + ",id=" + key.Id);
                                this.setState({industryId: key.Id});
                            }
                        } );
                    });
                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("获取失败" , e);
                Toast.show(errorText( e ));
            },
        );
    }

    // 显示单列选择框, 参数为类型
    _showSinglePicker(pickerData, selectedValue, title:string,
                      confirmValueCallback:Function) {
        this.setState({
            isPickerOpen : true,
            imgVisibles:false,
        });
        // selectedValue = ['a', 2];
        Picker.init({
            pickerTitleText: title,
            pickerConfirmBtnText: '确认',
            pickerConfirmBtnColor: [0xe5, 0x15 ,0x1d, 1],
            pickerCancelBtnText: '取消',
            pickerCancelBtnColor: [0, 0 ,0, 1],
            pickerBg :  [0xff, 0xff ,0xff, 1],
            pickerData: pickerData,
            selectedValue: selectedValue,
            onPickerCancel: pickedValue => {
                this.setState({
                    isPickerOpen : false,
                });
            },
            onPickerConfirm: (pickedValue, pickedIndex) => {
                    this.setState({
                        isPickerOpen : false,
                    });
                 console.log('Confirm Area', pickedValue[0], pickedIndex);

                let isRefresh = false;

                if (pickedValue.length > 0){

                    for(let i = 0 ; i < pickerData.length ; i++) {
                        let subInfoStr = pickerData[i];
                        console.log('到这里' + subInfoStr + pickedValue[0] + '个数' +  pickerData.length + '相等吗?' + subInfoStr === pickedValue[0]);
                        if (subInfoStr === pickedValue[0]) {
                            isRefresh = true;
                            break;
                        }
                    }

                }

                if (confirmValueCallback && isRefresh == true){
                    confirmValueCallback(pickedValue);
                    console.log('到这里2');

                }

            },
        });
        Picker.show();

    }

    state = {
        isDateTimePickerVisibl: false,
    };

    //隐藏时间选择器
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    //显示时间选择器
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._callbackData(date,false);
        this._hideDateTimePicker();
    };

    //关闭picker弹窗
    closePicker(){
        Picker.hide();
        this.setState({
            isPickerOpen : false,
        });
    }

    renderScroolInfoView(){

    if(this.state.loaded===true){
            console.log( '点击else');
            return(

                <ScrollView style={styles.container}>
                    {Platform.OS === 'android' &&
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />
                    }
                    {this.renderVerifyProcessTipView()}
                    {this.renderVerifyBtnView()}
                    {<View style={[{height: 15}]}></View>}
                    {this.renderCompanyTipView()}
                    {this.renderLineView()}

                    {<View >
                        {this.renderTest()}
                    </View>}
                    {this.renderInput('legal','法人',this.state.detailObj.legalEntity)}

                    <View style={styles.identityCardPhoto}>
                        <Text style={{marginLeft: 15, fontSize: 15, marginTop: 10,color:'#323232',width:85}}>身份证</Text>
                        <TouchableOpacity onPress={() => {
                            this.toAlertModal("reverse")
                        }}
                        activeOpacity={this.state.editables === true ?0.5:1}>
                            {this.state.reImage != null ?
                                <Image source={this.state.reImage} fadeDuration={0} style={{marginTop: 15, height: 75, width: 110}}/> :
                                this.state.detailObj.idCards != null &&this.state.detailObj.idCards.length!=0?
                                    <ImageLoad
                                        style={{ marginTop: 15, height: 75, width: 110 }}
                                        loadingStyle={{ size: 'large', color: 'blue' }}
                                        source={{ uri:this.state.detailObj.idCards[0]+"" }}
                                        placeholderSource={require('../../img/reverse.png')}/> :
                                    <Image source={require('../../img/reverse.png')} style={{marginTop: 15}}/>}

                        </TouchableOpacity>

                        {/*<Image source={require('../../img/obverse.png')} style={{marginLeft:27,marginTop:15,*/}
                        {/*justifyContent:'flex-end'}}/>*/}
                    </View>
                    <View
                        style={{paddingTop: 5, backgroundColor: 'white'}}>
                        {this.renderInput('reg','注册号',this.state.detailObj.regId)}
                    </View>
                    <View
                        style={{paddingTop: 15, backgroundColor: 'white'}}>
                        {this.renderInput('nation','国税登记号',this.state.detailObj.nationalTaxId)}
                    </View>
                    <View
                        style={{paddingTop: 15,paddingBottom:15, backgroundColor: 'white'}}>
                        {this.renderInput('detail','地税登记号',this.state.detailObj.localTaxId)}
                    </View>
                    <SinglePickerView hint={'所属行业'} value={this.state.industry}
                                      onPress={this._industryPickerClick.bind(this)} enable={this.state.editables}/>

                    <SinglePickerView hint={'企业类型'} value={this.state.corpType}
                                      onPress={this._corpTypePickerClick.bind(this)} enable={this.state.editables}/>
                    {this.renderBusinessTimeView()}

                    <View style={{paddingTop: 0, backgroundColor: 'white'}}>
                        {this.renderInput('regfunds','注册资金',this.state.detailObj.regFunds)}
                    </View>
                    {this.renderCompanyAddressView()}
                    {/*公司地址输入框*/}
                    <View style={{height:30,width:SCREEN_WIDTH,paddingTop:5,backgroundColor:'white'}}>
                        <View style={[styles.textInputWrapper,]}>
                            <TextInput underlineColorAndroid='transparent'
                                       value={this.state.corpAddress}
                                       editable={this.state.editables}
                                       style={styles.textInput} placeholder='' returnKeyType='next'
                                       onChangeText={
                                           (legalPerson) => {
                                               this.setState({corpAddress:legalPerson});
                                           }
                                       }/>
                        </View>
                    </View>
                    <View style={{paddingTop: 10,backgroundColor:'white'}}>
                    <TouchableOpacity
                        activeOpacity={this.state.editables===true?0.5:1}
                        onPress={() => { this.toMultiTextInput()}}>
                        <View
                            style={{backgroundColor: 'white', height: 60, marginTop: 10}}>
                            <MultiTextInputView
                                ref="MultiTextInputView"
                                textName={'经营范围'}
                                callback={this._callbackbiz.bind(this)}
                                content={this.state.bizRange}
                                textEditable={this.state.editables}/>
                        </View>
                    </TouchableOpacity>
                    </View>

                    <View style={[styles.identityCardPhoto, {height: 150}]}>
                        <Text style={{marginLeft: 15, fontSize: 15, marginTop: 20,width:85,color:'#323232'}}>经营执照</Text>

                        <TouchableOpacity onPress={() => {
                            this.toAlertModal("blicense")
                        }}
                        activeOpacity={this.state.editables === true ?0.5:1}>
                            {this.state.linImage !== null ?
                                <Image source={this.state.linImage}
                                       fadeDuration={0}
                                       style={{marginTop: 20, height: 75, width: 110}}/> :
                                this.state.detailObj.bizLics !== null && this.state.detailObj.bizLics.length!==0 ?
                                    <ImageLoad
                                        style={{ marginTop: 20, height: 75, width: 110 }}
                                        loadingStyle={{ size: 'large', color: 'blue' }}
                                        source={{ uri:this.state.detailObj.bizLics[0]+"" }}
                                        placeholderSource={require('../../img/blicense.png')}/>  :
                                    <Image source={require('../../img/blicense.png')} style={{marginTop: 20}}/>
                            }

                        </TouchableOpacity>

                    </View>
                </ScrollView>
            );
        }else if(this.state.loaded===null){
        return <View style={{backgroundColor : '#FFFFFF' , flex:1}}></View>

    }else{
            return   <View style={[{flex : 1 , backgroundColor:'#FFFFFF' ,flex : 1}]}>
                <TouchableOpacity onPress={() => {this._loadData()}}>
                    <NoMessage
                        textContent='网络错误,点击重新开始'
                        active={require('../../img/network_error.png')}/>
                </TouchableOpacity>
            </View>
        }
    }

    render() {
        return(
                <View style={styles.container}>
                    {/*无网显示页面*/}
                    <NoNetEmptyView onClick={() => {this._loadData()}} />
                    {/*选择框遮罩*/}
                    <TouchableOpacity style={[styles.menuTouch, {zIndex: this.state.isPickerOpen ? 10 : -1}]}
                                      onPress={() => {
                                          this.closePicker()
                                      }}>
                        <View style={[styles.menuShadow, {
                            zIndex: this.state.isPickerOpen ? 10 : -1,
                            backgroundColor: this.state.isPickerOpen ? 'black' : 'white'
                        },]}/>
                    </TouchableOpacity>
                    {/*选择图片弹框*/}
                    {this.state.imgVisibles === true &&
                    <AlertPhotoModal
                        callback={this._callbackPhoto.bind(this)}/>}
                        {/*iOS时间选择器*/}
                    {this.state.isDateTimePickerVisible === true &&
                    <DataTimerView
                        callback={this._callbackData.bind(this)}/>
                    }

                    {this.renderScroolInfoView()}
                </View>
        )
    }

    //经营范围跳转
    toMultiTextInput(){
        if(this.state.editables === false ){
            return;
        }
            //canClickBtn防重复点击
        console.log("canClickBtn="+this.state.canClickBtn);
        if (this.state.canClickBtn === false){
            return;
        }
        this.state.canClickBtn = false;
        this.timer = setTimeout(async()=>{
            await this.setState({canClickBtn:true})//1.5秒后可点击
        },1000)

        this.props.navigator.push({
            screen: 'MultiTextInputPage',
            backButtonTitle: '返回', // 返回按钮的文字 (可选)
            backButtonHidden: false, // 是否隐藏返回按钮 (可选)
            title:'经营范围',
            passProps: {
                bizRange:this.state.bizRange,
                //回调!
                callback: this._bizRanageContent,
            }
        });
    }

    //经营范围回调
    _bizRanageContent(bizRange){

        if(bizRange!=null){
            console.log("返回经营范围="+bizRange);
            this.setState({
                bizRange: bizRange
            })

            if(this.refs.MultiTextInputView) {
                this.refs.MultiTextInputView.setBiz(bizRange);
            }
        }

    }
}