/**
 * Created by jinglan on 2017/6/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import commonStyles from '../css/styles';
import TopcenterImgBottomTitleView from '../view/TopcenterImgBottomTitleView';
import styles from './css/ApplictionCenterPageStyle'
import px2dp from '../util'
export default class ApplicationCenterPage extends Component{

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    renderTitleItem() {
        return (
            <Text style={styles.navbarTitleItemStyle}>应用中心</Text>
        );
    }

    render() {
        return(
        <View style={styles.container}>


            <TopcenterImgBottomTitleView applicationTitle='我的外勤'
                                         applicationImg = {require('../img/crm.png')}
                                         style={{width: 70, marginRight: 0, height: 70, alignSelf: 'flex-end',}}
                                         textStyle={{color: '#ef0c35',  alignSelf: 'flex-end'}}
            />





        </View>
        );
    }
}