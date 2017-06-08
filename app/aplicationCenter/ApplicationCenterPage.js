/**
 * Created by jinglan on 2017/6/7.
 */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';

import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import commonStyles from '../css/styles';
import CommunalNavBar from '../main/GDCommunalNavBar';

import TopcenterImgBottomTitleView from '../view/TopcenterImgBottomTitleView';
import styles from './css/ApplictionCenterPageStyle'
import px2dp from '../util'
const window = Dimensions.get('window');
import Swiper from 'react-native-swiper'

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;
export default class ApplicationCenterPage extends Component{

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    renderTitleItem() {
        return(
            <Text style={styles.navbarTitleItemStyle}>应用中心</Text>
        );
    }

    renderImg(){
        var imageViews=[];
        for(var i=0;i<4;i++){
            imageViews.push(
                <Image
                    key={i}
                    style={{flex:1}}
                    source={require( '../img/account.png')}
                />
            );
        }
        return imageViews;
    }

    render() {
        return(
        <View style={styles.container}>
            <CommunalNavBar

                titleItem = {() => this.renderTitleItem()}
            />


            <Swiper height={200}
            >
                {this.renderImg()}
            </Swiper>
            

            <View style={styles.applicationViewContainer}>
                <TopcenterImgBottomTitleView applicationTitle='我的外勤'
                                             applicationImg = {require('../img/field.png')}
                                             style={{ marginLeft: 15,marginTop: 15, height: 100, width: (SCREEN_WIDTH - 45)/2,alignSelf: 'flex-start',}}
                                             textStyle={{color: '#ef0c35',  alignSelf: 'flex-end'}}
                />
                <TopcenterImgBottomTitleView applicationTitle='CRM'
                                             applicationImg = {require('../img/crm_h.png')}
                                             style={{ marginLeft: 15,marginTop: 15, height: 100, width: (SCREEN_WIDTH - 45)/2, alignSelf: 'flex-start',}}
                                             textStyle={{color: '#ef0c35',  alignSelf: 'flex-end'}}
                />
                <TopcenterImgBottomTitleView applicationTitle='工作统计'
                                             applicationImg = {require('../img/statistical_h.png')}
                                             style={{marginLeft: 15,marginTop: 15, height: 100, width: (SCREEN_WIDTH - 45)/2, alignSelf: 'flex-start',}}
                                             textStyle={{color: '#ef0c35',  alignSelf: 'flex-end'}}
                />
                <TopcenterImgBottomTitleView applicationTitle='工作日志'
                                             applicationImg = {require('../img/log_h.png')}
                                             style={{ marginLeft: 15, marginTop: 15,height: 100, width: (SCREEN_WIDTH - 45)/2, alignSelf: 'flex-start',}}
                                             textStyle={{color: '#ef0c35',  alignSelf: 'center'}}
                />
            </View>









        </View>
        );
    }
}