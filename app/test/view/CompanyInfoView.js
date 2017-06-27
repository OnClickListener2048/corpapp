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
        }
    }

    static propTypes = {
        //style: PropTypes.object,
        companyName: PropTypes.string,
        ContactsName:PropTypes.string,
        ContactsPhone:PropTypes.string,
        SalesName:PropTypes.string,
        SalesPhone:PropTypes.string,
    };

    _callPhone(phoneNumber) {

        return Linking.openURL('tel:'+ phoneNumber);


    }

    _inputContent(content){
        this.props.callback(content);
    }

    render() {
       // const { style} = this.props
        const {ContactsName,ContactsPhone,SalesName,SalesPhone} = this.state
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
                            <View textAlign='left'
                                  style={styles.textInputWrapper}>
                                <TextInput
                                    underlineColorAndroid='transparent' value={this.state.companyName}
                                    style={styles.textInput} placeholder='' returnKeyType='next'
                                    onChangeText={
                                        (legalPerson) => {
                                            this.setState({companyName: legalPerson});
                                            this._inputContent(legalPerson);
                                        }
                                    }/>
                            </View>
                            {/*<Text*/}
                                {/*textAlign='left'*/}
                                {/*numberOfLines={1}*/}
                                {/*style={[{*/}
                                    {/*fontSize: 15,*/}
                                    {/*marginTop: 10,*/}
                                    {/*marginLeft: 0,*/}
                                    {/*color: '#323232',*/}
                                    {/*marginRight: 60*/}
                                {/*}] }>: {companyName}</Text>*/}

                        </View>


                </View>

                <View
                    style={styles.companyInfoRowStyle}>

                    <View
                        style={styles.companyInfoRowSubViewStyle}>

                        <Text
                            textAlign='center'
                            style={[{fontSize: 15,alignSelf:'center',color:'#323232'}] }>{'联 系 人 ：'}</Text>
                            <View textAlign='left'
                                  style={[styles.textInputWrapper, {marginTop: 3}]}>
                                <TextInput
                                    underlineColorAndroid='transparent' value={this.state.ContactsName}
                                    style={styles.textInput} placeholder='' returnKeyType='next'
                                    onChangeText={
                                        (legalPerson) => {
                                            this.setState({companyName: legalPerson});
                                            this._inputContent(legalPerson);
                                        }
                                    }/>
                            </View>
                            {/*<Text*/}
                                {/*textAlign='left'*/}
                                {/*numberOfLines={1}*/}
                                {/*style={[{*/}
                                    {/*fontSize: 15,*/}
                                    {/*alignSelf: 'center',*/}
                                    {/*marginLeft: 2.5,*/}
                                    {/*marginRight: 0,*/}
                                    {/*color: '#323232'*/}
                                {/*}] }>: {ContactsName}</Text>*/}

                        </View>
                    <View
                        style={styles.companyInfoRowPhoneStyle}>


                        <Text
                            textAlign='right'
                            numberOfLines={1}

                            style={[{fontSize: 15, marginRight : 16,alignSelf:'center',color:'#323232'}] }>电话: {ContactsPhone}</Text>
                        <TouchableOpacity onPress={() => {this._callPhone(ContactsPhone)}}>
                        <Image
                            source={require('../../img/phone.png')}
                            style={[{
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

                            style={[{fontSize: 15, marginRight : 16,alignSelf:'center',color:'#323232'}] }>电话: {SalesPhone}</Text>

                        <TouchableOpacity onPress={() => {this._callPhone(SalesPhone)}}>
                        <Image
                            source={require('../../img/phone.png')}
                            style={[{
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