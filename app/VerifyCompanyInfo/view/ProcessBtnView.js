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

        }

        this.btnClick = this.btnClick.bind(this);

    }

    static propTypes = {
        finished : PropTypes.bool,
        inProgress : PropTypes.bool,
        materialConfirm : PropTypes.bool,
    };


    btnClick() {
        // 使用原始的DOM API来聚焦输入框。
        let loading = SActivityIndicator.show(true, "加载中...");






        // export function loadOutSourceTaskStepChange(finished = 'false' , inProgress = 'false' , materialConfirm = 'false' , stepId = '' , taskId = '') {


            apis.loadOutSourceTaskStepChange(false,false,true,'1','1').then(

            (responseData) => {
                 SActivityIndicator.hide(loading);
                 this.props.callback(this.state.currentNum);


                this.setState({

                     // finished : responseData.data.progress.finished,
                     // inProgress : responseData.data.progress.inProgress,
                     // materialConfirm : responseData.data.progress.materialConfirm,
                    // currentNum : (responseData.data.progress.finished == 'true') ? 3 : (responseData.data.progress.inProgress == 'true') ? 2 : (responseData.data.progress.materialConfirm == 'true') ? 1 : 0,
                    currentNum : 2,


            });

                if(responseData !== null && responseData.data !== null) {


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
        const {finished,inProgress,materialConfirm} = this.state
        if (finished == 'true'){
            this.state.countNum = 3;
        }else if (inProgress == 'true'){
            this.state.countNum = 2;
        }else if (materialConfirm == 'true'){
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