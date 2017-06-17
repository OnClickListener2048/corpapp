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
        this.state = { content: '',
        textName:this.props.textName,};

    }

    static propTypes = {
        //style: PropTypes.object,
        textName: PropTypes.string,
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.registerNumStyle}>
                    <Text style={{
                        marginLeft : 15,
                        width:110,fontSize:15}}>{this.props.textName}</Text>
                <View style={styles.textInputContainer}>
                    <View style={styles.textInputWrapper}>
                        <TextInput underlineColorAndroid='transparent' value={this.state.content}
                                   style={styles.textInput} placeholder='' returnKeyType='next'
                                   onChangeText={
                                       (legalPerson) => {
                                           this.setState({legalPerson});
                                       }
                                   }/>
                    </View>
                </View>
                </View>

            </View>

        )};

}