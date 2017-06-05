/**
 * 登陆界面
 * Created by beansoft on 2017/5/19.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    DeviceEventEmitter, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
// import ProgressiveInput from 'react-native-progressive-input';
import ProgressiveInput from '../view/ClearFocusEdit';
// 引入外部文件
import CommunalNavBar from '../main/GDCommunalNavBar';
import TimerButton from "../view/TimerButton";
import commonStyles from '../css/styles';
import styles from './css/LoginPageStyle';
import px2dp from '../util'

export default class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            userName: '',
            password: '',
            value: '',
        };
        this.onInputCleared = this.onInputCleared.bind(this);
    }

    onInputCleared() {
        this.setState({value: '', isLoading: false});
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

    // 返回中间按钮
    renderTitleItem() {
        return (
            <Text style={styles.navbarTitleItemStyle}>登录</Text>
        );
    }

    // 准备加载组件
    componentWillMount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', true);
    }

    // 准备销毁组件
    componentWillUnmount() {
        // 发送通知
        DeviceEventEmitter.emit('isHiddenTabBar', false);
    }

    render() {
        return (
            <Image source={require('../img/bg.png')} style={commonStyles.fullScreen}>
                {/* 导航栏 */}
                {/*<CommunalNavBar*/}
                {/*leftItem={() => this.renderLeftItem()}*/}
                {/*titleItem={() => this.renderTitleItem()}*/}
                {/*/>*/}

                {/*<View style={styles.header}>*/}
                {/*<Text style={styles.headtitle}>添加账号</Text>*/}
                {/*</View>*/}

                <Image source={require('../img/logo_white.png')} style={styles.bzLogo}/>
                <View style={{height: px2dp(100),}}/>
                <KeyboardAvoidingView behavior='padding' style={[styles.containerKeyboard,
                    {backgroundColor: 'white'}]}
                                      keyboardVerticalOffset={10}>
                    <View style={{height: 40,}}/>
                    {/*   手机号 */}
                    <View style={styles.textInputContainer}>
                        <Image source={require('../img/account_red.png')} style={styles.inputLogo}/>
                        <View style={styles.textInputWrapper}>
                            <TextInput underlineColorAndroid='transparent'
                                       style={styles.textInput} placeholder='手机号码' returnKeyType='next'
                                       onChangeText={
                                           (userName) => {
                                               this.setState({userName});
                                               console.log(this.state.userName)
                                           }
                                       }/>
                        </View>
                    </View>

                    <View style={{height: 0,}}/>
                    {/*  验证码 */}
                    <View style={styles.textInputContainer}>
                        <Image source={require('../img/d123_red.png')} style={styles.inputLogo}/>
                        <View style={styles.textInputWrapper}>
                            <TextInput underlineColorAndroid='transparent'
                                       secureTextEntry={true}
                                       style={styles.codeInput} placeholder='短信验证码'
                                       returnKeyType='next' returnKeyLabel='下一个'
                                       onChangeText={(text) => this.setState({password})}
                            />

                            <View style={{height: 15, width: 1, backgroundColor: '#c8c8c8', alignSelf: 'center', marginRight: 1}}/>

                            <TimerButton enable={true}
                                         style={{width: 70, marginRight: 0, height: 44, alignSelf: 'flex-end',}}
                                         textStyle={{color: '#ef0c35',  alignSelf: 'flex-end'}}
                                         timerCount={60}
                                         onClick={(shouldStartCountting) => {
                                             console.log('onClick', shouldStartCountting)
                                             shouldStartCountting(true);
                                             // this._requestSMSCode(shouldStartCountting)
                                         }}/>
                        </View>
                    </View>

                    {/*  验证码 */}
                    <View style={[styles.textInputContainer,
                        { marginTop: -2 }]}>
                        <Image source={require('../img/choose_red.png')} style={styles.inputLogo}/>
                        <View style={[styles.textInputWrapper,
                            { justifyContent: 'flex-start', borderBottomWidth: 0}]}>
                            <Text style={{color: '#c8c8c8', alignSelf: 'center', marginRight: 1, fontSize: 12}}
                            >我已经阅读并同意</Text>
                            <Text style={{fontSize: 12, color: '#c8c8c8', alignSelf: 'center', textDecorationLine: 'underline', marginRight: 1}}
                            >《XXXX协议》</Text>
                        </View>
                    </View>

                    <View style={styles.buttonview}>
                        <Text style={styles.logintext}>登录</Text>
                    </View>

                </KeyboardAvoidingView>


            </Image>
        );
    }
}


// AppRegistry.registerComponent('ReactDemo', () => ReactDemo);