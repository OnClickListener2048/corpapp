/**
 * 多行输入框
 */

import React, {Component,PropTypes} from 'react';
import {Text, TextInput, View, Platform, Image,StyleSheet} from "react-native";
import styles from "../css/GetLicenseStyle";
import px2dp from '../../util'
import {SCREEN_WIDTH as width} from '../../config';

export default class MultiTextInputView extends Component {

    constructor(props) {
        super(props);
        this.state = { content: this.props.content,
        textName:this.props.textName,
            inputWidth:this.props.inputWidth,
            winWidth:this.props.winWidth,
            textEditable:this.props.textEditable};
    }

    static propTypes = {
        //style: PropTypes.object,
        textName: PropTypes.string,
        inputWidth:PropTypes.object,
        winWidth:PropTypes.object,
        content:PropTypes.string,
        textEditable:PropTypes.bool,
    };

    _inputContent(content){
        if(this.props.callback)
            this.props.callback(content);
    }

    render(){
        return(
            <View style={[styles.container,]}>
                <View style={styles.registerNumStyle}>
                    <Text style={[{
                        marginLeft : 15,fontSize:15,marginTop:5},
                        this.props.inputWidth,]}>{this.props.textName}</Text>
                <View style={stylesMulti.inputArea}>
                        <TextInput underlineColorAndroid='transparent'
                                   multiline={true}
                                   numberOfLines={3}
                                   value={this.state.content}
                                   editable={this.props.textEditable}
                                   style={stylesMulti.textInputMultiLine} placeholder='' returnKeyType='next'
                                   onChangeText={
                                       (legalPerson) => {
                                           this.setState({content:legalPerson});
                                           this._inputContent(legalPerson);
                                       }
                                   }/>
                </View>
                </View>
            </View>

        )};

}

const stylesMulti = StyleSheet.create({

    inputArea: {
        height: px2dp(110),
        width: width- 110,
        justifyContent: 'flex-start',
        marginLeft: 0,
        marginTop: 0,
        alignItems: 'flex-start',
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 0.5,
    },
    textInputMultiLine: {
        flex: 1,
        width: width - 110,
        marginLeft: px2dp(0),
        padding: 0,
        fontSize: px2dp(30),
        textAlign: 'left',
        color:'#323232',
    },
});