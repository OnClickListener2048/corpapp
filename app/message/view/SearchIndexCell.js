/**
 * 推荐搜索项布局，及历史纪录项布局
 * Created by jiaxueting on 2017/9/11.
 */
import React, {PropTypes} from 'react';
import {StyleSheet,View, Text,Platform,Image,Dimensions} from 'react-native';
const window = Dimensions.get('window');
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;
import Highlighter from 'react-native-highlight-words';

export default class SearchIndexCell extends React.Component {
    constructor(props) {
        super(props)

    }

    static propTypes = {
        taskId: PropTypes.string,
        corpName: PropTypes.string,
        color:PropTypes.string,
        corpStr:PropTypes.string,
    };



    render() {
        return(
            <View style={styles.container}>
            <View style={styles.rowStyle}>
                <Highlighter
                    style={[styles.textstyle,{color:this.props.color!==null?this.props.color:'#969696'}]}
                    highlightStyle={{color: '#E5151D'}}
                    searchWords={[this.props.corpStr]}
                    textToHighlight={this.props.corpName}/>
            </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        height:50,
        width:SCREEN_WIDTH,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#FAFAFA',
        justifyContent: 'center',
        alignItems:'center'
    },
    rowStyle:{
        flex:1,
        flexDirection:'column',
        height:50,
        width:SCREEN_WIDTH,
        backgroundColor:'#FAFAFA',
        justifyContent: 'center',
        borderBottomColor:'#e6e6e6',
        borderBottomWidth:0.5,
    },
    textstyle:{
        color:'#969696',
        fontSize:14,


    }
})
