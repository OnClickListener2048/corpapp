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
            statusIconBg: this.props.statusIconBg,

        }
    }

    static propTypes = {
        statusIcon: PropTypes.string,
        statusName: PropTypes.string,
        companyName: PropTypes.string,
        statusContent: PropTypes.string,
        statusCourse: PropTypes.string,
        statusIconBg: PropTypes.string,


    };

    render() {
        const {statusIcon,statusName,companyName,statusContent,statusCourse,statusIconBg} = this.state
        return (
            <View
                style={styles.rowStyle}>
                <View
                    style={styles.realRowStyle}>
                    <View
                        style={styles.titleViewStyle}>
                        <Text
                            textAlign='left'
                            style={[{fontSize: 17,marginTop: 15, marginLeft : 20 , color : '#323232'}] }>{statusName}</Text>
                        <Text
                            textAlign='left'
                            style={[{fontSize: 14,marginTop: 10, marginLeft :20 , color : '#969696'}] }>{companyName}</Text>
                    </View>
                    <Text
                        textAlign='center'
                        style={[styles.timeTitleStyle,{marginRight:30,color:'#323232'}]}>{statusContent}</Text>

                    <Text
                        textAlign='right'
                        style={[styles.timeTitleStyle]}>{statusCourse}</Text>
                </View>
                <View style={[styles.badgeBubble,
                    {backgroundColor: statusIconBg}]}>
                    <Text style={styles.badgeText}>{statusIcon}</Text>
                </View>
            </View>
        )
    }
}