/**
 * Created by jinglan on 2017/6/19.
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


class ProcessBtnView extends Component{


    constructor(props) {
        super(props)
        this.state = {
            // messageTitle: this.props.messageTitle,
             currentNum: this.props.currentNum,
             btnTitle : '确认材料'


        }

        this.ProcessBtnTitle = <Text style={{fontSize:15,width:80, textAlign:'center', justifyContent: 'center',color:'#FFFFFF'}}>
            {this.state.btnTitle}</Text>

        this.ProcessBtn =  <View  style={{marginRight: 15,height:40,
            width:90,marginTop: 20,borderRadius:2.5 ,alignItems:'center', backgroundColor:'#e5151b', justifyContent:'center'}}>
            {this.ProcessBtnTitle}
        </View>;


        this.btnClick = this.btnClick.bind(this);

    }

    static propTypes = {
        currentNum: PropTypes.number
    };


    btnClick() {
        // 使用原始的DOM API来聚焦输入框。

        console.log("点我呀点我呀");


        this.setState({ btnTitle: '呵呵' });

    }


    render(){
        const {currentNum} = this.state

        return(

            <View style={{backgroundColor:'#FFFFFF',width: SCREEN_WIDTH,height :80 ,flexDirection:'row-reverse'}}>
                {/*<TouchableOpacity activeOpacity={0.8} onPress={()=>this.onClick()}>*/}

                <TouchableOpacity onPress={this.btnClick}>
                    {this.ProcessBtn}
                </TouchableOpacity>







            </View>
        );
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

module.exports = ProcessBtnView;