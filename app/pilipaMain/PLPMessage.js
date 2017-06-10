/**
 * Created by edianzu on 2017/6/6.
 */

import React,{Component}from 'react';
import {Text, View,StyleSheet
,DeviceEventEmitter,} from "react-native";

export default class PLPMessage extends Component{

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    消息中心
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});