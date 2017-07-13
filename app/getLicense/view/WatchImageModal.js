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
import ImageViewer from "../../view/imgZoom/image-viewer.component";
const window = Dimensions.get('window');
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

export default class WatchImageModal extends Component{
    constructor(props){
        super(props)
        this.state = { visible: this.props.visible,
            imageUrl: this.props.imageUrl,
            imageFile:this.props.imageFile,
        };
    }

    close=()=>{
        this.setState({ visible: false });
        this.props.callback();//将图片传递给父组件
    }

    open=()=>{
        this.setState({ visible: true });
        this.props.callback();//将图片传递给父组件
    }

    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible,
            imageUrl: props.imageUrl,
            imageFile:props.imageFile,});
    }




    render(){
            var images = [];
            if(this.state.imageFile!=null){
                images = [{
                    url: this.state.imageFile
                }]
            }else{
                images = [{
                    url: this.state.imageUrl+""
                }]
            }



        {/*<ImageLoad onPress={this.close} resizeMode={'contain'} isWatch={true} style={{ marginTop: 0, justifyContent: 'center', alignItems: 'center',height: SCREEN_HEIGHT, width: SCREEN_WIDTH }} source={{ uri:this.state.imageUrl+""}}/>*/}

        console.log("WatchImageModal=>imageUrl="+this.state.imageUrl+this.state.imageFile+this.state.visible);
        return(
            <Modal
                animationType='none'//进场动画 fade
                onRequestClose={() => this.close()}
                visible={this.state.visible}//是否可见
                transparent={true} //背景透明

            >
                <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={this.close}//点击灰色区域消失
                >
                    <ImageViewer imageUrls={images}
                                 onClick={this.close}/>
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
        justifyContent: 'center',
        alignItems: 'center'
    },

})
