import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback, Platform, Image, TouchableOpacity} from 'react-native';
import px2dp from '../../util/index';

// 清空记录按钮
export default class ClearHistoryButton extends Component {
    static propTypes = {
        isEnabled: PropTypes.bool, // 是否启用
        onPress: PropTypes.func, // 点击事件
        text: PropTypes.string, // 按钮文本
    };

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.buttonViewEnabled}>
                <Image source={require('../../img/delet.png')}/>
                <Text style={styles.loginText}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
            // <Button
            //     style={styles.buttonViewEnabled}
            //     disabledStyle={styles.buttonView}
            //     onPress={this.props.onPress}
            //     isDisabled={false}
            //     textStyle={styles.loginText}>
            //     {this.props.text}
            // </Button>
        );
    }
}

const styles = StyleSheet.create({
    buttonViewEnabled: {
        flex:1,
        flexDirection:'row',
        backgroundColor: '#FAFAFA',
        margin: 0,
        borderRadius: 6,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems:'center',
        height: px2dp(88),
        width: px2dp(550),
        marginTop: px2dp(45),
        borderWidth: 0.5,
        borderColor:'#DCDCDD'
    },

    loginText: {
        fontSize: 15,
        color: '#C8C8C8',
        marginTop: 10,
        marginBottom: 10,
        marginLeft:13,
        textAlign: 'center'
    },
});