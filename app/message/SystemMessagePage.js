/**
 * Created by jinglan on 2017/6/28.
 */
import React, { Component,PropTypes } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager
} from 'react-native';


export default class SystemMessagePage extends Component{
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    constructor(props) {
        super(props);
        this.state = {
            contentJson:this.props.contentJson,
            contentStr:'',

        };
        this.stepsArr = [];
        this.info;

    }

    static propTypes = {
        contentJson: PropTypes.string
    };



    render() {
        const {contentJson} = this.state;
        // let content = JSON.parse(contentJson);
        // console.log('contentJson ===' + content)
        //
        // console.log('index ===' + content.content)

        return(
            <View style={styles.sysContainer}>

                <Text
                    textAlign='left'
                    style={[{fontSize: 12,marginTop: 15, marginLeft : 15,marginRight : 15 , color : '#323232'}] }>{contentJson}</Text>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    sysContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column'
    },

    // companyInfoRowSubViewStyle: {
    //     maxWidth: SCREEN_WIDTH/2 - 15,
    //     width: SCREEN_WIDTH/2 - 15,
    //     height: 30,
    //     marginLeft : 0,
    //     marginRight : 0,
    //     flexDirection: 'row',
    // },
    // companyInfoRowPhoneStyle: {
    //     maxWidth: SCREEN_WIDTH/2 - 15,
    //     width: SCREEN_WIDTH/2 - 15,
    //     height: 30,
    //     marginLeft : 0,
    //     marginRight : 0,
    //     flexDirection: 'row',
    //     justifyContent:'flex-end'
    //
    // }

});