/**
 * Created by jinglan on 2017/6/9.
 */
import React, {Component} from 'react';
import {Dimensions, InteractionManager} from 'react-native';
import JPushModule from 'jpush-react-native';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    AlertIndicatorIOS,
    ActivityIndicatorIOS,
    AlertIOS,
} from 'react-native';
import Toast from 'react-native-root-toast';
import CommunalNavBar from '../main/GDCommunalNavBar';

import SubViewTest from "../test/SubViewTest";
import styles from './css/MessageCenterStyle'
import MessageCell from './view/MessageCenterCell'
import Platform from "react-native";

var data = (function () {
    var _arr = [];
    for (var i = 0; i <= 10; i++) {
        _arr.push({
            "userId": i,
            "user": "hugo hua",
            "blog": "http://www.ghugo.com",
            "github": "https://github.com/hugohua"
        })
    }
    return _arr;
})()

var stickyId = 3



const window = Dimensions.get('window');

export const SCREEN_WIDTH = window.width;
export default class MessageCenterPage extends Component {
    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
    };
    dataBlob: {}
    sectionIDs: []
    rowIDs: []

    constructor(props) {
        super(props)


        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                // getSectionHeaderData: getSectionData, //组头信息
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            })
        }

        this.props.navigator.setTabBadge({
            badge: 88 // 数字气泡提示, 设置为null会删除
        });
    }


    listViewHandleData(result) {
        var me = this,
            dataBlob = {},
            sectionIDs = ['s0', 's1'],
            rowIDs = [[], []],
            key,
            //result = Util.sortResource(data),        //重新排序
            length = result.length,
            splitIdx;

        //将数据分隔成两段
        for (var i = 0; i < length; i++) {
            key = result[i]['userId'];
            if (key === stickyId) {
                dataBlob['s1'] = result[i];
                splitIdx = true;
            } else {
                if (splitIdx) {
                    dataBlob['s1:' + key] = result[i];
                    rowIDs[1].push(key);
                } else {
                    dataBlob['s0:' + key] = result[i];
                    rowIDs[0].push(key);
                }

            }
        }
        console.log(dataBlob, sectionIDs, rowIDs);

        return {
            dataBlob: dataBlob,
            sectionIDs: sectionIDs,
            rowIDs: rowIDs
        }
    }

    componentDidMount() {
        Toast.show('componentDidMount ' + Platform.OS + (Platform.OS === 'android'));

        try {
            if (Platform.OS !== 'ios') {
                JPushModule.initPush();
                JPushModule.notifyJSDidLoad();

                JPushModule.addReceiveCustomMsgListener((message) => {
                    //this.setState({pushMsg: message});
                    console.log("receive 自定义消息: " + JSON.stringify(message));
                    Toast.show('receive 自定义消息: ' + JSON.stringify(message));
                });
                JPushModule.addReceiveNotificationListener((message) => {
                    console.log("receive notification: " + JSON.stringify(message));
                    Toast.show('receive notification: ' + JSON.stringify(message));
                })
            }
        } catch (e) {
            Toast.show('JPush error: ' + e.message);
        }
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
    }

    componentWillMount() {
        var res = this.listViewHandleData(data);
        console.log(res)
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(res.dataBlob, res.sectionIDs, res.rowIDs),
            loaded: true
        });
    }

    toMyOutSideWork() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                screen: 'SubViewTest',
                backButtonTitle: '返回', // 返回按钮的文字 (可选)
                backButtonHidden: false, // 是否隐藏返回按钮 (可选)
            });
        });
    }

    static renderTitleItem() {
        return (
            <Text style={styles.navbarTitleItemStyle}>消息中心</Text>
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={() => {
                this.toMyOutSideWork()
            }}>
                {/*<View style={styles.rowStyle}>*/}
                {/*<Text style={styles.rowText}>{rowData.userId}  {rowData.user}</Text>*/}
                {/*</View>*/}
                {/*onPress={() => {this.toMyOutSideWork()}}*/}

                <MessageCell messageTitle='我的外勤标题外勤标'
                             messageSubTitle='sub标题'
                             messageTime='17/06/02'
                             messageIcon={require('../img/field.png')}
                />


            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <CommunalNavBar
                    titleItem={() => MessageCenterPage.renderTitleItem()}
                />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID, highlightRow) => this._renderRow(rowData, sectionID, rowID, highlightRow)}
                />
            </View>
        );
    }
}






