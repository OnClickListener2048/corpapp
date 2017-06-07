/**
 * Created by edianzu on 2017/6/6.
 */

import React,{Component}from 'react';
// 获取屏幕尺寸
const {width, height} = Dimensions.get('window');

import {
    Image,
    StyleSheet, Text, View,
    Dimensions,
}from 'react-native';
import CommunalNavBar from '../main/GDCommunalNavBar';

export default class PLPMine extends Component{

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../img/bg.png')} style={styles.head_background}>
                    <Text style={styles.textname}>王小二</Text>
                    <Text style={styles.textcontentview}>产品中心</Text>
                </Image>
                <View style={styles.settingview}>
                    <Image source={require('../img/set@3x.png')}
                    style={styles.imgiconview}/>
                    <Text style={styles.listtextstyle}>
                        设置
                    </Text>
                    <Image source={{uri:'icon_cell_rightArrow'}} style={styles.arrowStyle} />
                </View>
                <View style={styles.lineview}/>

                <View style={styles.settingview}>
                    <Image source={require('../img/problem@3x.png')}
                           style={styles.imgiconview}/>
                    <Text style={styles.listtextstyle}>
                        问题反馈
                    </Text>
                    <Image source={{uri:'icon_cell_rightArrow'}} style={styles.arrowStyle} />
                </View>
                <View style={styles.lineview}/>

                <View style={styles.settingview}>
                    <Image source={require('../img/about@3x.png')}
                           style={styles.imgiconview}/>
                    <Text style={styles.listtextstyle}>
                        关于噼里啪v1.0
                    </Text>
                    <Image source={{uri:'icon_cell_rightArrow'}} style={styles.arrowStyle} />
                </View>
                <View style={styles.lineviewlast}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8F9FF',
        flex:1,
    },
    navbarTitleItemStyle: {
        fontSize: 17,
        color: 'black',
        marginRight: 50
    },
    head_background:{
        height:height/3,
        width:width,
    },
    textname:{
        color:'white',
        fontSize:18,
        position:'absolute',
        bottom:47,
        width:width,
        textAlign:'center',
    },
    textcontentview:{
        color:'white',
        fontSize:12,
        position:'absolute',
        bottom:25,
        width:width,
        textAlign:'center',
    },
    settingview:{
        height:50,
        width:width,
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    imgiconview:{
        marginLeft:15,
        alignItems:'center',
        marginRight:10,
    },
    lineview:{
        backgroundColor:'#969696',
        marginLeft:15,
        height:0.5,
    },
    lineviewlast:{
        backgroundColor:'#969696',
        height:0.5,
    },
    listtextstyle:{
        fontSize:15,
        color:'#323232',
        alignItems:'center',
        position:'absolute',
        marginLeft:45,
    },
    arrowStyle: {
        width:10,
        height:10,
        marginRight:15,
    }

});



