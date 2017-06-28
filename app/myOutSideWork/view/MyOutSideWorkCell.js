/**
 * 我的外勤item布局
 * Created by jiaxueting on 2017/6/14.
 */

import React,{Component,PropTypes}from 'react';
import styles from "../css/MyOutSideWorkStyle";
import {Image, Text, View} from "react-native";


export default class MessageCenterCell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusIcon: this.props.statusIcon,
            statusName: this.props.statusName,
            companyName: this.props.companyName,
            statusContent: this.props.statusContent,
            statusCourse: this.props.statusCourse,

        }
    }

    static propTypes = {
        statusIcon: PropTypes.string,
        statusName: PropTypes.string,
        companyName: PropTypes.string,
        statusContent: PropTypes.string,
        statusCourse: PropTypes.string,


    };

    // _statusCourse(){
    //     if(this.state.statusCourse==0){
    //         return '待处理'
    //     }else if(this.state.statusCourse==1){
    //         return '进行中'
    //     }else if(this.state.statusCourse==2){
    //         return '已完成'
    //     }else if(this.state.statusCourse==3){
    //         return '已取消'
    //     }
    // }

    _statusCourseColor(){
        if(this.state.statusCourse=='待处理'||this.state.statusCourse=='待分配'){
            return 'orange'
        }else if(this.state.statusCourse=='进行中'){
            return 'green'
        }else if(this.state.statusCourse=='已完成'){
            return 'red'
        }else if(this.state.statusCourse=='已取消'){
            return 'grey'
        }
    }

    render() {
        const {statusIcon,statusName,companyName,statusContent,statusCourse} = this.state
        return (
            <View
                style={styles.rowStyle}>
                <View
                    style={styles.realRowStyle}>
                    <View
                        style={styles.titleViewStyle}>
                        <Text
                            textAlign='left'
                            numberOfLines={1}
                            style={[{fontSize: 17,marginTop: 15, marginLeft : 20 , color : '#323232'}] }>{statusName}</Text>
                        <Text
                            textAlign='left'
                            numberOfLines={1}
                            style={[{fontSize: 14,marginTop: 10, marginLeft :20 , color : '#969696'}] }>{companyName}</Text>
                    </View>
                    <Text
                        textAlign='center'
                        style={[styles.timeTitleStyle,{marginRight:20,color:'#323232'}]}>{statusContent}</Text>

                    <Text
                        textAlign='right'
                        style={[styles.timeTitleStyle]}>{statusCourse}</Text>
                </View>
                <View style={[styles.badgeBubble,
                    {backgroundColor: this._statusCourseColor()}]}>
                    <Text style={styles.badgeText}>{statusIcon}</Text>
                </View>
            </View>
        )
    }
}