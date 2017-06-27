/**
 * 客户信息
 * Created by jiaxueting on 2017/6/16.
 */

import React, {Component,PropTypes} from 'react';
import {Text, TextInput, View, Platform, Image,} from "react-native";
import styles from "../css/GetLicenseStyle";

export default class CompanyInfoView extends Component {

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
        this.props.callback(content);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.registerNumStyle}>
                    <Text style={[{
                        marginLeft : 15,fontSize:15},
                        this.props.inputWidth,]}>{this.props.textName}</Text>
                <View style={styles.textInputContainer}>
                    <View style={[styles.textInputWrapper,this.props.winWidth,]}>
                        <TextInput underlineColorAndroid='transparent'
                                   value={this.state.content}
                                   editable={this.props.textEditable}
                                   style={styles.textInput} placeholder='' returnKeyType='next'
                                   onChangeText={
                                       (legalPerson) => {
                                           this.setState({content:legalPerson});
                                           this._inputContent(legalPerson);
                                       }
                                   }/>
                    </View>
                </View>
                </View>

            </View>

        )};

}