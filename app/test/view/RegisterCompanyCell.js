/**
 * Created by jinglan on 2017/6/13.
 */



import React, {PropTypes,Component} from 'react';
import {View, Text,Image,Dimensions,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    Alert,} from 'react-native';
// import styles from '../style/SubViewStyle'

const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;


class RegisterCompanyCell extends Component{
    render(){
        return(
            <View style={{backgroundColor:'#F8F8F8'}}>
                {/*<TouchableOpacity activeOpacity={0.8} onPress={()=>this.onClick()}>*/}
                    <View style={styles.container}>
                        {/*<View style={styles.left}>*/}
                            {/*<Image style={styles.icon} source={this.props.detail.icon} />*/}
                        {/*</View>*/}

                        <View style={styles.left}>
                            <Text style={{fontSize:15,color:'#323232'}}>{this.props.detail.processName}</Text>

                        </View>

                        <View style={styles.center}>
                            <Text style={{fontSize:15,color:'#323232',justifyContent:'center'}}>{this.props.detail.workManName}</Text>

                        </View>

                        <View style={styles.right}>
                            <Image style={{height:22,width:22,resizeMode: 'stretch'}} source={require('../../img/right_l.png')}/>

                            <Text textAlign='right'
                                  style={{fontSize:15,color:'#323232',marginRight:4}}>{this.props.detail.processState}</Text>

                        </View>
                    </View>
                {/*</TouchableOpacity>*/}

                {/*<View style={styles.close}>*/}
                    {/*<TouchableOpacity activeOpacity={0.5} onPress={()=>this.delete()}>*/}
                        {/*<Image style={{height:22,width:22,resizeMode: 'stretch',}} source={require('../image/icon_close.png')}/>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}

            </View>
        );
    }

    onClick(){
        this.props.onClick();
    }

    delete(){
        this.props.onDelete();
    }
}

var styles = StyleSheet.create({
    container:{
        height:60,
        backgroundColor:'#FFFFFF',
        flexDirection:'row'
    },
    close:{
        width:22,
        height:22,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'transparent',
        flex:1,
        bottom:55,
        left:2,
        right:0,
        position: 'absolute'
    },
    icon:{
        width:40,
        height:40,
        borderRadius:20
    },
    left:{
        flex:4,
        marginLeft:15,

        justifyContent:'center',
        alignItems:'center'
    },
    center:{
        flex:2,
        justifyContent:'center'
    },
    right:{
        flex:2,
        flexDirection:'row-reverse',
        marginRight:15,
        alignItems:'center'

    }
});

module.exports = RegisterCompanyCell;