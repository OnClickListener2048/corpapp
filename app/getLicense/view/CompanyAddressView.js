/**
 * Created by jinglan on 2017/6/26.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
} from 'react-native';

const window = Dimensions.get('window');
export const height = window.height;
export const width = window.width;

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        height:42,
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

export default class  CompanyAddressView extends Component{
    constructor(props) {
        super(props)
        this.state = {
            city:this.props.city,
            district:this.props.district,
            isFouces:this.props.isFouces,
            // city:'市',
            // district:'区',
        }

        console.log("this.props.city=" + this.props.city);
        this._rightTimePress = this._rightTimePress.bind(this);
        this._leftTimePress = this._leftTimePress.bind(this);
        this.setArea = this.setArea.bind(this);
    }


    static propTypes = {
        city:PropTypes.string,
        district:PropTypes.string,
        isFouces:PropTypes.bool,
    };

    setArea(data:[]) {
        this.setState({city:data[0],
            district:data[1]});
    }

    _leftTimePress(){
        this.props.callback();

    };

    _rightTimePress(){
        this.props.callback();
    };



    render() {

        return (
            <View
                style = {styles.container}>
                <Text style = {styles.leftTipStyle}>{'公司地址：'}</Text>

                <View style={styles.rightViewStyle}>
                    {this.props.isFouces?
                    <View style={ styles.rightRowViewStyle}>
                        <TouchableOpacity  style={ styles.leftdownDrapViewStyle}  onPress={() => {this._leftTimePress()}}>
                        {/*<View style={ styles.leftdownDrapViewStyle}>*/}
                            <Image source={require('../../img/down.png')}/>
                            <Text  numberOfLines={1} style={[{textAlign:'center',marginRight: 5, justifyContent: 'center',flex: 1,color:'#e6e6e6'}]}>{this.state.city}</Text>

                        {/*</View>*/}
                        </TouchableOpacity>


                        {/*<View style={[{height: 1, backgroundColor:'#e6e6e6',marginLeft: 10, marginRight:10,width:20}]}></View>*/}
                        <TouchableOpacity style={ styles.rightdownDrapViewStyle} onPress={() => {this._rightTimePress()}}>

                        {/*<View style={ styles.rightdownDrapViewStyle}>*/}
                            <Image source={require('../../img/down.png')}/>
                            <Text  numberOfLines={1} style={[{textAlign:'center',marginLeft: 5, justifyContent: 'center',flex: 1,color:'#e6e6e6'}]}>{this.state.district}</Text>

                        {/*</View>*/}
                        </TouchableOpacity>


                    </View>:

                        <View style={ styles.rightRowViewStyle}>
                                <View style={ styles.leftdownDrapViewStyle}>
                                <Text  numberOfLines={1} style={[{textAlign:'center',marginRight: 5, justifyContent: 'center',flex: 1,color:'#e6e6e6'}]}>{this.state.city}</Text>

                                </View>
                            {/*<View style={[{height: 1, backgroundColor:'#e6e6e6',marginLeft: 10, marginRight:10,width:20}]}></View>*/}

                                <View style={ styles.rightdownDrapViewStyle}>
                                <Text  numberOfLines={1} style={[{textAlign:'center',marginLeft: 5, justifyContent: 'center',flex: 1,color:'#e6e6e6'}]}>{this.state.district}</Text>

                                </View>

                        </View>}

                    <View style={ styles.rightRowViewStyle}>


                    </View>
                </View>



            </View>
        );
    }
}

