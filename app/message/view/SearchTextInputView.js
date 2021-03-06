/**
 * Created by jinglan on 2017/9/11.
 */
import React, {Component,PropTypes} from 'react';
import {Text, TextInput, View, Platform, Image} from "react-native";

export default class SearchTextInputView extends Component {

    constructor(props) {
        super(props);
        this.state = { content: this.props.content,
            textName:this.props.textName,

            textEditable:this.props.textEditable
        };
        lastText = '';
        this._enterBtnClick = this._enterBtnClick.bind(this);

    }

    static propTypes = {
        //style: PropTypes.object,
        textName: PropTypes.string,
        content:PropTypes.string,
        textEditable:PropTypes.bool,

    };


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

        this.props.callback('index',lastText);

       //搜索相关索引信息
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }

    _enterBtnClick(){
        //用户确定了搜索的内容
        //把此内容做缓存操作
        if(this.timer) {
            clearTimeout(this.timer);
        }
        this.props.callback('search',lastText);



    }

    /*
    *
    * <Image
     source={require('../../img/bigk.png')}
     style={[styles.textInput]}>
     </Image>
     */
    render(){
        return(
            <View style={styles.backViewContainer}>

              <View style={styles.textInputContainer}>
                <View style={styles.circleView}>

                    <Image
                        source={require('../../img/search.png')}
                        style={[styles.searchImg]}>
                    </Image>

                    <Text style={[{fontSize: 14,marginLeft: 6 , color : '#C8C8C8'}]}>{'搜索'}</Text>

                </View>

            </View>
                <View style={styles.lineViewContainer}>
                </View>

            </View>


        )};

}



import {StyleSheet, Dimensions} from 'react-native';
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

const styles = StyleSheet.create({


    // phone input box

    backViewContainer: {
        height: 45,
        width: SCREEN_WIDTH,
        marginLeft: 0,
        // width: SCREEN_WIDTH,
        backgroundColor: '#FFFFFF',

        flexDirection: 'column',
        alignItems:'center'
    },

    lineViewContainer: {
        height: 0.5,
        width: SCREEN_WIDTH,
        marginLeft: 0,
        // width: SCREEN_WIDTH,
        backgroundColor: '#E6E6E6',
        flexDirection: 'row',
        alignItems:'center'
    },

    textInputContainer: {
        height: 44,
        width: SCREEN_WIDTH,
        marginLeft: 0,
        // width: SCREEN_WIDTH,
         backgroundColor: '#FFFFFF',

        flexDirection: 'row',
        alignItems:'center'
    },


    circleView: {
        width: SCREEN_WIDTH - 15 - 15,
        height: 44 - 7 - 7,

        marginLeft: 15,
        marginTop: 7,
        marginBottom: 7,

        borderWidth:0.5,
        borderRadius: 100,
        borderColor:'#E6E6E6',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems:'center'
    },

    searchImg: {

        marginLeft: 10,
        marginTop:5,
        marginBottom:5,

        width: 18,
        height: 18,

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
