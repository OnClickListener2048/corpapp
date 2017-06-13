/**
 * Created by jinglan on 2017/6/12.
 */


import React, {PropTypes} from 'react';
import {View, Text,Image,Dimensions} from 'react-native';
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


    render() {
       // const { style} = this.props
        const {companyName,ContactsName,ContactsPhone,SalesName,SalesPhone} = this.state
        return (
            <View
                style={styles.companyInfoViewContainer}>



                <View
                    style={styles.companyInfoRowStyle}>

                    <View
                        style={[{width:SCREEN_WIDTH - 30 , height: 30,   flexDirection: 'row'}]}>

                        <Text
                            textAlign='right'
                            style={[{fontSize: 12,marginTop: 10}] }>{'公司名称'}</Text>
                        <Text
                            textAlign='left'
                            numberOfLines={1}
                            style={[{fontSize: 12,marginTop: 10, marginLeft : 0, marginRight: 60}] }>: {companyName}</Text>
                    </View>


                </View>

                <View
                    style={styles.companyInfoRowStyle}>

                    <View
                        style={styles.companyInfoRowSubViewStyle}>

                        <Text
                            textAlign='center'
                            style={[{fontSize: 12,marginTop: 10}] }>{'联 系 人 '}</Text>
                        <Text
                            textAlign='left'
                            numberOfLines={1}
                            style={[{fontSize: 12,marginTop: 10, marginLeft : 2.5,marginRight: 0}] }>: {ContactsName}</Text>
                    </View>
                    <View
                        style={styles.companyInfoRowSubViewStyle}>

                        <Text
                            textAlign='right'
                            numberOfLines={1}
                            style={[{fontSize: 12,marginTop: 10}] }>{'电话'}</Text>
                        <Text
                            textAlign='left'
                            numberOfLines={1}

                            style={[{fontSize: 12,marginTop: 10, marginLeft : 0, width: 98}] }>: {ContactsPhone}</Text>
                        <Image
                            source={require('../../img/phone.png')}
                            style={[{
                                resizeMode: "contain",
                                alignSelf: 'center',
                                marginLeft : 10
                            }
                            ]
                            }

                        />

                    </View>

                </View>



                <View
                    style={styles.companyInfoRowStyle}>

                    <View
                        style={styles.companyInfoRowSubViewStyle}>

                        <Text
                            textAlign='right'
                            style={[{fontSize: 12,marginTop: 10}] }>{'销售人员'}</Text>
                        <Text
                            textAlign='left'
                            numberOfLines={1}
                            style={[{fontSize: 12,marginTop: 10, marginLeft : 0}] }>: {SalesName}</Text>
                    </View>
                    <View
                        style={styles.companyInfoRowSubViewStyle}>

                        <Text
                            textAlign='right'
                            style={[{fontSize: 12,marginTop: 10}] }>{'电话'}</Text>
                        <Text
                            textAlign='left'
                            numberOfLines={1}
                            style={[{fontSize: 12,marginTop: 10, marginLeft : 0, width: 98}] }>: {SalesPhone}</Text>

                        <Image
                            source={require('../../img/phone.png')}
                            style={[{
                                resizeMode: "contain",
                                alignSelf: 'center',
                                marginLeft : 10
                            }
                            ]
                            }

                        />
                    </View>

                </View>

            </View>
        )
    }
}

//textStyle, {color: textStyle.color}]