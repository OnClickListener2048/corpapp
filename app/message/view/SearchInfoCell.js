/**
 * Created by jinglan on 2017/9/11.
 */
import React, {PropTypes} from 'react';
import {View, Text,Platform,Image,StyleSheet, Dimensions} from 'react-native';
const window = Dimensions.get('window');
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

export default class SearchInfoCell extends React.Component {
    constructor(props) {
        super(props)

    }

    static propTypes = {
        messageName: PropTypes.string,
        messageTitle: PropTypes.string,
        messageSubTitle: PropTypes.string,
        messageTime: PropTypes.string
    };

    render() {
        // const { style} = this.props
        const {messageTitle, messageSubTitle,messageTime,messageName} = this.props
        return (
            <View
                style={styles.rowStyle}>

                <View
                    style={styles.titleViewStyle}>

                    <Text
                        textAlign='left'
                        numberOfLines={1}
                        style={[{fontSize: 14,flex:1,marginTop: Platform.OS==='ios'?5:0, marginLeft : 0 ,color : '#646464'}] }>{messageTitle}</Text>

                    <Text
                        textAlign='right'
                        style={[{fontSize: 14,marginTop: Platform.OS==='ios'?5:0, marginRight : 0 ,color : '#646464'}] }>{messageName}</Text>

                </View>


                <View
                    style={styles.subtitleViewStyle}>
                    <Text
                        textAlign='left'
                        numberOfLines={1}
                        style={[{fontSize: 14,flex:1,marginTop: Platform.OS==='ios'?4:0, marginLeft : 0 ,color : '#646464'}] }>{messageSubTitle}</Text>

                    <Text
                        textAlign='right'
                        style={[{fontSize: 14,marginTop: Platform.OS==='ios'?4:0, marginRight : 0 ,color : '#646464'}] }>{messageTime}</Text>

                </View>



            </View>
        )
    }
}


const styles = StyleSheet.create({


    rowStyle: {
        height : 80,
        marginLeft: 15,
        width:SCREEN_WIDTH - 30,
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
        borderBottomColor:'#dcdcdc',
        borderBottomWidth:0.5,

    },


    titleViewStyle: {
        marginTop: 12,
        marginLeft: 0,
        marginRight: 0,
        width:SCREEN_WIDTH - 30,
        height : 24,
        flexDirection: 'row',
    },

    subtitleViewStyle: {
        marginTop: 5,
        marginLeft: 0,
        marginRight: 0,
        width:SCREEN_WIDTH - 30,
        height : 24,
        flexDirection: 'row',

    },

    lineViewContainer: {
        height: 0.5,
        width: SCREEN_WIDTH - 30,
        marginLeft: 15,
        // marginTop:79,
        backgroundColor: '#E6E6E6',
    },

})