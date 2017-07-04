/**
 * 经营范围页
 * Created by jiaxueting on 2017/7/4.
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

export default class MultiTextInputPage extends Component {
    static navigatorStyle = {
        tabBarHidden: true, // 隐藏默认的顶部导航栏
        navBarHidden: false, // 隐藏默认的顶部导航栏
    };

    constructor(props) {
        super(props);
        this.state = {

            message: '',//经营范围
            messageValid: false,// 内容有效可提交
        };
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.inputArea}>
                <TextInput underlineColorAndroid='transparent'
                           multiline={true}
                           value={this.state.smsCode}
                           textAlignVertical={'top'}
                           maxLength={1024} keyboardType='default'
                           style={styles.codeInput} placeholder='请输入经营范围'
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
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F9FF',
        flex: 1,
    },
    inputArea: {
        height: px2dp(352),
        width: width - 30,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 15,
        alignItems: 'center'
    },
})
