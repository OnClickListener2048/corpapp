/**
问题反馈
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
import {SCREEN_WIDTH as width, SCREEN_HEIGHT as height } from '../../config';
const dismissKeyboard = require('dismissKeyboard');     // 获取键盘回收方法
import SActivityIndicator from '../../modules/react-native-sww-activity-indicator';
import * as apis from '../../apis';

export default class Feedback extends Component {
    static navigatorStyle = {
        tabBarHidden: true, // 隐藏默认的顶部导航栏
        navBarHidden: false, // 隐藏默认的顶部导航栏
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: '-',     // 用户名
            mobile: '', //手机号
            message: '',//反馈内容
            messageValid: false,// 内容有效可提交
        };
    }

    componentWillMount() {
        UserInfoStore.getUserInfo().then(
            (user) => {
                if (user !== null) {
                    this.setState({userName: user.name});
                }
            },
            (e) => {
                console.log("读取信息错误:", e);
            },
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.inputArea}>
                    <TextInput underlineColorAndroid='transparent'
                               multiline={true}
                               value={this.state.smsCode}
                               maxLength={1024} keyboardType='default'
                               style={styles.codeInput} placeholder='请输入反馈内容'
                               returnKeyType='done'
                               onChangeText={(message) => {
                                   let messageValid = (message.length > 0 && message.length <= 1024);
                                   this.setState({message, messageValid});
                               }}

                               onSubmitEditing={() => {
                                   dismissKeyboard();
                               }}
                    />
                </View>
                <View style={styles.divider}/>

                <View style= {[styles.lineView,
                    {marginTop: px2dp(20)}]}>
                    <Text style={styles.nameTextStyle}>
                        反馈人员:
                    </Text>
                    <Text style= {[styles.nameTextStyle,
                        {marginLeft: 5}]}>
                        {this.state.userName}
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={() => {this._doFeedback()}}>
                    <View style={[styles.buttonView,
                        {backgroundColor: (
                            (this.state.messageValid ) ? '#ef0c35' : '#e6e6e6')}]}>
                        <Text style={styles.submitButtonText}>提交</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }

    _doFeedback() {
        let loading = SActivityIndicator.show(true, "提交反馈中");
        let message = this.state.message;
        let userName = this.state.userName;

        apis.sendFeedback({message , userName}).then(
            (responseData) => {
                SActivityIndicator.hide(loading);
                Alert.alert('反馈提交成功', '',
                    [
                        {
                            text: '确定',
                            onPress: () => {
                                this.props.navigator.pop();
                            },
                        },]
                    , {cancelable: false});

            },
            (e) => {
                SActivityIndicator.hide(loading);
                console.log("反馈提交失败:" , e);
                Toast.show('反馈提交失败:' + JSON.stringify(e));
                Alert.alert('反馈提交失败', '服务器出错了',
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
        justifyContent:'center'
    },

    codeInput: {
        flex: 1,
        height: px2dp(352),
        width: px2dp(148),
        marginLeft: px2dp(0),
        padding: 0,
        fontSize: px2dp(28),
        color: '#ef0c35',
        alignSelf: 'center',
    },
});