/**
 * Created by jinglan on 2017/6/19.
 */
import React, {PropTypes,Component} from 'react';
import {View, Text,Image,Dimensions,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    Alert,} from 'react-native';
const window = Dimensions.get('window');
import SActivityIndicator from '../../modules/react-native-sww-activity-indicator';
import * as apis from '../../apis';

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;


class ProcessBtnView extends Component{


    constructor(props) {
        super(props)
        this.state = {
            // messageTitle: this.props.messageTitle,
             currentNum: this.props.currentNum,
             countNum: 0,
             titleArr :['确认材料','开始任务','完成','完成'],
            finished : false,
            inProgress : false,
            materialConfirm : false,

        }

        this.btnClick = this.btnClick.bind(this);

    }

    static propTypes = {
        currentNum: PropTypes.number
    };


    btnClick() {
        // 使用原始的DOM API来聚焦输入框。
        let loading = SActivityIndicator.show(true, "加载中...");






        // export function loadOutSourceTaskStepChange(finished = 'false' , inProgress = 'false' , materialConfirm = 'false' , stepId = '' , taskId = '') {


            apis.loadOutSourceTaskStepChange('false','false','false','1','1').then(

            (responseData) => {
                SActivityIndicator.hide(loading);

                if(responseData !== null && responseData.data !== null) {
                    this.props.callback(this.state.currentNum);

                    this.state.countNum++;

                    this.setState({
                        currentNum:this.state.countNum,
                        finished : responseData.data.finished,
                        inProgress : responseData.data.inProgress,
                        materialConfirm : responseData.data.materialConfirm,

                    });

                }
            },
            (e) => {
                console.log("获取失败" , e);
                Toast.show('获取失败' + JSON.stringify(e));
                SActivityIndicator.hide(loading);

            },
        );



    }

    renderBtnView() {

        if (this.state.currentNum == this.state.titleArr.length - 1) {      // 无数据
            return(
                    <View  style={{marginRight: 15,height:40,
                        width:90,marginTop: 20,borderRadius:2.5 ,alignItems:'center', backgroundColor:'#e6e6e6', justifyContent:'center'}}>
                        <Text style={{fontSize:15,width:80, textAlign:'center', justifyContent: 'center',color:'#FFFFFF'}}>
                            {this.state.titleArr[this.state.currentNum]}</Text>
                    </View>
            );
        }


        if (this.state.currentNum < this.state.titleArr.length - 1) {      // 无数据
            return(
                <TouchableOpacity onPress={this.btnClick}>
                    <View  style={{marginRight: 15,height:40,
                        width:90,marginTop: 20,borderRadius:2.5 ,alignItems:'center', backgroundColor:'#e5151b', justifyContent:'center'}}>
                        <Text style={{fontSize:15,width:80, textAlign:'center', justifyContent: 'center',color:'#FFFFFF'}}>
                            {this.state.titleArr[this.state.currentNum]}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }



    render(){
        const {currentNum} = this.state
        this.state.countNum = currentNum;
        return(

            <View style={{backgroundColor:'#FFFFFF',width: SCREEN_WIDTH,height :80 ,flexDirection:'row-reverse'}}>
                    {this.renderBtnView()}

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