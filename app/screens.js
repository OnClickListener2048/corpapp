// 所有需要通过导航跳转的组件都需要在此文件中注册, 第一个参数为组件别名, 需要唯一
import { Navigation } from 'react-native-navigation';

// 引用外部文件
import Main from './pilipaMain/PLPMain';
import LoginPage from './user/LoginPage';
import LaunchPage from './main/GDLaunchPage';
import MessageCenterPage from './message/MessageCenterPage';
import ApplicationCenterPage from './aplicationCenter/ApplicationCenterPage';
import Mine from './pilipaMain/PLPMine';
import SubViewTest from "./test/SubViewTest";
import MyOutSideWorkPage from "./myOutSideWork/MyOutSideWorkPage";

export default function () {
    let reg = Navigation.registerComponent;
    reg('Main', () => Main);
    reg('user.LoginPage', () => LoginPage);
    reg('main.LaunchPage', () => LaunchPage);
    reg('ApplicationCenterPage', () => ApplicationCenterPage);
    reg('MessageCenterPage', () => MessageCenterPage);
    reg('Mine', () => Mine);
    reg('SubViewTest', () => SubViewTest);
    reg('MyOutSideWorkPage', () => MyOutSideWorkPage);
}