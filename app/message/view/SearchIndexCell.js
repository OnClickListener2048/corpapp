/**
 * 推荐搜索项布局，及历史纪录项布局
 * Created by jiaxueting on 2017/9/11.
 */
import React, {PropTypes} from 'react';
import {StyleSheet,View, Text,Platform,Image,Dimensions} from 'react-native';
const window = Dimensions.get('window');
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

export default class SearchIndexCell extends React.Component {
    constructor(props) {
        super(props)

    }

    static propTypes = {
        taskId: PropTypes.number,
        corpName: PropTypes.string,
        corpStr: PropTypes.string
    };

    render() {
        return(
            <View style={styles.container}>
            <View style={styles.rowStyle}>
                <Text style={styles.textstyle}>{this.props.corpName}</Text>
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
