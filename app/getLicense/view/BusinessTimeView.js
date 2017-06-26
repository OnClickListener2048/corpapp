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
        height:42 * 2,
        flexDirection: 'row',
        paddingTop:10,
        paddingBottom:2,
        backgroundColor:'#FFFFFF'
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
        // width : 105.5,
        flex : 1,
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
        // width : 105.5,
        flex : 1,
        height : 23,
        borderWidth: 1,
        borderRadius: 2.5,
        borderColor : '#e6e6e6',
        backgroundColor: 'white',
    },



});

export default class BusinessTimeView extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectTimeBtnSelected : false,
            allTimePressBtnSelected : false,
        }

        this._selectTimePress = this._selectTimePress.bind(this);
        this._allTimePress = this._allTimePress.bind(this);
        this._leftTimePress = this._leftTimePress.bind(this);

    }


    _selectTimePress(){

        this.setState({
            selectTimeBtnSelected : true,
            allTimePressBtnSelected : false,
        });

    };

    _leftTimePress(){

    };

    _rightTimePress(){

    };

    _allTimePress(){
        this.setState({
            selectTimeBtnSelected : false,
            allTimePressBtnSelected : true,
        });

    };

    renderselectTimeBtn(){

        if (this.state.selectTimeBtnSelected) {
            return(
                <View  style={{height:8, width:8, borderRadius:4,backgroundColor:'#e5151d'}}>
                </View>
            );
        }else {
            return(
                <View  style={{height:8, width:8, borderRadius:4,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#E6E6E6'}}>
                </View>
            );

        }

    }

    renderallTimeBtn(){

        if (this.state.allTimePressBtnSelected) {
            return(
                <View  style={{height:8, width:8, borderRadius:4,backgroundColor:'#e5151d'}}>
                </View>
            );
        }else {
            return(
                <View  style={{height:8, width:8, borderRadius:4,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#E6E6E6'}}>
                </View>
            );

        }

    }

    render() {
        return (
            <View
                style = {styles.container}>
                <Text style = {styles.leftTipStyle}>{'营业期限：'}</Text>

                <View style={styles.rightViewStyle}>

                    <View style={ styles.rightRowViewStyle}>
                        <TouchableOpacity onPress={() => {this._selectTimePress()}}>
                            <View style={ styles.selectBtnStyle}>
                                {this.renderselectTimeBtn()}
                            </View>

                        </TouchableOpacity>

                        <View style={ styles.leftdownDrapViewStyle}>
                            <Image source={require('../../img/down.png')}/>
                            <Text  numberOfLines={1} style={[{textAlign:'center', justifyContent: 'center',flex: 1,color:'#e6e6e6'}]}>{'呵呵'}</Text>

                        </View>

                        <View style={[{height: 1, backgroundColor:'#e6e6e6',marginLeft: 10, marginRight:10,width:20}]}></View>

                        <View style={ styles.rightdownDrapViewStyle}>
                            <Image source={require('../../img/down.png')}/>
                            <Text  numberOfLines={1} style={[{textAlign:'center', justifyContent: 'center',flex: 1,color:'#e6e6e6'}]}>{'呵呵呵'}</Text>

                        </View>
                    </View>


                    <View style={ styles.rightRowViewStyle}>
                        <TouchableOpacity onPress={() => {this._allTimePress()}}>
                            <View style={ styles.selectBtnStyle}>
                                {this.renderallTimeBtn()}

                            </View>
                        </TouchableOpacity>

                        <Text style={[{ marginLeft : 4.5,color:'#e6e6e6',minHeight: 15,maxHeight:15}]}>{'无期限'}</Text>
                    </View>
                </View>



            </View>
        );
    }
}

