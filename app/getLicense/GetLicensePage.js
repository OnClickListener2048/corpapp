/**
 * 领取执照
 * Created by jiaxueting on 2017/6/16.
 */

import React, { Component,PropTypes,} from 'react';
import Picker from 'react-native-picker';

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
import SinglePickerView from "./view/SinglePickerView";
import Toast from 'react-native-root-toast';
import ImageLoad from "../view/ImageLoad";
import WatchImageModal from "./view/WatchImageModal";

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
            visible: this.props.visible,//是否显示大图
            imgVisibles:this.props.imgVisibles,//是否显示选择图片弹窗
            reImage: null,
            linImage:null,
            photoType:null,
            dateType:null,
            isDateTimePickerVisible:this.props.isDateTimePickerVisible,
            detailObj:{},
            loaded:false,
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
        console.log('ApplicationCenterPage event.type', event.type);
        if(event.id==='willAppear'){
            this.state.canClickBtn = true;
        }
    }


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
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    _loadAreaData(resolve) {

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
                Toast.show('提交成功');
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
            return <CompanyInfoView
                ref="companyInfoView"
                companyName={this.state.detailObj.corpName}
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

        return <VerifyProcessTipView ref="verifyProcessTipView" currentNum={this.state.detailObj.progress.finished === 'true' ? 2 : this.state.detailObj.progress.materialConfirm === 'true' ? 1 : 0}/>
    }

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

    renderBusinessTimeView() {

            return <BusinessTimeView
                callback={this._toMyDataTimer.bind(this)}
                callbackAll={this._unlimit.bind(this)}
                firstDate={this.state.startDate}
                lastDate={this.state.endDate}
                isFocus={this.state.editables}
                allTimePressBtnSelected={this.state.unlimited}/>
    }


    _showAreaPicker() {
        this.setState({
            isPickerOpen : true,
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


    _addressBtnClick(){
        if (this.state.loadedArea){
            this._showAreaPicker();
            return;
        }else {
            this._loadAreaData();
        }
    }


    renderCompanyAddressView(){
        return   <CompanyAddressView
            isFouces={this.state.editables}
            ref="companyAddressView" city={'市'} district={'区'} callback={this._addressBtnClick.bind(this)}/>
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
        this.setState({isDateTimePickerVisible:false,
            photoType:photoType});
        console.log("photoType="+photoType+this.state.visible);
        this._watchImVisible(photoType);
    }

    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible,
            photoType:props.photoType,
            imgVisibles:props.imgVisibles,
            isPickerOpen:props.isPickerOpen,
        });
    }

    _callbackWatchPhoto(){
        this.setState({
            imgVisibles: false,
            visible:false,
        });
    }

    _callbackPhoto(image,imgVisibles) {//获取图片
        console.log("callback="+image);
        if(image===null){
            console.log("callback=1"+image);
            this.setState({
                imgVisibles:false,
                visible:false,
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

        }
        this.setState({
            imgVisibles:imgVisibles,
            visible:!imgVisibles
        })
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

        return      <View style={[{backgroundColor:'white',width : SCREEN_WIDTH,paddingLeft:15,paddingRight:15, height : 1}]}>
            <DottedLine style={{height : 1, flex: 1,marginLeft:15,alignItems:'center',justifyContent:'center', backgroundColor :'#c8c8c8'}}
                        dottedLineWidth={SCREEN_WIDTH - 30} grayWidth={2} whiteWidth={2}/>
        </View>
    }

    _edit(editables){
        if(editables===false){//点击保存，赋值并保存
            console.log("公司地址ID是否唯恐"+this.state.selectAreaCode[0]+","+this.state.selectAreaCode[1]);
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
                "contactName":	this.state.contactName,    //联系人名称
                "contactPhone":	this.state.contactPhone,    //联系人电话
                "corpAddress":	this.state.corpAddress,     //公司地址
                "corpName":	this.state.corpName,          //公司名称
                "corpType":	this.state.corpTypeId,          //企业类型ID
                "district":	this.state.selectAreaCode[1],          //县或区
                "endDate":	this.state.endDate,//营业期限结束日期
                "idCards":	this.state.idCards,//身份证正反两面(目前只用一张),file组件
                "industry":	this.state.industryId,           //所属行业ID
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
        //否则不可更改任务进度
        if(this.refs.ProcessBtnView) {
            console.log("获取是否现实了保存按钮11"+editables);
            this.refs.ProcessBtnView.setProcessInfo(editables);
        }
        this.setState({
            editables:editables,
            visible:false,
            imgVisibles:false,
        });
    }

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
                <Image source={require("../img/editor.png")}/>
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
                Toast.show('获取失败' + JSON.stringify(e));
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
                Toast.show('获取失败' + JSON.stringify(e));
            },
        );
    }

    // 显示单列选择框, 参数为类型
    _showSinglePicker(pickerData, selectedValue, title:string,
                      confirmValueCallback:Function) {
        this.setState({
            isPickerOpen : true,
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
                console.log('Confirm Area', pickedValue, pickedIndex);
                if(confirmValueCallback) {
                    confirmValueCallback(pickedValue);
                }
            },
        });
        Picker.show();

    }

    state = {
        isDateTimePickerVisibl: false,
    };

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._callbackData(date,false);
        this._hideDateTimePicker();
    };

    closePicker(){
        Picker.hide();
        this.setState({
            isPickerOpen : false,
        });
    }

    androidClosePicker= () =>{
        console.log("关闭弹窗c");
        if(this.state.isPickerOpen){
            console.log("关闭弹窗");
            this.setState({
                isPickerOpen : false,
            });
            return false;
        }else{
            console.log("关闭页面");
            return true;
        }

    }

    render() {
        return(
        <View style={styles.container}>
            <TouchableOpacity style={[styles.menuTouch,{zIndex: this.state.isPickerOpen?10:-1}]} onPress={() => {
                this.closePicker()
            }}>
                <View style={[styles.menuShadow,{zIndex: this.state.isPickerOpen?10:-1},]}/>
            </TouchableOpacity>
            {this.state.imgVisibles === true &&
            <AlertPhotoModal
                callback={this._callbackPhoto.bind(this)}/>}
            {this.state.visible === true &&
            <WatchImageModal
                visible={true}
                imageUrl={this.state.photoType=="reverse"?this.state.detailObj.idCards:this.state.detailObj.bizLics}
                imageFile={this.state.photoType=="reverse"?(this.state.idCards===null?null:this.state.idCards.uri):(this.state.bizLics===null?null:this.state.bizLics.uri)}
                callback={this._callbackWatchPhoto.bind(this)}
                callbackfile={this._callbackPhoto.bind(this)}/>}
            {this.state.isDateTimePickerVisible === true &&
                <DataTimerView
                callback={this._callbackData.bind(this)}/>
            }
            {this.state.loaded === true &&
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
                                this.state.detailObj.idCards != null &&this.state.detailObj.idCards.length!=0?
                                    <ImageLoad
                                        style={{ marginTop: 15, height: 75, width: 110 }}
                                        loadingStyle={{ size: 'large', color: 'blue' }}
                                        source={{ uri:this.state.detailObj.idCards[0]+"" }}
                                        placeholderSource={require('../img/reverse.png')}/> :
                                    <Image source={require('../img/reverse.png')} style={{marginTop: 15}}/>}

                        </TouchableOpacity> :
                        <View>
                            {this.state.reImage != null ?
                                <Image source={this.state.reImage} style={{marginTop: 15, height: 75, width: 110}}/> :
                                this.state.detailObj.idCards != null&&this.state.detailObj.idCards.length!=0 ?
                                    <ImageLoad
                                        style={{ marginTop: 15, height: 75, width: 110 }}
                                        loadingStyle={{ size: 'large', color: 'blue' }}
                                        source={{ uri:this.state.detailObj.idCards[0]+"" }}
                                        placeholderSource={require('../img/reverse.png')}
                                    />:
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
                style={{paddingTop: 15,paddingBottom:15, backgroundColor: 'white'}}>
                <TextInputView
                textName={'地税登记号：'}
                inputWidth={{width: 93}}
                winWidth={{width: SCREEN_WIDTH - 130}}
                callback={this._callbackdetail.bind(this)}
                content={this.state.detailObj.localTaxId}
                textEditable={this.state.editables}/>
                </View>

                <SinglePickerView hint={'所属行业：'} value={this.state.industry}
                                  onPress={this._industryPickerClick.bind(this)} enable={this.state.editables}/>

                <SinglePickerView hint={'企业类型：'} value={this.state.corpType}
                                  onPress={this._corpTypePickerClick.bind(this)} enable={this.state.editables}/>

                {this.renderBusinessTimeView()}

                <View style={{paddingTop: 0, backgroundColor: 'white'}}>
                <TextInputView
                textName={'注册资金：'}
                inputWidth={{width: 80}}
                winWidth={{width: SCREEN_WIDTH - 115}}
                callback={this._callbackregFunds.bind(this)}
                content={this.state.detailObj.regFunds}
                textEditable={this.state.editables}/>
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
                    {this.state.editables === true ?
                        <TouchableOpacity onPress={() => {
                            this.toMultiTextInput()
                        }}>

                            <View
                                style={{backgroundColor: 'white', height: 60, marginTop: 10}}>
                                <MultiTextInputView
                                    ref="MultiTextInputView"
                                    textName={'经营范围：'}
                                    inputWidth={{width: 80}}
                                    winWidth={{width: SCREEN_WIDTH - 115}}
                                    callback={this._callbackbiz.bind(this)}
                                    content={this.state.bizRange}
                                    textEditable={this.state.editables}/>
                            </View>
                        </TouchableOpacity> :
                        <View
                            style={{backgroundColor: 'white', height: 60, marginTop: 10}}>
                            <MultiTextInputView
                                ref="MultiTextInputView"
                                textName={'经营范围：'}
                                inputWidth={{width: 80}}
                                winWidth={{width: SCREEN_WIDTH - 115}}
                                callback={this._callbackbiz.bind(this)}
                                content={this.state.bizRange}
                                textEditable={this.state.editables}/>
                        </View> }

                </View>

                <View style={[styles.identityCardPhoto, {height: 150}]}>
                        <Text style={{marginLeft: 20, fontSize: 15, marginTop: 20}}>经营执照：</Text>

                        {this.state.editables === true ?
                        <TouchableOpacity onPress={() => {
                            this.toAlertModal("blicense")
                        }}>
                            {this.state.linImage !== null ?
                                <Image source={this.state.linImage} style={{marginTop: 20, height: 75, width: 110}}/> :
                                this.state.detailObj.bizLics !== null && this.state.detailObj.bizLics.length!==0 ?
                                    <ImageLoad
                                        style={{ marginTop: 20, height: 75, width: 110 }}
                                        loadingStyle={{ size: 'large', color: 'blue' }}
                                        source={{ uri:this.state.detailObj.bizLics[0]+"" }}
                                        placeholderSource={require('../img/blicense.png')}/>  :
                                    <Image source={require('../img/blicense.png')} style={{marginTop: 20}}/>
                            }

                        </TouchableOpacity> :
                        <View>
                            {this.state.linImage !== null ?
                                <Image source={this.state.linImage} style={{marginTop: 20, height: 75, width: 110}}/> :
                                this.state.detailObj.bizLics !== null && this.state.detailObj.bizLics.length!=0?
                                    <ImageLoad
                                        style={{ marginTop: 20, height: 75, width: 110 }}
                                        loadingStyle={{ size: 'large', color: 'blue' }}
                                        source={{ uri:this.state.detailObj.bizLics[0]+"" }}
                                        // source={{ uri:"https://qd.pilipa.cnhttp://pilipa.oss-cn-beijing.aliyuncs.com/FileUploads/Order/BusinessLicense/201701/BodyPart_80417919-391c-4575-a65b-3c22153a5ae7.jpg" }}
                                        placeholderSource={require('../img/blicense.png')}/>  :
                                    <Image source={require('../img/blicense.png')} style={{marginTop: 20}}/>
                            }

                        </View>
                    }

                </View>
                </ScrollView>
            }
        </View>
        );
    }

    toMultiTextInput(){
        console.log("canClickBtn="+this.state.canClickBtn);
        if (this.state.canClickBtn === false){
            return;
        }

        this.state.canClickBtn = false;

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