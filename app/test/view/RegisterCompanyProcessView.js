/**
 * Created by jinglan on 2017/6/13.
 */

import React, {PropTypes} from 'react';
import {View, Text,Image,Dimensions} from 'react-native';
import styles from '../style/RegisterCompanyStyle'
import companyCell from  '../view/RegisterCompanyCell'
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

export default class RegisterCompanyProcessView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            registerCompanyProgressArr: this.props.registerCompanyProgressArr


        }
    }

    static propTypes = {
        //style: PropTypes.object,
        registerCompanyProgressArr: PropTypes.array
    };


    render() {
        // const { style} = this.props
         const {registerCompanyProgressArr} = this.state
        return (
            <View
                style={styles.registerCompanyViewContainer}>


            </View>
        )
    }
}