/**
 * Created by jinglan on 2017/6/12.
 */
import React, { Component } from 'react';
import {Text} from "react-native";
import {
    View
} from 'react-native';

import styles from './style/SubViewStyle'
import CompanyInfoView from './view/CompanyInfoView'
import CommunalNavBar from '../main/GDCommunalNavBar';


export default class SubViewTest extends Component{

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    static renderTitleItem() {
        return(
            <Text style={styles.navbarTitleItemStyle}>自定义View</Text>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <CommunalNavBar

                    titleItem = {() => SubViewTest.renderTitleItem()}
                />
                <CompanyInfoView companyName='CRM'
                                             style={{ marginLeft: 15,marginTop: 15, height: 100, width: 300, flexDirection: 'column', backgroundColor : 'green',alignSelf: 'flex-start'}}

                />

            </View>
        );
    }
}