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
        messageIcon: PropTypes.number,
        messageTitle: PropTypes.string,
        messageSubTitle: PropTypes.string,
        messageTime: PropTypes.string
    };


    render() {
         // const { style} = this.props
        const {messageTitle, messageSubTitle,messageTime,messageIcon} = this.state
        return (
            <View
                style={styles.rowStyle}>






                <View
                    style={styles.realRowStyle}>
                    <Image
                        source={messageIcon}
                        style={[{
                            resizeMode: "contain",
                            width: 25,
                            height:25,
                            marginLeft: -12.5,
                            alignSelf: 'center',

                        }
                        ]
                        }

                    />

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




            </View>
        )
    }
}

//textStyle, {color: textStyle.color}]