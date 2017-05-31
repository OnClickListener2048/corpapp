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
    DeviceEventEmitter, TouchableOpacity
} from 'react-native';
// import ProgressiveInput from 'react-native-progressive-input';
import ProgressiveInput from '../view/ClearFocusEdit';
// 引入外部文件
import CommunalNavBar from '../main/GDCommunalNavBar';
import TimerButton from "../view/TimerButton";

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
        this.props.navigator.pop();
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
            <View style={styles.container}>
                {/* 导航栏 */}
                <CommunalNavBar
                    leftItem={() => this.renderLeftItem()}
                    titleItem={() => this.renderTitleItem()}
                />

                {/*<View style={styles.header}>*/}
                {/*<Text style={styles.headtitle}>添加账号</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.marginTopview}/>*/}

                <TimerButton enable={true}
                             style={{width: 110,marginRight: 10}}
                             textStyle={{color: '#1784DA'}}
                             timerCount={60}
                             onClick={(shouldStartCountting)=>{
                                 console.log('onClick', shouldStartCountting)
                                 shouldStartCountting(true);
                                 // this._requestSMSCode(shouldStartCountting)
                             }}/>

                {/*<ProgressiveInput*/}
                    {/*value={this.state.value}*/}
                    {/*style={styles.progressiveInput}*/}
                    {/*isLoading={this.state.isLoading}*/}
                    {/*onInputCleared={this.onInputCleared}*/}
                    {/*placeholder='手机号'*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*keyboardType='phone-pad'*/}
                    {/*onChangeText={*/}
                        {/*(userName) => {*/}
                            {/*this.setState({*/}
                                {/*userName: userName*/}
                            {/*});*/}
                            {/*console.log('aaa', this.state.userName)*/}
                        {/*}*/}
                    {/*}*/}
                {/*/>*/}

                <View style={styles.inputview}>
                    <TextInput
                        style={styles.textinput} placeholder='手机号'
                        onChangeText={
                            (userName) => {
                                this.setState({userName});
                                console.log(this.state.userName)
                            }
                        }/>
                    <View style={styles.dividerview}>
                        <Text style={styles.divider}></Text>
                    </View>
                    <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='密码'
                               onChangeText={(text) => this.setState({password})}
                               secureTextEntry={true}/>
                </View>
                <View style={styles.bottomview}>
                    <View style={styles.buttonview}>
                        <Text style={styles.logintext}>登 录</Text>
                    </View>


                    <View style={styles.bottombtnsview}>
                        <View style={styles.bottomleftbtnview}>
                            <Text style={styles.bottombtn}>无法登录？</Text>
                        </View>
                        <View style={styles.bottomrightbtnview}>
                            <Text style={styles.bottombtn}>注册账号</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    progressiveInput: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    navBarLeftItemStyle: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    navbarTitleItemStyle: {
        fontSize: 17,
        color: 'black',
        marginRight: 50
    },
    header: {
        height: 50,
        backgroundColor: '#12B7F5',
        justifyContent: 'center',
    },
    headtitle: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#ffffff',
    },
    avatarview: {
        height: 150,
        backgroundColor: '#ECEDF1',
        justifyContent: 'center',
    },
    avatarimage: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    marginTopview: {
        height: 15,
        backgroundColor: '#F7F7F9'
    },
    inputview: {
        height: 100,
    },
    textinput: {
        flex: 1,
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        padding: 0,
        color: '#1A1A1A',
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: '#b5b5b9',
    },
    dividerview: {
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 10,
        backgroundColor: '#FFFFFF'
    },
    bottomview: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    buttonview: {
        backgroundColor: '#1DBAF1',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logintext: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    emptyview: {
        flex: 1,
    },
    bottombtnsview: {
        flexDirection: 'row',
    },
    bottomleftbtnview: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bottomrightbtnview: {
        flex: 1,
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bottombtn: {
        fontSize: 15,
        color: '#1DBAF1',
    }
});

// AppRegistry.registerComponent('ReactDemo', () => ReactDemo);