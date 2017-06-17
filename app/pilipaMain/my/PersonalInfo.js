/**
个人资料
 */

import React, {Component}from 'react';
// 获取屏幕尺寸
const {width, height} = Dimensions.get('window');

import {
    Alert,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions, TouchableWithoutFeedback,
}from 'react-native';
import px2dp from '../../util'
import {navToBootstrap, navToMainTab} from '../../navigation';
import Toast from 'react-native-root-toast';

export default class PLPMine extends Component {
    static navigatorStyle = {
        tabBarHidden: true, // 隐藏默认的顶部导航栏
        navBarHidden: false, // 隐藏默认的顶部导航栏
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: '-',     // 用户名
            mobile: '', //手机号
        };

        UserInfoStore.getUserInfo().then(
            (user) => {
                if (user !== null) {
                    this.setState({userName: user.name, mobile: user.mobile});
                }
            },
            (e) => {
                console.log("读取信息错误:", e);
            },
        );
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
                <View style={styles.settingview}>
                    <Text style={styles.listtextstyle}>
                        姓名:
                    </Text>
                    <Text style= {[styles.listtextstyle,
                        {marginLeft: 5}]}>
                        {this.state.userName}
                    </Text>
                </View>
                <View style={styles.lineview}/>

                <View style={styles.settingview}>

                    <Text style={styles.listtextstyle}>
                        手机:
                    </Text>
                    <Text style= {[styles.listtextstyle,
                        {marginLeft: 5}]}>
                        {this.state.mobile}
                    </Text>
                </View>
                <View style={styles.lineview}/>

            </View>
        );
    }

    // 登出
    _doLogout() {
        Alert.alert('确定退出', '',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: '确定',
                    onPress: () => {},
                },]
            , {cancelable: false});
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F9FF',
        flex: 1,
    },
    navbarTitleItemStyle: {
        fontSize: 17,
        color: 'black',
        marginRight: 50
    },
    head_background: {
        height: height / 3,
        width: width,
    },
    headimagestyle: {
        width: width,
        height: 80,
        position: 'absolute',
        bottom: 87,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headPortraint: {
        position: 'absolute',
        height: 80,
        width: 80,
    },
    textname: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
        position: 'absolute',
        bottom: 47,
        width: width,
        textAlign: 'center',
    },
    textcontentview: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 12,
        position: 'absolute',
        bottom: 25,
        width: width,
        textAlign: 'center',
    },
    settingview: {
        height: 50,
        width: width,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center'
    },

    lineview: {
        backgroundColor: '#dedede',
        marginLeft: 15,
        marginRight: 15,
        height: 0.5,
    },
    lineviewlast: {
        backgroundColor: '#dedede',
        height: 0.5,
    },
    listtextstyle: {
        fontSize: 15,
        color: '#323232',
        textAlign: 'left',
        marginLeft: 0,
    },
    arrowStyle: {
        width: 10,
        height: 10,
        marginRight: 15,
    },
});



