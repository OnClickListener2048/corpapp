
import {Navigation} from 'react-native-navigation';

import {TAB_BAR_STYLE} from './config';
import registerScreens from './screens';

// screen related book keeping
registerScreens();

// 主标签
const tabsMain = [{
    label: '消息',
    screen: 'MessageCenterPage',
    icon: require('./img/message.png'),
    selectedIcon: require('./img/message_red.png'),
    title: '消息中心',
}, {
    label: '应用',
    screen: 'ApplicationCenterPage',
    icon: require('./img/application.png'),
    selectedIcon: require('./img/application_red.png'),
    title: '应用中心',
},
    {
        label: '我的',
        screen: 'Mine',
        icon: require('./img/account.png'),
        selectedIcon: require('./img/account_red.png'),
        title: '我的',
    }
];

// 转到初始化页面 main.LaunchPage
export function navToBootstrap({isReset = false} = {}) {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'main.LaunchPage',
    },
    passProps: {
      isReset,
    },
    portraitOnlyMode: true,
  });
}

// 转到登录页面
export function navToLogin({isReset = false} = {}) {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'user.LoginPage',
        },
        passProps: {
            isReset,
        },
        portraitOnlyMode: true,
    });
}

// 转到主Tab页
export function navToMainTab() {
    Navigation.startTabBasedApp({
        tabs: tabsMain,
        tabsStyle: {
            tabBarBackgroundColor: '#F5F5F5',
            navBarButtonColor: '#c8c8c8',
            tabBarButtonColor: '#c8c8c8',
            navBarTextColor: '#c8c8c8',
            tabBarSelectedButtonColor: '#ff505c',
            navigationBarColor: '#F5F5F5',
            navBarBackgroundColor: '#F5F5F5',
            statusBarColor: '#F5F5F5',
            tabFontFamily: 'BioRhyme-Bold',
        },
        appStyle: {
            tabBarBackgroundColor: '#F5F5F5',
            navBarButtonColor: '#c8c8c8',
            tabBarButtonColor: '#c8c8c8',
            navBarTextColor: '#ffffff',
            tabBarSelectedButtonColor: '#ff505c',
            navigationBarColor: '#F5F5F5',
            navBarBackgroundColor: '#F5F5F5',
            statusBarColor: '#F5F5F5',
            tabFontFamily: 'BioRhyme-Bold',
        },
        animationType: 'fade',
        portraitOnlyMode: true,
    });

}