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
    KeyboardAvoidingView, TouchableWithoutFeedback, __DEV__
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
import InternetStatusView from '../modules/react-native-internet-status-view';

export default class LoginPage extends Component {
    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
    };

    constructor(props) {
        super(props);

        this.state = {
            mobile: '',     // 手机号
            mobileValid: false,   // 手机号有效
            smsCode: '',         // 短信验证码
            smsCodeValid: false,          // 短信验证码有效
            acceptLic: false,// 同意许可协议
        };

        this._doLogin = this._doLogin.bind(this);
    }

    //debug only
    _setupDebug() {
        this.setState({
            mobile: '18211137768',     // 手机号
            mobileValid: true,   // 手机号有效
            smsCode: '888888',         // 短信验证码
            smsCodeValid: true,        // 短信验证码有效
            acceptLic: true
        });
    }

    // 返回
    pop() {
        if (this.props.navigator) {
            this.props.navigator.pop();
        }
    }

    // 返回左边按钮
    renderLeftItem() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.pop()
                }}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={{uri: 'back'}} style={styles.navBarLeftItemStyle}/>
                    <Text>返回</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // 准备加载组件
    componentWillMount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', true);
        this._setupDebug();
    }

    // 准备销毁组件
    componentWillUnmount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', false);
    }

    // 请求验证码
    _requestSMSCode(shouldStartCountting) {
        if (this.state.mobileValid) {
            Toast.show('TODO 请求验证码');
        }
    }

    _doLogin() {
        if (!(this.state.mobileValid && this.state.acceptLic && this.state.smsCodeValid)) {
            // Toast.show('请输入正确的手机号, 验证码并同意许可协议.');
            return;
        }
        let loading = SActivityIndicator.show(true, "登录中");

        apis.login(this.state.mobile, this.state.smsCode).then(
            (responseData) => {
                SActivityIndicator.hide(loading);
                console.log("登录成功返回:", responseData);
                Toast.show('登录成功返回' + responseData.data.name + "token="
                    + responseData.data.token);
                if (responseData !== null && responseData.data !== null && responseData.data.token) {
                    UserInfoStore.setUserToken(responseData.data.token).then(
                        v => {
                            // this.readUserInfo();
                            // 到载入页
                            navToBootstrap();
                        },
                        e => console.log(e.message)
                    );
                }
            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("登录错误返回22:", e);
                Toast.show('登录错误返回22' + JSON.stringify(e));
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
                    <InternetStatusView
                        textToDisplay="未检测到网络连接，请确保WIFI或移动网络正常可用。"
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'stretch',
                            backgroundColor: '#00000088',
                            marginTop: px2dp(50),
                            height: 25
                        }}
                    />

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
                        <View style={styles.textInputContainer}>
                            <Image
                                source={ require('../img/icon_123.png') }
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

                                <Image        style={{width: 70, marginRight: 0, height: 44, alignSelf: 'flex-end',}}        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}      />

                            </View>
                        </View>

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
                                             timerCount={60}
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