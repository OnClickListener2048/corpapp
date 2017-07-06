/**
 * 图片预览
 * Created by jiaxueting on 2017/7/6.
 */

import React, { Component ,PropTypes} from 'react';
import {
    Text,
    View,
    Alert,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Dimensions,
    Image,
    Modal,
    TextInput,
    InteractionManager
} from 'react-native';
import ImageLoad from "../../view/ImageLoad";
const window = Dimensions.get('window');
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

export default class AlertPhotoModal extends Component{
    constructor(props){
        super(props)
        this.state = { visible: this.props.visible,
            image: this.props.image,
        };
    }

    close=()=>{
        this.setState({ visible: false });
        this.props.callback();//将图片传递给父组件
    }

    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible });
    }

    render(){
        return(
            <Modal
                animationType='none'//进场动画 fade
                onRequestClose={() => this.close()}
                visible={this.state.visible}//是否可见
                transparent={true} //背景透明

            >
                <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={this.close}//点击灰色区域消失
                >
                    <View style={styles.container}>
                        <ImageLoad
                            onPress={this.close}
                            resizeMode={'contain'}
                            isWatch={true}
                            style={{ marginTop: 0, justifyContent: 'center',
                                alignItems: 'center',height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
                            source={{ uri:this.props.image+"" }}
                        ></ImageLoad>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width:SCREEN_WIDTH,
        flex: 1,
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    background: {
        backgroundColor: '#00000000',
        // backgroundColor:'yellow',
        width:SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertStyle: {
        height:44,
        width:SCREEN_WIDTH-50,
        backgroundColor:'#ffffffff',
        marginBottom:15,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',

    },
    alertCancelStyle: {
        height:44,
        width:SCREEN_WIDTH-50,
        backgroundColor:'rgba(0, 0, 0, 0.25)',
        marginBottom:30,
        borderRadius: 22,
        borderWidth:1,
        borderColor:'white',
        alignItems: 'center',
        justifyContent: 'center',

    }

})
