/**
 * Created by jinglan on 2017/6/12.
 */


import React, {PropTypes} from 'react';
import {View, Text,Image} from 'react-native';
export default class CompanyInfoView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: this.props.companyName
        }
    }

    static propTypes = {
        style: PropTypes.object,
        companyName: PropTypes.string,
    };


    render() {
        const { style} = this.props
        const {companyName} = this.state
        return (
            <View
                style={style}>



                <View
                    style={[{width: 170, height: 24, backgroundColor: 'orange',   flexDirection: 'row'}]}>



                    <Text
                        textAlign='right'
                        style={[{fontSize: 12,marginTop: 10}] }>{'公司名称:'}</Text>
                    <Text
                        textAlign='left'
                        style={[{fontSize: 12,marginTop: 10}] }>{companyName}</Text>


                </View>
                <View
                    style={[{width: 170, height: 24, backgroundColor: 'orange',   flexDirection: 'row'}]}>



                    <Text
                        textAlign='right'
                        style={[{fontSize: 12,marginTop: 10}] }>{'公司名称:'}</Text>
                    <Text
                        textAlign='left'
                        style={[{fontSize: 12,marginTop: 10}] }>{companyName}</Text>


                </View>

                <View
                    style={[{width: 170, height: 24, backgroundColor: 'orange',   flexDirection: 'row'}]}>



                    <Text
                        textAlign='right'
                        style={[{fontSize: 12,marginTop: 10}] }>{'公司名称:'}</Text>
                    <Text
                        textAlign='left'
                        style={[{fontSize: 12,marginTop: 10}] }>{companyName}</Text>


                </View>

            </View>
        )
    }
}

//textStyle, {color: textStyle.color}]