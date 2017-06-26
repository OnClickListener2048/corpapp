/**
 修改手机号
 */
import React, {Component}from 'react';

import {
    Alert,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback, TextInput,
}from 'react-native';
import px2dp from '../../util/index'
import {navToBootstrap, navToMainTab} from '../../navigation';
import Toast from 'react-native-root-toast';
import {SCREEN_WIDTH as width, SCREEN_HEIGHT as height} from '../../config';
const dismissKeyboard = require('dismissKeyboard');     // 获取键盘回收方法
import SActivityIndicator from '../../modules/react-native-sww-activity-indicator';
import * as apis from '../../apis/setting';
import TimerButton from "../../view/TimerButton";
import settingStyles from './css/SettingsPageStyle';

export default class Settings extends Component {
    static navigatorStyle = {
        tabBarHidden: true, // 隐藏默认的顶部导航栏
        navBarHidden: false, // 隐藏默认的顶部导航栏
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: '-',     // 用户名
            phone: '', //手机号
            newMobile: '',     // 新手机号
            newMobileValid: false,   // 手机号有效
            smsCode: '88888',         // 短信验证码
            oldSmsCodeValid: false,        // 短信验证码有效
            bindNewMobile: false, // 是否绑定手机号的第二阶段
            newSmsCodeValid: false,        // 短信验证码有效
            submitButtonText: '更换手机号码', // 提交按钮的文本
        };
    }

    componentWillMount() {
        UserInfoStore.getUserInfo().then(
            (user) => {
                if (user !== null) {
                    this.setState({userName: user.name, phone: user.phone});
                }
            },
            (e) => {
                console.log("读取信息错误:", e);
            },
        );
    }

    componentWillUnmount() {
        console.log("Settings.js componentWillUnmount()");
        this.refs.timerButton.reset();
    }

    render() {
        return (
            <View style={styles.container}>

                {/*   旧手机号*/}
                {!this.state.bindNewMobile &&
                <View style={[styles.textInputContainer,
                    {marginTop: px2dp(20)}]}>
                    <Text style={styles.nameTextStyle}>
                        当前绑定手机号码:
                    </Text>
                    <Text style={[styles.nameTextStyle,
                        {marginLeft: 5}]}>
                        {this.state.phone}
                    </Text>
                </View>
                }

                {/*   手机号 */}
                {this.state.bindNewMobile &&
                <View style={styles.textInputContainer}>
                    <Image source={require('../../img/account_red.png')} style={settingStyles.inputLogo}/>
                    <View style={settingStyles.textInputWrapper}>
                        <TextInput underlineColorAndroid='transparent' maxLength={11}
                                   keyboardType='numeric' value={this.state.newMobile}
                                   style={settingStyles.textInput} placeholder='新手机号码' returnKeyType='next'
                                   onChangeText={
                                       (newMobile) => {
                                           // 如果手机号改了, 马上就重置获取验证码?
                                           if (this.refs.timerButton.state.counting) {
                                               this.refs.timerButton.reset();
                                           }
                                           let newMobileValid = newMobile.length > 0 && (newMobile.match(/^([0-9]{11})?$/)) !== null;
                                           this.setState({newMobile, newMobileValid});
                                       }
                                   }/>
                    </View>
                </View>
                }


                {/*  验证码 */}
                <View style={styles.textInputContainer}>
                    <Image
                        source={ this.state.smsCodeValid ? require('../../img/d123_red.png') :
                            require('../../img/d123.png')}
                        style={settingStyles.inputLogo}/>
                    <View style={settingStyles.textInputWrapper}>
                        <TextInput underlineColorAndroid='transparent'
                                   value={this.state.smsCode}
                                   secureTextEntry={false} maxLength={6} keyboardType='numeric'
                                   style={settingStyles.codeInput} placeholder='短信验证码'
                                   returnKeyType='done'
                                   onChangeText={(smsCode) => {
                                           this.setState({smsCode})
                                           let oldSmsCodeValid = (smsCode.length == 6);
                                           let newSmsCodeValid = oldSmsCodeValid;
                                           this.setState({smsCode});
                                           this.state.bindNewMobile ?
                                               this.setState({newSmsCodeValid}) :
                                               this.setState({oldSmsCodeValid});
                                       }
                                   }

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

                        <TimerButton enable={!this.state.oldSmsCodeValid || this.state.newMobileValid }
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


                <TouchableWithoutFeedback onPress={() => {
                    this._doSubmit()
                }}>
                    <View style={[styles.buttonView,
                        {
                            backgroundColor: (
                                (this.state.oldSmsCodeValid || (this.state.newSmsCodeValid && this.state.newMobileValid ) ) ? '#ef0c35' : '#e6e6e6')
                        }]}>
                        <Text style={styles.submitButtonText}>{this.state.submitButtonText}</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }

    // 请求验证码
    _requestSMSCode(shouldStartCountting) {
        if (!this.state.oldSmsCodeValid || this.state.newMobileValid) {
            shouldStartCountting(true);
            apis.sendVerifyCode(this.state.phone).then(
                (responseData) => {
                    Toast.show('短信验证码已发送');
                }, (e) => {
                    Toast.show('短信验证码获取失败:' + JSON.stringify(e));
                }
                );
        }
    }

    _doSubmit() {
        let loading = SActivityIndicator.show(true, "提交反馈中");

        if (this.state.bindNewMobile) {
            // 执行最后的绑定操作
            apis.editPhoneBind(this.state.newMobile, this.state.smsCode).then(
                (responseData) => {
                    SActivityIndicator.hide(loading);
                    Alert.alert('您的手机号码已更换成功\n需重新登录', '',
                        [
                            {
                                text: '确定',
                                onPress: () => {
                                    navToBootstrap({isReset: true});
                                },
                            },]
                        , {cancelable: false});

                },
                (e) => {
                    SActivityIndicator.hide(loading);
                    console.log("短信验证码校验失败:", e);
                    Toast.show('短信验证码校验失败:' + JSON.stringify(e));
                    Alert.alert('绑定失败', e.msg,
                        [
                            {
                                text: '确定',
                                onPress: () => {
                                },
                            },]
                        , {cancelable: false});
                },
            );
        } else {
            // 校验第一步的短信验证码
            apis.editPhoneEdit(this.state.smsCode).then(
                (responseData) => {
                    SActivityIndicator.hide(loading);
                    this.setState({
                        bindNewMobile: true, smsCode: '',
                        oldSmsCodeValid: false, newSmsCodeValid: false, submitButtonText: '绑定'
                    });

                },
                (e) => {
                    SActivityIndicator.hide(loading);
                    console.log("短信验证码校验失败:", e);
                    Toast.show('短信验证码校验失败:' + JSON.stringify(e));
                    Alert.alert('短信验证码校验失败', '',
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
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F9FF',
        flex: 1,
    },

    inputArea: {
        height: px2dp(352),
        width: width,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 15,
        alignItems: 'center'
    },

    lineView: {
        // height: px2dp(100),
        width: width,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center'
    },

    divider: {
        backgroundColor: '#dedede',
        marginLeft: 0,
        marginRight: 0,
        height: 0.5,
    },

    nameTextStyle: {
        fontSize: 15,
        color: '#323232',
        textAlign: 'left',
        marginLeft: 0,
    },

    buttonView: {
        margin: 0,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        height: px2dp(88),
        width: px2dp(500),
        marginTop: px2dp(100),
    },
    submitButtonText: {
        fontSize: 30 / 2,
        color: '#ffffff',
        textAlign: 'center',
    },

    // phone input box
    textInputContainer: {
        height: px2dp(88),
        // width: SCREEN_WIDTH,
        // backgroundColor: '#FFDDFF',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    codeInput: {
        flex: 1,
        height: px2dp(352),
        width: px2dp(148),
        fontSize: 15,
        marginLeft: px2dp(0),
        padding: 0,
        fontSize: px2dp(28),
        color: '#ef0c35',
        alignSelf: 'center',
    },
});