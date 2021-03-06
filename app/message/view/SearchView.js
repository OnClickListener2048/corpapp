/**
 * Created by jinglan on 2017/9/11.
 */
import React, {Component,PropTypes} from 'react';
import {Text, TextInput, View, Platform, Image,TouchableOpacity} from "react-native";
const dismissKeyboard = require('dismissKeyboard');     // 获取键盘回收方法
export default class SearchView extends Component {

    constructor(props) {
        super(props);
        this.state = { content: this.props.content,
            textName:this.props.textName,

            textEditable:this.props.textEditable
        };
        lastText = '';
        this._enterBtnClick = this._enterBtnClick.bind(this);
        this._cancleBtnClick = this._cancleBtnClick.bind(this);


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
        },600);

    }


    _search(){


        //搜索相关索引信息
        if(this.timer) {
            clearTimeout(this.timer);
        }
        this.props.callback('index',lastText);
        // this.props.callback('index','北京');

    }

    _cancleBtnClick(){

        if(this.timer) {
            clearTimeout(this.timer);
        }
        this.props.callback('cancle');
    }

    _enterBtnClick(){

console.log('点击了确定按钮');
        //用户确定了搜索的内容
        //把此内容做缓存操作
        if(this.timer) {
            clearTimeout(this.timer);
        }
        this.props.callback('search',lastText);
        // this.props.callback('search','北京');



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
                <TextInput underlineColorAndroid='transparent'
                           value={this.state.content}
                           editable={this.props.textEditable}
                           onChange={this._changeText.bind(this)}
                           multiline={false}
                           onSubmitEditing={() => {
                               this._enterBtnClick();
                               dismissKeyboard();

                           }}
                           style={styles.textInput} placeholder='搜索' placeholderTextColor={'#C8C8C8'} returnKeyType='search' returnKeyLabel='搜索'
                />
            </View>

                <TouchableOpacity onPress={this._cancleBtnClick}>
                    <View  style={styles.cancleBtnStyle}>
                        <Text style={{fontSize:15, textAlign:'center', justifyContent: 'center',color:'#323232'}}>
                           取消</Text>
                    </View>
                </TouchableOpacity>
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
    textInputContainer: {
        height: 64,
        width: SCREEN_WIDTH,
        marginLeft: 0,
        // width: SCREEN_WIDTH,
        backgroundColor: '#FAFAFA',

        flexDirection: 'row',
        alignItems:'center'
    },


    backViewContainer: {
        height: 65,
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




    circleView: {
        width: SCREEN_WIDTH - 61 - 15,
        height: 44 - 7 - 7,

        marginLeft: 15,
        marginTop: 27,
        marginBottom: 7,

        borderWidth:0.5,
        borderRadius: 100,
        borderColor:'#E6E6E6',
        backgroundColor: 'white',

        flexDirection: 'row',

    },

    searchImg: {

        marginLeft: 10,
        marginTop:5,
        marginBottom:5,

        width: 18,
        height: 18,

    },

    textInput: {
        width: SCREEN_WIDTH - 61 - 15 - 40,
        height: 44 - 7 - 7,
        marginLeft: 6,
        padding:0,
        marginTop:0,
        marginBottom:0,
        color:'#323232',
        fontSize: 15,
    },

    cancleBtnStyle: {

        width: 40,
        height: 30,
        marginTop:17,
        marginLeft: 11,
        marginRight: 11,

        alignItems:'center',
        justifyContent:'center'
    },
    bottomLineStyle: {

        width: SCREEN_WIDTH,
        height: 1,
        backgroundColor:'black',
        marginTop:63
    }


});
