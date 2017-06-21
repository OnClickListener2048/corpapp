/**
关于App
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
import DeviceInfo from 'react-native-device-info';

export default class About extends Component {
    static navigatorStyle = {
        tabBarHidden: true, // 隐藏默认的顶部导航栏
        navBarHidden: false, // 隐藏默认的顶部导航栏
    };

    constructor(props) {
        super(props);
        this.state = {
            content: '1.新功能\n2.说明\n3.XXX',     // update notes
        };

        // TODO Change
        HTTPBase.postEx('http://rapapi.org/mockjsdata/19607/app/v0/about').then(
            (json) => {
                if (json !== null && json.data !== null) {
                    this.setState({content:  json.data.content});
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

                    <Image source={require('../../img/logo_g.png')} style={styles.headPortraint}/>

                <Text allowFontScaling={true} style= {[styles.nameTextStyle,
                    {marginBottom: px2dp(60), alignSelf:'center'}]}>
                    关于噼里啪v{DeviceInfo.getVersion()}
                </Text>
                <View style={styles.divider}/>

                <View style={styles.bottomView}>
                    <Text  allowFontScaling={true} style={[styles.nameTextStyle,
                        {marginLeft: px2dp(30), marginTop: px2dp(40), fontSize: 14,}]}>
                        {this.state.content}
                    </Text>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        flex: 1,
        flexDirection: 'column',
    },

    headPortraint: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        marginTop:px2dp(80),
        marginBottom:px2dp(20),
    },

    bottomView: {
        // height: px2dp(100),
        backgroundColor:'white',
        flex: 1,
        width: width,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
    },

    divider: {
        backgroundColor: '#dedede',
        marginLeft: 0,
        marginRight: 0,
        height: 0.5,
    },

    nameTextStyle: {
        fontSize: 18,
        color: '#323232',
        textAlign: 'left',
        marginLeft: 0,
    },


});