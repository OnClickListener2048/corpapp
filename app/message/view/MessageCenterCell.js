/**
 * Created by jinglan on 2017/6/9.
 */

import React, {PropTypes} from 'react';
import {View, Text,Image} from 'react-native';
import styles from '../css/MessageCenterStyle'

export default class MessageCenterCell extends React.Component {
    constructor(props) {
        super(props)

    }

    static propTypes = {
        messageIcon: PropTypes.number,
        messageTitle: PropTypes.string,
        messageSubTitle: PropTypes.string,
        messageTime: PropTypes.string
    };

    render() {
         // const { style} = this.props
        const {messageTitle, messageSubTitle,messageTime,messageIcon} = this.props
        return (
            <View
                style={styles.rowStyle}>
                <View
                    style={styles.realRowStyle}>

                    <View
                        style={styles.titleViewStyle}>

                        <Text
                            textAlign='left'
                            style={[{fontSize: 12,marginTop: 15, marginLeft : 0 , color : '#323232'}] }>{messageTitle}</Text>

                        <Text
                            textAlign='left'
                            style={[{fontSize: 12,marginTop: 10, marginLeft :0 , color : '#969696'}] }>{messageSubTitle}</Text>

                    </View>
                    <Text
                        textAlign='right'
                        style={styles.timeTitleStyle}>{messageTime}</Text>
                </View>
        <Image
            source={messageIcon}
            style={[{
                resizeMode: "contain",
                position:'absolute',
                width: 25,
                height:25,
                marginLeft:17,
                marginTop:21,
            }]}
        />
            </View>
        )
    }
}

//textStyle, {color: textStyle.color}]