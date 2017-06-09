/**
 * Created by jinglan on 2017/6/9.
 */

import React, {PropTypes} from 'react';
import {View, Text,Image} from 'react-native';
import styles from '../css/MessageCenterStyle'

export default class MessageCenterCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messageIcon: this.props.messageIcon,
            messageTitle: this.props.messageTitle,
            messageSubTitle: this.props.messageSubTitle,
            messageTime: this.props.messageTime

        }
    }

    static propTypes = {
        messageIcon: PropTypes.string,
        messageTitle: PropTypes.string,
        messageSubTitle: PropTypes.string,
        messageTime: PropTypes.number
    };


    render() {
         // const { style} = this.props
        const {messageTitle, messageSubTitle,messageTime} = this.state
        return (
            <View
                style={styles.rowStyle}>



                <View
                    style={styles.realRowStyle}>



                    <View
                        style={styles.titleViewStyle}>




                        <Text
                            textAlign='center'
                            style={[{fontSize: 12,marginTop: 15, marginLeft : 22.5}] }>{messageTitle}</Text>

                        <Text
                            textAlign='center'
                            style={[{fontSize: 12,marginTop: 10, marginLeft : 22.5}] }>{messageSubTitle}</Text>



                    </View>

                    <Text
                        textAlign='center'
                        style={[{fontSize: 12,marginTop: 10, marginRight : 15}] }>{messageTime}</Text>


                </View>




            </View>
        )
    }
}

//textStyle, {color: textStyle.color}]