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
            isRefresh:true,
        }
        this.setCompanyInfo = this.setCompanyInfo.bind(this);
        this.setRefresh = this.setRefresh.bind(this);
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

    setCompanyInfo(companyName,ContactsName,ContactsPhone,SalesName,SalesPhone,isFocusData) {
        this.setState({
            companyName: companyName,
            ContactsName:ContactsName,
            ContactsPhone:ContactsPhone,
            SalesName:SalesName,
            SalesPhone:SalesPhone,
            isFocusData:isFocusData,

        });
    }


    _callPhone(phoneNumber) {

        if ( phoneNumber === null || phoneNumber === undefined){
            console.log("phoneNumber是空");
            return;

        }else if (phoneNumber.includes('*')) {
            return;
        }
        else if (phoneNumber.length > 0 &&   ((phoneNumber.match(/^([0-9]{11})?$/)) !== null)){
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

    setRefresh(refresh,companyName,ContactsName,ContactsPhone) {
        console.log("contactsphone="+ContactsPhone);
        this.setState({isRefresh : refresh,
            companyName:companyName,
        ContactsName:ContactsName,
        ContactsPhone:ContactsPhone});
    }

    componentWillReceiveProps(props) {

        if(this.state.isRefresh===true){
            console.log("....."+this.state.isRefresh);
            this.setState({isRefresh : false,
                companyName:props.companyName,
                ContactsName:props.ContactsName,
                ContactsPhone:props.ContactsPhone,});
        }
    }

    render() {
       // const { style} = this.props
        const {companyName,ContactsName,ContactsPhone,SalesName,SalesPhone} = this.props

        if(this.state.isRefresh || !this.state.isRefresh){
            console.log("isrefresh" + this.state.ContactsPhone);
        return (
            <View
                style={styles.companyInfoViewContainer}>

                {<View style={[{height:10}]}></View>}


                <View
                    style={styles.companyNameRowStyle}>

                    <View
                        style={[{width:SCREEN_WIDTH - 30 , height: 35, alignItems:'center',  flexDirection: 'row'}]}>

                        <Text
                            textAlign='right'
                            style={[{fontSize: 15,alignSelf:'center',color:'#323232'}] }>{'公司名称：'}</Text>
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
                                    marginLeft: 0,
                                    height: 20,
                                    color: '#323232',
                                    marginRight: 60
                                }] }>{this.state.companyName}</Text>}


                        </View>


                </View>

                <View
                    style={styles.companyInfoRowStyle}>

                    <View
                        style={styles.companyInfoRowSubViewStyle}>

                        <Text
                            textAlign='center'
                            style={[{fontSize: 15,alignSelf:'center',color:'#323232'}] }>{'联  系  人：'}</Text>
                        {this.props.isFocusData?
                            <View textAlign='left'
                                  style={[styles.contactNmaeInputWrapper, {marginTop: 3}]}>
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
                                }]}>{this.state.ContactsName}</Text>}

                        </View>
                    <View
                        style={styles.companyInfoRowPhoneStyle}>
                        {this.props.isFocusData?
                        <View
                            style={[{
                                  alignItems:'center',width:155,flexDirection:'row',height:30}]}>
                            <Text style={{fontSize: 15,color:'#323232'}}>电话：</Text>
                            <TextInput
                                underlineColorAndroid='transparent' value={this.state.ContactsPhone}
                                style={{width: 110,
                                    marginRight: 0,
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
                            <View
                                style={[{
                                    alignItems:'center',width:155,flexDirection:'row',height:30}]}>
                                <Text style={{fontSize: 15,color:'#323232'}}>电话：</Text>
                                <Text
                                    textAlign='right'
                                    numberOfLines={1}

                                    style={[{width: 110,
                                        marginRight: 0,
                                        padding: 4,
                                        flex:1,
                                        fontSize: 15,
                                        color:'#323232',}]}>{this.state.ContactsPhone}</Text>

                        </View>}
                        {this.props.isFocusData===true||ContactsPhone.includes('*')?
                            <Image
                                source={require('../../img/phone.png')}
                                style={[{
                                    resizeMode: "contain",
                                    alignSelf: 'center',
                                    marginRight : 0,
                                }
                                ]
                                }

                            />:
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
                            }


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
                            style={[{fontSize: 15, marginLeft : 0,alignSelf:'center',color:'#323232'}] }>：{SalesName}</Text>
                    </View>
                    <View
                        style={styles.companyInfoRowPhoneStyle}>


                        <View
                            style={[{
                                alignItems:'center',width:155,flexDirection:'row',height:30}]}>
                            <Text style={{fontSize: 15,color:'#323232'}}>电话：</Text>
                            <Text
                                textAlign='right'
                                numberOfLines={1}

                                style={[{width: 110,
                                    marginRight: 0,
                                    padding: 4,
                                    flex:1,
                                    fontSize: 15,
                                    color:'#323232',}] }>{SalesPhone}</Text>

                        </View>
                        {this.props.isFocusData===true||ContactsPhone.includes('*') ?
                            <Image
                                source={require('../../img/phone.png')}
                                style={[{
                                resizeMode: "contain",
                                alignSelf: 'center',
                                marginRight : 0
                            }
                            ]
                            }

                            />:
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
                        </TouchableOpacity>}

                    </View>

                </View>



            </View>
        )}
    }
}

//textStyle, {color: textStyle.color}]