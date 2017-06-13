/**
 * 我的外勤
 * Created by jiaxueting on 2017/6/13.
 */

import React,{Component}from 'react';
import {Text, View,Dimensions} from "react-native";
const window = Dimensions.get('window');
export const height = window.height;
export const width = window.width;

export default class MyOutSideWorkPage extends Component{

    render(){
        return(
            <View style={{height:height,width:width}}>
            <Text style={{marginTop:30,textAlign:'center'}}>我的外勤</Text>
            </View>
        );
}

}