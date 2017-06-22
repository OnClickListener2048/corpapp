/**
 * Created by jinglan on 2017/6/22.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions
} from 'react-native';

const window = Dimensions.get('window');
export const height = window.height;
export const width = window.width;

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        height:46 * 2,
        flexDirection: 'row',
        paddingTop:10,
        paddingBottom:15,
        backgroundColor:'orange'
    },
    leftTipStyle: {
        marginLeft: 15,
        marginRight: 4,
        paddingTop:5,

    },
    rightViewStyle: {
        marginRight: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex : 1

    },

    rightRowViewStyle: {
        flexDirection: 'row',
        height: 25,
        backgroundColor:'white',
        // justifyContent:'center',
        alignItems:'center',


    },

    selectBtnStyle: {

        width : 20,
        height : 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems:'center',
    },
    leftdownDrapViewStyle: {
        flexDirection: 'row-reverse',
        alignItems:'center',
        width : 105.5,
        marginLeft : 4.5,
        marginRight : 0,
        height : 23,
        borderRadius: 2.5,
        borderWidth: 1,
        borderColor : '#e6e6e6',
        backgroundColor: 'white',
    },

    rightdownDrapViewStyle: {
        flexDirection: 'row-reverse',
        alignItems:'center',
        marginLeft : 0,
        marginRight : 0,
        width : 105.5,
        height : 23,
        borderWidth: 1,
        borderRadius: 2.5,
        borderColor : '#e6e6e6',
        backgroundColor: 'white',
    },



});

export default class BusinessTimeView extends Component{

    _selectTimePress(){

    };

    _leftTimePress(){

    };

    _rightTimePress(){

    };

    _allTimePress(){

    };

    render() {
        return (
            <View
                style = {styles.container}>
                <Text style = {styles.leftTipStyle}>{'营业期限：'}</Text>

                <View style={styles.rightViewStyle}>

                    <View style={ styles.rightRowViewStyle}>
                        <TouchableOpacity onPress={() => {this._selectTimePress()}}>
                            <View style={ styles.selectBtnStyle}>
                                <Image source={require('../../img/round_q.png')} style={{width:10,height:10}}/>
                            </View>

                        </TouchableOpacity>

                        <View style={ styles.leftdownDrapViewStyle}>
                            <Image source={require('../../img/down.png')}/>
                            <Text  numberOfLines={1} style={[{textAlign:'center', justifyContent: 'center',flex: 1,color:'#e6e6e6'}]}>{'呵呵'}</Text>

                        </View>
                        <View style={[{height: 1, backgroundColor:'#FFFFFF',width:11}]}></View>

                        <View style={[{height: 1, backgroundColor:'#e6e6e6',flex:1}]}></View>

                        <View style={[{height: 1, backgroundColor:'#FFFFFF',width:11}]}></View>

                        <View style={ styles.rightdownDrapViewStyle}>
                            <Image source={require('../../img/down.png')}/>
                            <Text  numberOfLines={1} style={[{textAlign:'center', justifyContent: 'center',flex: 1,color:'#e6e6e6'}]}>{'呵呵'}</Text>


                        </View>
                    </View>


                    <View style={ styles.rightRowViewStyle}>
                        <TouchableOpacity onPress={() => {this._allTimePress()}}>
                            <View style={ styles.selectBtnStyle}>
                                <Image source={require('../../img/round_q.png')} style={{width:10,height:10}}/>
                            </View>
                        </TouchableOpacity>

                        <Text style={[{ marginLeft : 4.5,color:'#e6e6e6',minHeight: 15,maxHeight:15}]}>{'无期限'}</Text>
                    </View>
                </View>



            </View>
        );
    }
}

