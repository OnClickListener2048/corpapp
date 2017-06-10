/**
 * Created by jinglan on 2017/6/9.
 */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';

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

var data = (function(){
    var _arr = [];
    for(var i = 0;i <= 10; i++){
        _arr.push({
            "userId" : i,
            "user" : "hugo hua",
            "blog" : "http://www.ghugo.com",
            "github" : "https://github.com/hugohua"
        })
    }
    return _arr;
})()

var stickyId = 3


import CommunalNavBar from '../main/GDCommunalNavBar';

import TopcenterImgBottomTitleView from '../view/TopcenterImgBottomTitleView';
import styles from './css/MessageCenterStyle'
import MessageCell from './view/MessageCenterCell'

const window = Dimensions.get('window');
import Swiper from 'react-native-swiper'

export const SCREEN_WIDTH = window.width;
export default class MessageCenterPage extends Component {
    dataBlob : {}
    sectionIDs : []
    rowIDs : []

    constructor(props){
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
    }


    listViewHandleData(result){
        var me = this,
            dataBlob = {},
            sectionIDs = ['s0','s1'],
            rowIDs = [[],[]],
            key,
            //result = Util.sortResource(data),        //重新排序
            length = result.length,
            splitIdx;

        //将数据分隔成两段
        for(var i = 0;i < length; i++){
            key = result[i]['userId'];
            if(key === stickyId){
                dataBlob['s1'] = result[i];
                splitIdx = true;
            }else{
                if(splitIdx){
                    dataBlob['s1:' + key] = result[i];
                    rowIDs[1].push(key);
                }else{
                    dataBlob['s0:' + key] = result[i];
                    rowIDs[0].push(key);
                }

            }
        }
        console.log(dataBlob,sectionIDs,rowIDs);

        return {
            dataBlob : dataBlob,
            sectionIDs : sectionIDs,
            rowIDs : rowIDs
        }
    }



    componentWillMount(){
        var res = this.listViewHandleData(data);
        console.log(res)
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(res.dataBlob,res.sectionIDs,res.rowIDs),
            loaded: true
        });
    }

    static renderTitleItem() {
        return (
            <Text style={styles.navbarTitleItemStyle}>消息中心</Text>
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity>
                {/*<View style={styles.rowStyle}>*/}
                    {/*<Text style={styles.rowText}>{rowData.userId}  {rowData.user}</Text>*/}
                {/*</View>*/}


                <MessageCell messageTitle ='我的外勤'
                             messageSubTitle = 'sub标题'
                              // messageTime = '11月11日'

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






