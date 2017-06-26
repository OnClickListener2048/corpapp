/**
 * Created by edianzu on 2017/6/6.
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
import CommunalNavBar from '../main/GDCommunalNavBar';
import px2dp from '../util'
import {navToBootstrap, navToMainTab} from '../navigation';
import Toast from 'react-native-root-toast';
import * as apis from '../apis';

export default class PLPMine extends Component {
    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: '-',     // 用户名
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
                <Image source={require('../img/bg.png')} style={styles.head_background}>
                    <TouchableWithoutFeedback onPress={() => {this._goPersonalInfo()}}>
                    <View style={styles.headimagestyle}>
                        <Image source={require('../img/logo_circle.png')} style={styles.headPortraint}/>
                    </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.textname}>{this.state.userName}</Text>
                    <Text style={styles.textcontentview}>{/* 暂无部门信息*/}</Text>
                </Image>

                <TouchableWithoutFeedback onPress={() => {this._goSettings()}}>
                <View style={styles.settingview}>
                    <Image source={require('../img/set@3x.png')}
                           style={styles.imgiconview}/>
                    <Text style={styles.listtextstyle}>
                        设置
                    </Text>
                    <Image source={{uri: 'icon_cell_rightArrow'}} style={styles.arrowStyle}/>
                </View>
                </TouchableWithoutFeedback>

                <View style={styles.lineview}/>

                <TouchableWithoutFeedback onPress={() => {this._goFeedback()}}>
                <View style={styles.settingview}>
                    <Image source={require('../img/problem@3x.png')}
                           style={styles.imgiconview}/>
                    <Text style={styles.listtextstyle}>
                        问题反馈
                    </Text>
                    <Image source={{uri: 'icon_cell_rightArrow'}} style={styles.arrowStyle}/>
                </View>
                </TouchableWithoutFeedback>

                <View style={styles.lineview}/>

                <TouchableWithoutFeedback onPress={() => {this._goAbout()}}>
                <View style={styles.settingview}>
                    <Image source={require('../img/about@3x.png')}
                           style={styles.imgiconview}/>
                    <Text style={styles.listtextstyle}>
                        关于噼里啪v1.0
                    </Text>
                    <Image source={{uri: 'icon_cell_rightArrow'}} style={styles.arrowStyle}/>
                </View>
                </TouchableWithoutFeedback>
                <View style={styles.lineviewlast}/>

                <TouchableWithoutFeedback onPress={this._doLogout}>
                    <View style={styles.buttonView}>
                        <Text style={styles.submitButtonText}>退出</Text>
                    </View>
                </TouchableWithoutFeedback>

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
                    onPress: () => apis.logout().then(
                        () => navToBootstrap({isReset: true}),
                        (e) => Toast.show("退出失败:" + e.msg)
                    ),
                },]
            , {cancelable: false});
    }

    _goPersonalInfo() {
        this.props.navigator.push({
            screen: 'pilipaMain.my.PersonalInfo',
            backButtonTitle: '', // 返回按钮的文字 (可选)
            backButtonHidden: false, // 是否隐藏返回按钮 (可选)
            title:'个人资料',
        });
    }

    _goFeedback() {
        this.props.navigator.push({
            screen: 'pilipaMain.my.Feedback',
            backButtonTitle: '', // 返回按钮的文字 (可选)
            backButtonHidden: false, // 是否隐藏返回按钮 (可选)
            title:'问题反馈',
        });
    }

    _goAbout() {
        this.props.navigator.push({
            screen: 'pilipaMain.my.About',
            backButtonTitle: '', // 返回按钮的文字 (可选)
            backButtonHidden: false, // 是否隐藏返回按钮 (可选)
            title:'关于噼里啪',
        });
    }

    _goSettings() {
        this.props.navigator.push({
            screen: 'pilipaMain.my.Settings',
            backButtonTitle: '', // 返回按钮的文字 (可选)
            backButtonHidden: false, // 是否隐藏返回按钮 (可选)
            title:'设置',
        });
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
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgiconview: {
        marginLeft: 15,
        alignItems: 'center',
        marginRight: 10,
    },
    lineview: {
        backgroundColor: '#dedede',
        marginLeft: 15,
        height: 0.5,
    },
    lineviewlast: {
        backgroundColor: '#dedede',
        height: 0.5,
    },
    listtextstyle: {
        fontSize: 15,
        color: '#323232',
        alignItems: 'center',
        position: 'absolute',
        marginLeft: 45,
    },
    arrowStyle: {
        width: 10,
        height: 10,
        marginRight: 15,
    },
    buttonView: {
        borderColor: '#e6272e',
        margin: 0,
        borderWidth: 1.5,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        height: px2dp(88),
        width: px2dp(500),
        bottom: px2dp(45),
        position: 'absolute'
    },
    submitButtonText: {
        fontSize: 30 / 2,
        color: '#e6272e',
        textAlign: 'center',
    },

});



