/**
 * Created by jinglan on 2017/9/11.
 */
import React, {Component,PropTypes} from 'react';
import {Text, TextInput, View, Platform, Image,} from "react-native";

export default class SearchTextInputView extends Component {

    constructor(props) {
        super(props);
        this.state = { content: this.props.content,
            textName:this.props.textName,

            textEditable:this.props.textEditable};

    }

    static propTypes = {
        //style: PropTypes.object,
        textName: PropTypes.string,
        content:PropTypes.string,
        textEditable:PropTypes.bool,

    };

    lastText = '';

    _changeText(event){

        lastText = event.nativeEvent.text;
        if(this.timer) {
           clearTimeout(this.timer);
        }

        this.timer = setTimeout(()=>{
            this._search()
        },1000);

    }


    _search(){
        this.props.callback();

       //搜索相关索引信息
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.registerNumStyle}>

                    <View style={styles.textInputContainer}>
                            <TextInput underlineColorAndroid='transparent'
                                       value={this.state.content}
                                       editable={this.props.textEditable}
                                       onChange={this._changeText.bind(this)}
                                       style={styles.textInput} placeholder='' returnKeyType='next'
                                      />
                    </View>
                </View>

            </View>

        )};

}



import {StyleSheet, Dimensions} from 'react-native';
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

        flexDirection: 'column'
    },
    companyInfoViewContainer: {
        width: SCREEN_WIDTH,
        height:130,
        backgroundColor: 'gray',
        flexDirection: 'column'
        // style={{ marginLeft: 15,marginTop: 15, height: 100, width: 300, flexDirection: 'column', backgroundColor : 'g
    },

    // phone input box
    textInputContainer: {
        height: 40,
        width: SCREEN_WIDTH - 20,
        marginLeft: 10,
        // width: SCREEN_WIDTH,
        // backgroundColor: '#FFDDFF',
        flexDirection: 'row',
    },

    // phone input box
    textInputWrapper: {
        minHeight: 15,
        maxHeight:100,
        width: SCREEN_WIDTH-115,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 0.5,
        backgroundColor: 'transparent',
        // position: 'relative',
        marginRight: 10,
        flexDirection: 'row',
    },

    textInput: {
        flex: 1,
        width: SCREEN_WIDTH - 40,
        marginLeft: 0,
        padding: 0,
        backgroundColor: 'orange',

        color:'#323232',
        fontSize: 15,
    },

    legalPersonStyle: {
        marginTop : 5,
        width: SCREEN_WIDTH - 30,
        // flex: 1,
        height: 30,
        flexDirection: 'row',
        justifyContent:'space-between'
    },

    registerNumStyle: {
        marginTop : 5,
        width: SCREEN_WIDTH - 30,
        // flex: 1,
        height: 30,
        flexDirection: 'row',
        justifyContent:'space-between'
    },

    companyInfoRowSubViewStyle: {
        maxWidth: SCREEN_WIDTH/2 - 15,
        width: SCREEN_WIDTH/2 - 15,
        height: 30,
        marginLeft : 0,
        marginRight : 0,
        flexDirection: 'row',
    },
    companyInfoRowPhoneStyle: {
        maxWidth: SCREEN_WIDTH/2 - 15,
        width: SCREEN_WIDTH/2 - 15,
        height: 30,
        marginLeft : 0,
        marginRight : 0,
        flexDirection: 'row',
        justifyContent:'flex-end'

    }

});
