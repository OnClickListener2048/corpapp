/**
 * 登陆界面
 * Created by beansoft on 2017/5/19.
 */

import React, {Component} from 'react';
import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    DeviceEventEmitter, TouchableOpacity,
    KeyboardAvoidingView, TouchableWithoutFeedback,
    InteractionManager
} from 'react-native';
// import ProgressiveInput from 'react-native-progressive-input';
import ProgressiveInput from '../view/ClearFocusEdit';
// 引入外部文件
import CommunalNavBar from '../main/GDCommunalNavBar';
import TimerButton from "../view/TimerButton";
import commonStyles from '../css/styles';
import styles from './css/LoginPageStyle';
import px2dp from '../util'
import Toast from 'react-native-root-toast';
const dismissKeyboard = require('dismissKeyboard');     // 获取键盘回收方法
import SActivityIndicator from '../modules/react-native-sww-activity-indicator';
import * as apis from '../apis';
import {navToBootstrap, navToMainTab} from '../navigation';
// import InternetStatusView from '../modules/react-native-internet-status-view';
import {DEBUG} from '../config';

export default class LoginPage extends Component {
    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 隐藏默认的底部Tab栏
    };

    constructor(props) {
        super(props);

        this.state = {
            mobile: '',     // 手机号
            mobileValid: false,   // 手机号有效
            smsCode: '',         // 短信验证码
            smsCodeValid: false,          // 短信验证码有效
            acceptLic: false,// 同意许可协议
            picURLStr: '',// 图片验证码原始地址
            picURL: {uri: 'https://x-crm.i-counting.cn/app/v0/user/vcode/get'} ,// 图片验证码地址
            verifyText: '',// 图片验证码提示语
            vCode: '',         // 图片验证码
            vCodeInputValid: false,          // 图片验证码输入有效
            vCodeServerValid: true,          // 图片验证码服务端有效
        };

        this._doLogin = this._doLogin.bind(this);
        this._requestSMSCode = this._requestSMSCode.bind(this);
        this._verifyVCode = this._verifyVCode.bind(this);
    }

    //debug only
    _setupDebug() {
        this.setState({
            mobile: '18513417295',     // 手机号
            mobileValid: true,   // 手机号有效
            smsCode: '888888',         // 短信验证码
            smsCodeValid: true,        // 短信验证码有效
            acceptLic: true,
            vCode: 'E69M',         // 图片验证码
            vCodeInputValid: false,          // 图片验证码有效
        });
    }

    // 返回
    pop() {
        if (this.props.navigator) {
            this.props.navigator.pop();
        }
    }

    // 准备加载组件
    componentWillMount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', true);
        if(DEBUG) {
            // this._setupDebug();
        }
    }

    // 准备销毁组件
    componentWillUnmount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', false);
    }

    // 请求短信验证码
    _requestSMSCode(shouldStartCountting) {
        console.log('_requestSMSCode');
        if (this.state.mobileValid) {
            apis.sendVerifyCode(this.state.mobile, this.state.vCodeInputValid ? this.state.vCode : null).then(
                (responseData) => {
                    Toast.show('短信验证码已发送');
                    Alert.alert('测试环境短信验证码:' + responseData.msg);
                }, (e) => {
                    console.log("短信验证码获取失败" + JSON.stringify(e));
                    let msg = e.msg;
                    if(msg !== null) {
                        Alert.alert(msg);
                    } else {
                        Alert.alert('短信验证码获取失败:' + JSON.stringify(e));
                    }
                    if( e.data !== undefined) {
                        let {verifyText, verify} = e.data;
                        if(verify !== null && verify.length > 0) {
                            let picStr = "https://" + verify + "?phone=" + this.state.mobile + "&t=" + new Date().getTime();
                            console.log('***** 请求图片', picStr);
                            let picURL = {uri: picStr};
                            this.setState({picURL});
                            let picURLStr = verify;
                            this.setState({picURLStr});
                        }

                        if(verifyText !== null && verifyText.length > 0) {
                            this.setState({vCodeServerValid: false});
                            this.setState({verifyText});
                        }

                    }

                }
            );
        }
    }

    // 验证图形码
    _verifyVCode() {
        console.log('_verifyVCode');
        if (this.state.mobileValid) {
            apis.sendVerifyVCode(this.state.mobile, this.state.vCodeInputValid ? this.state.vCode : null).then(
                (responseData) => {
                    Toast.show('图形验证码已验证');
                    this.setState({vCodeServerValid: true});
                    this.setState({verifyText : null});
                    // 重置允许获取验证码
                    if (this.refs.timerButton.state.counting) {
                        this.refs.timerButton.reset();
                    }
                }, (e) => {
                    console.log('_verifyVCode error:' + e.message);
                    let msg = e.msg;
                    if(msg === undefined) {
                        msg = e.message;
                    }

                    if(msg !== undefined) {
                        Alert.alert(msg, '');
                    } else {
                        Alert.alert('图形验证码校验失败:' + e);
                    }

                    // 刷新验证码
                    let picURLStr = this.state.picURLStr;
                    if(picURLStr !== null && picURLStr.length > 0) {
                        let picStr = "https://" + picURLStr + "?phone=" + this.state.mobile + "&t=" + new Date().getTime();
                        console.log('***** 请求图片', picStr);
                        let picURL = {uri: picStr};
                        this.setState({picURL});
                    }
                }
            );
        }
    }

    _doLogin() {
        if (!(this.state.mobileValid && this.state.acceptLic && this.state.smsCodeValid && this.state.vCodeServerValid)) {
            // Toast.show('请输入正确的手机号, 验证码并同意许可协议.');
            return;
        }
        let loading = SActivityIndicator.show(true, "登录中");

        apis.login(this.state.mobile, this.state.smsCode).then(
            (responseData) => {
                SActivityIndicator.hide(loading);
                console.log("登录成功返回:", responseData);
                if (responseData !== null && responseData.data !== null && responseData.data.token) {
                    UserInfoStore.setUserToken(responseData.data.token).then(
                        v => {
                            // this.readUserInfo();
                            // 到载入页
                            InteractionManager.runAfterInteractions(() => {
                                navToBootstrap();
                            });
                        },
                        e => console.log(e.message)
                    );
                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("登录错误返回:", e);
                Toast.show('登录错误返回:' + JSON.stringify(e));
                let errMsg = e.msg;
                if (errMsg === undefined) {
                    errMsg = '请输入正确的验证码或手机号码';
                }
                Alert.alert(errMsg, '',
                    [
                        {
                            text: '确定',
                            onPress: () => {
                            },
                        },]
                    , {cancelable: false});
            },
        );
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <Image source={require('../img/bg.png')} style={commonStyles.fullScreen}>
                    {/* 导航栏 */}
                    {/*<CommunalNavBar*/}
                    {/*leftItem={() => this.renderLeftItem()}*/}
                    {/*titleItem={() => this.renderTitleItem()}*/}
                    {/*/>*/}

                    {/*<InternetStatusView*/}
                        {/*textToDisplay="未检测到网络连接，请确保WIFI或移动网络正常可用。"*/}
                        {/*style={{*/}
                            {/*justifyContent: 'center',*/}
                            {/*alignSelf: 'stretch',*/}
                            {/*backgroundColor: '#00000088',*/}
                            {/*marginTop: px2dp(50),*/}
                            {/*height: 25*/}
                        {/*}}*/}
                    {/*/>*/}

                    <Image source={require('../img/logo_white.png')} style={styles.bzLogo}/>
                    <View style={{height: px2dp(100),}}/>
                    <KeyboardAvoidingView behavior='padding' style={[styles.containerKeyboard,
                        {backgroundColor: 'white'}]}
                                          keyboardVerticalOffset={10}>
                        <View style={{height: 40,}}/>
                        {/*   手机号 */}
                        <View style={styles.textInputContainer}>
                            <Image source={ this.state.mobileValid ? require('../img/account_red.png') :
                                require('../img/account.png')} style={styles.inputLogo}/>
                            <View style={styles.textInputWrapper}>
                                <TextInput underlineColorAndroid='transparent' maxLength={11}
                                           keyboardType='numeric' value={this.state.mobile}
                                           style={styles.textInput} placeholder='手机号码' returnKeyType='next'
                                           onChangeText={
                                               (mobile) => {
                                                   // 如果手机号改了, 马上就重置获取验证码?
                                                   if (this.refs.timerButton.state.counting) {
                                                       this.refs.timerButton.reset();
                                                   }
                                                   let mobileValid = mobile.length > 0 && (mobile.match(/^([0-9]{11})?$/)) !== null;
                                                   this.setState({mobile, mobileValid});
                                               }
                                           }/>
                            </View>
                        </View>
                        {/*  图片验证码 */}
                        {this.state.verifyText !== null && this.state.verifyText.length > 0 &&

                        <View style={styles.textInputContainer}>
                            <Image
                                source={ require('../img/icon_123.png') }
                                style={styles.inputLogo}/>
                            <View style={styles.textInputWrapper}>
                                <TextInput underlineColorAndroid='transparent'
                                           value={this.state.vCode}
                                           secureTextEntry={false} maxLength={4} keyboardType='default'
                                           style={styles.codeInput} placeholder={this.state.verifyText}
                                           returnKeyType='done'
                                           onChangeText={(vCode) => {
                                               this.setState({vCode})
                                               let vCodeInputValid = (vCode.length == 4);
                                               this.setState({vCode, vCodeInputValid});
                                           }}

                                           onBlur={() => {
                                               dismissKeyboard();
                                               this._verifyVCode();
                                           }}

                                           onSubmitEditing={() => {
                                               dismissKeyboard();
                                               this._verifyVCode();
                                           }}
                                />

                                <Image  style={{width: 69, marginRight: 0, height: 34, alignSelf: 'center',}}
                                              source={this.state.picURL}      />

                            </View>
                        </View>
                        }

                        {/*  验证码 */}
                        <View style={styles.textInputContainer}>
                            <Image
                                source={ this.state.smsCodeValid ? require('../img/d123_red.png') :
                                    require('../img/d123.png')}
                                style={styles.inputLogo}/>
                            <View style={styles.textInputWrapper}>
                                <TextInput underlineColorAndroid='transparent'
                                           value={this.state.smsCode}
                                           secureTextEntry={false} maxLength={6} keyboardType='numeric'
                                           style={styles.codeInput} placeholder='短信验证码'
                                           returnKeyType='done'
                                           onChangeText={(smsCode) => {
                                               this.setState({smsCode})
                                               let smsCodeValid = (smsCode.length == 6);
                                               this.setState({smsCode, smsCodeValid});
                                           }}

                                           onSubmitEditing={() => {
                                               dismissKeyboard();
                                           }}
                                />

                                <View style={{
                                    height: 15,
                                    width: 1,
                                    backgroundColor: '#c8c8c8',
                                    alignSelf: 'center',
                                    marginRight: 1
                                }}/>

                                <TimerButton enable={this.state.mobileValid}
                                             ref="timerButton"
                                             style={{width: 70, marginRight: 0, height: 44, alignSelf: 'flex-end',}}
                                             textStyle={{color: '#ef0c35', alignSelf: 'flex-end'}}
                                             timerCount={80}
                                             onClick={(shouldStartCountting) => {
                                                 shouldStartCountting(true);
                                                 this._requestSMSCode(shouldStartCountting);
                                             }}/>
                            </View>
                        </View>

                        {/*  协议 */}
                        <View style={[styles.textInputContainer,
                            {marginTop: -2}]}>
                            <TouchableOpacity
                                style={{alignSelf: 'center'}} onPress={ () => {
                                let _acceptLic = !this.state.acceptLic;
                                console.log('_acceptLic', _acceptLic);
                                this.setState({acceptLic: _acceptLic});
                            }}>
                                <Image
                                    source={ this.state.acceptLic ? require('../img/choose_red.png') :
                                        require('../img/choose.png')}
                                    style={styles.inputLogo}/>
                            </TouchableOpacity>
                            <View style={[styles.textInputWrapper,
                                {justifyContent: 'flex-start', borderBottomWidth: 0}]}>
                                <Text style={{
                                    color: ( this.state.acceptLic ? '#ef0c35' : '#c8c8c8'),
                                    alignSelf: 'center',
                                    marginRight: 1,
                                    fontSize: 12
                                }}
                                >我已经阅读并同意</Text>
                                <Text style={{
                                    color: ( this.state.acceptLic ? '#ef0c35' : '#c8c8c8'),
                                    fontSize: 12,
                                    alignSelf: 'center',
                                    textDecorationLine: 'underline',
                                    marginRight: 1
                                }}
                                >《XXXX协议》</Text>
                            </View>

                        </View>

                        <TouchableWithoutFeedback onPress={this._doLogin}>
                            <View style={[styles.buttonview,
                                {
                                    backgroundColor: (
                                        (this.state.mobileValid && this.state.acceptLic && this.state.smsCodeValid  ) ? '#ef0c35' : '#e6e6e6')
                                }]}>
                                <Text style={styles.logintext}>登录</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </KeyboardAvoidingView>


                </Image>
            </TouchableWithoutFeedback>
        );
    }
}


// AppRegistry.registerComponent('ReactDemo', () => ReactDemo);