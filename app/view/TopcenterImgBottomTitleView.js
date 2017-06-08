/**
 * Created by jinglan on 2017/6/8.
 */

import React, {PropTypes} from 'react';
import {View, Text,Image} from 'react-native';
export default class TopcenterImgBottomTitleView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            applicationImg: this.props.applicationImg,
            applicationTitle: this.props.applicationTitle
        }
    }

    static propTypes = {
        style: PropTypes.object,
        applicationTitle: PropTypes.string,
        applicationImg: PropTypes.number
    };


    render() {
        const { style} = this.props
        const {applicationTitle, applicationImg} = this.state
        return (
                <View
                    style={[{width: 70, height: 44, backgroundColor : '#FFC125', justifyContent: 'center', alignItems: 'flex-end'}, style]}>

                    <Image
                        source={applicationImg}
                        style={[{
                            resizeMode: "contain",
                            marginBottom: 2,
                            alignSelf: 'center',
                        }
                        ]
                        }

                    />


                    <Text
                        textAlign='center'
                        style={[{fontSize: 12}] }>{applicationTitle}</Text>
                </View>
        )
    }
}

//textStyle, {color: textStyle.color}]