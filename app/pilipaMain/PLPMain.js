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

import Message from '../pilipaMain/PLPMessage';
import Applit from '../pilipaMain/PLPApplit';
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

    // 点击了Item
    clickItem(selectedTab,subscription) {
        // 发送通知
        DeviceEventEmitter.emit(subscription);
        // 渲染页面
        this.setState({ selectedTab: selectedTab })
    }

    // 返回 TabBar 的 Item
    renderTabBarItem(title, selectedTab, image, selectedImage, component,subscription) {
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                selectedTitleStyle={{color:'black'}}
                renderIcon={() => <Image source={image} style={styles.tabbarIconStyle} />}
                renderSelectedIcon={() => <Image source={selectedImage} style={styles.tabbarIconStyle} />}
                onPress={() => this.clickItem(selectedTab, subscription)}
            >

                <Navigator
                    initialRoute={{
                        name:selectedTab,
                        component:component
                    }}

                    configureScene={(route) => this.setNavAnimationType(route)}

                    renderScene={(route,navigator)=>this.renderListingsScene(route,navigator)}

                />
            </TabNavigator.Item>
        );
    }

    renderListingsScene(route, navigator){
        console.log("renderScene()", route);

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

    render() {
        return (
            <TabNavigator
                tabBarStyle={this.state.isHiddenTabBar !== true ? {} : {height:0, overflow:'hidden'}}
                sceneStyle={this.state.isHiddenTabBar !== true ? {} : {paddingBottom:0}}
            >
                {/* 消息中心 */}
                {this.renderTabBarItem("消息", 'message', require('../img/choose@2x.png'), require('../img/choose_red@2x.png'), Message,'clickMessageItem')}
                {/* 应用中心 */}
                {this.renderTabBarItem("应用", 'applit', require('../img/d123@2x.png'), require('../img/d123_red@2x.png'), Applit,'clickApplitItem')}
                {/* 我的 */}
                {this.renderTabBarItem("我的", 'mine', require('../img/account@2x.png'), require('../img/account_red@2x.png'), Mine,'clickMineItem')}
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