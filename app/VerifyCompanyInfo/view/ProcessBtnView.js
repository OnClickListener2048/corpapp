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
            finished : this.props.finished,
            inProgress : this.props.inProgress,
            materialConfirm : this.props.materialConfirm,
            titleArr :['确认材料','开始任务','完成','完成'],
            currentNum: 0,
            stepId:this.props.stepId,          //步骤 ID
            taskId:this.props.taskId,          //步骤 ID
            currentName : ''

        }

        this.btnClick = this.btnClick.bind(this);

    }

    static propTypes = {
        finished : PropTypes.bool,
        inProgress : PropTypes.bool,
        materialConfirm : PropTypes.bool,
        stepId : PropTypes.string,
        taskId : PropTypes.string,

    };


    btnClick() {

            // 使用原始的DOM API来聚焦输入框。
        let loading = SActivityIndicator.show(true, "加载中...");

        console.log("finishedhaha" , this.state.materialConfirm);
        console.log("inProgresshaha" , this.state.inProgress);
        console.log("materialConfirmhaha" , this.state.materialConfirm);

            apis.loadOutSourceTaskStepChange(this.state.inProgress ? true : false,this.state.materialConfirm ? true : false,true ,this.state.stepId,this.state.taskId).then(

            (responseData) => {
                 SActivityIndicator.hide(loading);

                this.setState({

                     finished : responseData.data.finished === "true",
                     inProgress : responseData.data.inProgress=== "true",
                     materialConfirm : responseData.data.materialConfirm === "true",
                    currentNum : (responseData.data.finished === 'true') ? 3 : (responseData.data.inProgress === 'true') ? 2 : (responseData.data.materialConfirm === 'true') ? 1 : 0,
                });
                this.props.callback(this.state.currentNum);


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


        if (this.state.currentNum < this.state.titleArr.length) {      // 无数据
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
        const {finished,inProgress,materialConfirm,stepId,taskId} = this.state
        if (finished === 'true'){
            this.state.countNum = 3;
        }else if (inProgress === 'true'){
            this.state.countNum = 2;
        }else if (materialConfirm === 'true'){
            this.state.countNum = 1;
        }else{
            this.state.countNum = 0;
        }

        this.state.finished = finished;
        this.state.inProgress = inProgress;
        this.state.materialConfirm = materialConfirm;

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