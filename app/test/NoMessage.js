/**
 * 统一，暂无消息页面
 * Created by jiaxueting on 2017/6/15.
 */


import React,{Component}from 'react';
import {Image, Text, View,StyleSheet} from "react-native";

export default class NoMessage extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return(
               <View style={styles.noMessageContainer}>
                    <Image style={styles.noMessageImg}
                           source={require('../img/no_message.png')}/>
                    <Text style={styles.welcome}>
                        暂无消息
                    </Text>
                </View>
                )
    }
}

const styles = StyleSheet.create({
    noMessageContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    welcome: {
        fontSize: 18,
        marginTop:20,
        color:'#969696',
    },
    noMessageImg:{
        marginTop:160,

    }
});