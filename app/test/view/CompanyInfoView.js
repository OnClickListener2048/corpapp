/**
 * Created by jinglan on 2017/6/12.
 */


import React, {PropTypes} from 'react';
import {View, Text, Image, Dimensions, Linking, TouchableOpacity, TextInput} from 'react-native';
import styles from '../style/SubViewStyle'


const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

export default class CompanyInfoView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: this.props.companyName,
            ContactsName: this.props.ContactsName,
            ContactsPhone: this.props.ContactsPhone,
            SalesName: this.props.SalesName,
            SalesPhone: this.props.SalesPhone,
            isFocusData:this.props.isFocusData,
        }
    }

    static propTypes = {
        //style: PropTypes.object,
        companyName: PropTypes.string,
        ContactsName:PropTypes.string,
        ContactsPhone:PropTypes.string,
        SalesName:PropTypes.string,
        SalesPhone:PropTypes.string,
        isFocusData:PropTypes.bool,
    };

    _callPhone(phoneNumber) {

        if (phoneNumber.includes('*')) {
            return;
        } else {
            return Linking.openURL('tel:' + phoneNumber);
        }

    }

    _inputContentCom(contentComp){
        this.props.callbackCom(contentComp);
    }

    _inputContentCon(contentCon){
        this.props.callbackCon(contentCon);
    }

    _inputContentPho(contentPho){
        this.props.callbackPho(contentPho);
    }

    render() {
       // const { style} = this.props
        const {companyName,ContactsName,ContactsPhone,SalesName,SalesPhone} = this.state
        return (
            <View
                style={styles.companyInfoViewContainer}>



                <View
                    style={styles.companyInfoRowStyle}>

                    <View
                        style={[{width:SCREEN_WIDTH - 30 , height: 35,   flexDirection: 'row'}]}>

                        <Text
                            textAlign='right'
                            style={[{fontSize: 15,marginTop: 10,color:'#323232'}] }>{'公司名称：'}</Text>
                        {this.props.isFocusData?
                            <View textAlign='left'
                                  style={styles.textInputWrapper}>
                                <TextInput
                                    underlineColorAndroid='transparent' value={this.state.companyName}
                                    style={styles.textInput} placeholder='' returnKeyType='next'
                                    onChangeText={
                                        (legalPerson) => {
                                            this.setState({companyName: legalPerson});
                                            this._inputContentCom(legalPerson);
                                        }
                                    }/>
                            </View>:
                            <Text
                                textAlign='left'
                                numberOfLines={1}
                                style={[{
                                    fontSize: 15,
                                    marginTop: 10,
                                    marginLeft: 0,
                                    color: '#323232',
                                    marginRight: 60
                                }] }>{companyName}</Text>}


                        </View>


                </View>

                <View
                    style={styles.companyInfoRowStyle}>

                    <View
                        style={styles.companyInfoRowSubViewStyle}>

                        <Text
                            textAlign='center'
                            style={[{fontSize: 15,alignSelf:'center',color:'#323232'}] }>{'联 系 人 ：'}</Text>
                        {this.props.isFocusData?
                            <View textAlign='left'
                                  style={[styles.textInputWrapper, {marginTop: 3}]}>
                                <TextInput
                                    underlineColorAndroid='transparent' value={this.state.ContactsName}
                                    style={styles.textInput} placeholder='' returnKeyType='next'
                                    onChangeText={
                                        (legalPerson) => {
                                            this.setState({ContactsName: legalPerson});
                                            this._inputContentCon(legalPerson);
                                        }
                                    }/>
                            </View>:
                            <Text
                                textAlign='left'
                                numberOfLines={1}
                                style={[{
                                    fontSize: 15,
                                    alignSelf: 'center',
                                    marginLeft: 2.5,
                                    marginRight: 0,
                                    color: '#323232'
                                }] }>{ContactsName}</Text>}

                        </View>
                    <View
                        style={styles.companyInfoRowPhoneStyle}>
                        {this.props.isFocusData?
                        <View
                            style={[{
                                  alignItems:'center',width:155,flexDirection:'row',height:30}]}>
                            <Text style={{fontSize: 15,}}>电话：</Text>
                            <TextInput
                                underlineColorAndroid='transparent' value={this.state.ContactsPhone}
                                style={{width: 110,
                                    marginRight: 10,
                                    padding: 4,
                                    flex:1,
                                    fontSize: 15,
                                    color:'#323232',}} placeholder='' returnKeyType='next'
                                onChangeText={
                                    (legalPerson) => {
                                        this.setState({ContactsPhone: legalPerson});
                                        this._inputContentPho(legalPerson);
                                    }
                                }/>
                        </View>:
                        <Text
                            textAlign='right'
                            numberOfLines={1}

                            style={[{fontSize: 15, marginRight : 16,alignSelf:'center',color:'#323232'}] }>电话：{ContactsPhone}</Text>}
                        <TouchableOpacity onPress={() => {this._callPhone(ContactsPhone)}}>
                        <Image
                            source={ContactsPhone.includes('*') ?  require('../../img/phone.png') : require('../../img/phone_h.png')}
                            style={[{
                                resizeMode: "contain",
                                alignSelf: 'center',
                                marginRight : 0,
                            }
                            ]
                            }

                        />
                        </TouchableOpacity>


                    </View>

                </View>



                <View
                    style={styles.companyInfoRowStyle}>

                    <View
                        style={styles.companyInfoRowSubViewStyle}>

                        <Text
                            textAlign='right'
                            style={[{fontSize: 15,alignSelf:'center',color:'#323232'}] }>{'销售人员'}</Text>
                        <Text
                            textAlign='left'
                            numberOfLines={1}
                            style={[{fontSize: 15, marginLeft : 0,alignSelf:'center',color:'#323232'}] }>: {SalesName}</Text>
                    </View>
                    <View
                        style={styles.companyInfoRowPhoneStyle}>


                        <Text
                            textAlign='right'
                            numberOfLines={1}

                            style={[{fontSize: 15, marginRight : 16,alignSelf:'center',color:'#323232'}] }>电话：{SalesPhone}</Text>

                        <TouchableOpacity onPress={() => {this._callPhone(SalesPhone)}}>
                        <Image
                            source={ContactsPhone.includes('*') ?  require('../../img/phone.png') : require('../../img/phone_h.png')}                            style={[{
                                resizeMode: "contain",
                                alignSelf: 'center',
                                marginRight : 0
                            }
                            ]
                            }

                        />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        )
    }
}

//textStyle, {color: textStyle.color}]