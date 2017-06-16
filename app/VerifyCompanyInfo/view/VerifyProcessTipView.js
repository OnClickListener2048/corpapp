/**
 * Created by jinglan on 2017/6/14.
 */

import React, {PropTypes,Component} from 'react';
import {View, Text,Image,Dimensions,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    Alert,} from 'react-native';
// import styles from '../style/SubViewStyle'

import DottedLine from '../view/DottedLine'
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;


class VerifyProcessTipView extends Component{


    constructor(props) {
        super(props)
        this.state = {
            tipArr: this.props.tipArr,
            messageTitle: this.props.messageTitle,
            currentNum: this.props.currentNum


        }
    }

    static propTypes = {
        tipArr: PropTypes.array,
        messageTitle: PropTypes.string,
        currentNum: PropTypes.number
    };

    _circleNormalView(i){
        return <View style={{height:15 + 15,width:15 + 20,alignItems:'center', backgroundColor:'white', justifyContent:'center'}}>
            <View style={{height:15,width:15,borderRadius:7.5 ,backgroundColor:'#e6e6e6'}}>

            </View>

        </View>

    }

    _circleRedView(i){
        return <View style={{height:15 + 15,width:15 + 20,alignItems:'center', justifyContent:'center'
        }}>
            <View style={{height:15,width:15,borderRadius:7.5,backgroundColor:'#e5151d'}}>

            </View>

            </View>

    }

    _renderCircleTipView(i) {

        if (i > this.props.currentNum){
            return <View>{this._circleNormalView(i)}</View>


        }else {
            return <View>{this._circleRedView(i)}</View>



       }


    }

    _renderLineView(){

        return <DottedLine style={{height : 1, flex: 1,alignItems:'center',justifyContent:'center', backgroundColor :'#c8c8c8'}}
                           dottedLineWidth={(SCREEN_WIDTH - (15 + 20)* 3 - 43 * 2)/2} grayWidth={2} whiteWidth={2}/>
    }


    render(){
        const { messageTitle,tipArr,currentNum} = this.state

        return(

            <View style={{backgroundColor:'#FFFFFF'}}>
                {/*<TouchableOpacity activeOpacity={0.8} onPress={()=>this.onClick()}>*/}
                <View style={styles.processImgTipView}>
                    {this._renderCircleTipView(0)}
                    {this._renderLineView()}
                    {this._renderCircleTipView(1)}
                    {this._renderLineView()}
                    {this._renderCircleTipView(2)}
                </View>


                <View style={styles.titleContainer}>

                    <Text style={{fontSize:15,width:80, textAlign:'center', justifyContent: 'center',color:'#323232'}}>{'确认材料'}</Text>
                    <Text style={{fontSize:15,width:80,textAlign:'center', justifyContent: 'center',color:'#323232'}}>{'开始任务'}</Text>
                    <Text style={{fontSize:15,width:80,textAlign:'center', justifyContent: 'center',color:'#323232'}}>{'结束任务'}</Text>


                </View>


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
        height:50,
        marginTop: 5,

        backgroundColor:'#FFFFFF',
        flexDirection:'row'
    },
    processImgTipView:{
        height:50,
        marginTop: 5,
        marginLeft: 43,
        marginRight: 43,
        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        alignItems:'center'
    },
    titleContainer:{
        marginLeft: 20.5,
        marginRight: 20.5,
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
        flexDirection:'row'
    }
});

module.exports = VerifyProcessTipView;