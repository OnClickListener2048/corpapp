/**
 * 首页-导航
 * Created by edianzu on 2017/6/6.
 */

import React,{Component}from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    Image,
    Platform,
    DeviceEventEmitter,
} from 'react-native';

import Message from '../message/MessageCenterPage';
import Applit from '../aplicationCenter/ApplicationCenterPage';
import Mine from '../pilipaMain/PLPMine';

// 引用第三方框架
import TabNavigator from 'react-native-tab-navigator';

export default class PLP extends Component {

    constructor(props){
        super(props);
        this.state={Platform,
            selectedTab:'message',     // 首选页面
            isHiddenTabBar:false,   // 是否隐藏tabBar
        };
    }

    setNavAnimationType(route) {
        if (route.animationType) {      // 有值
            let conf = route.animationType;
            conf.gestures = null;           // 关闭返回手势
            return conf;
        }else {
            return Navigator.SceneConfigs.PushFromRight;    // 默认转场动画
        }
    }

    // 隐藏 TabBar
    hiddenTabBar(data) {
        this.setState({
            isHiddenTabBar:data,
        })
    }

    // 组件加载完成
    componentDidMount() {
        // 注册通知
        this.subscription = DeviceEventEmitter.addListener('isHiddenTabBar', (data)=>{this.hiddenTabBar(data)});

    }

    // 组件即将销毁
    componentWillUnmount() {
        // 销毁
        this.subscription.remove();
    }

    // 点击了Item
    clickItem(selectedTab) {
        // 渲染页面
        this.setState({ selectedTab: selectedTab })
    }

    // 返回 TabBar 的 Item
    renderTabBarItem(title, selectedTab, image, selectedImage, component) {
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                selectedTitleStyle={{color:'red'}}
                renderIcon={() => <Image source={image} style={styles.tabbarIconStyle} />}
                renderSelectedIcon={() => <Image source={selectedImage} style={styles.tabbarIconStyle} />}
                onPress={() => this.clickItem(selectedTab)}
            >

                <Navigator
                    initialRoute={{
                        name:selectedTab,
                        component:component
                    }}

                    configureScene={(route) => this.setNavAnimationType(route)}

                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params}
                                          navigator={navigator}
                                          />
                    }}

                />
            </TabNavigator.Item>
        );
    }

    render() {
        return (
            <TabNavigator
                tabBarStyle={this.state.isHiddenTabBar !== true ? {} : {height:0, overflow:'hidden'}}
                sceneStyle={this.state.isHiddenTabBar !== true ? {} : {paddingBottom:0}}
            >
                {/* 消息中心 */}
                {this.renderTabBarItem("消息", 'message', require('../img/message@2x.png'), require('../img/message_red@2x.png'), Message)}
                {/* 应用中心 */}
                {this.renderTabBarItem("应用", 'applit', require('../img/application@2x.png'), require('../img/application_red@2x.png'), Applit)}
                {/* 我的 */}
                {this.renderTabBarItem("我的", 'mine', require('../img/account@3x.png'), require('../img/account_red@3x.png'), Mine)}
            </TabNavigator>
        );
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabbarIconStyle: {
        width:Platform.OS === 'ios' ? 30 : 25,
        height:Platform.OS === 'ios' ? 30 : 25,
    }
});