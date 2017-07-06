/**
 * 相册选择弹窗
 * Created by jiaxueting on 2017/6/22.
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
const window = Dimensions.get('window');
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;
import ImagePicker from "react-native-image-crop-picker"
import Toast from 'react-native-root-toast';

export default class AlertPhotoModal extends Component{
    constructor(props){
        super(props)
        this.state = { visible: this.props.visible,
        image: this.props.image,
            watchImagevi:this.props.watchImagevi,
        };
    }

    close=()=>{
        this.setState({ visible: false });
    }

    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible,
            watchImagevi:props.watchImagevi,
        });
    }

    pickSingle=()=> {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: false,
            cropperCircleOverlay: false,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.5,
            compressVideoPreset: 'MediumQuality',
            mediaType:'photo',
        }).then(image => {
            console.log('received image===', image);
            this.setState({
                visible: false,
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            });
            this.props.callback(this.state.image,this.state.visible);//将图片传递给父组件
        }).catch(e => {
            console.log(e);
            this.setState({ visible: false });
            // Alert.alert(e.message ? e.message : e);
            // this.props.callback(this.state.image,this.state.visible);//将图片传递给父组件
        });
    }

    watchSingle=()=>{
        this.setState({ visible: false });
        this.props.callback(null,this.state.visible);//将图片传递给父组件
    }

    pickSingleWithCamera=()=> {
        ImagePicker.openCamera({
            cropping: false,
            width: 500,
            height: 500,
            cropperCircleOverlay: false,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.5,
            compressVideoPreset: 'MediumQuality',
            mediaType:'photo',
        }).then(image => {
            console.log('received image===', image);
            this.setState({
                visible: false,
                image: {uri: image.path, width: image.width, height: image.height},
            });
            this.props.callback(this.state.image,this.state.visible);//将图片传递给页面
        }).catch(e => {
            this.setState({ visible: false });
            console.log('received image失败='+e);
            Toast.show('调取相机失败，请更改相机设置');
            // this.props.callback(this.state.image,this.state.visible);//将图片传递给父组件
        });
    }

    renderContent=()=>{
        console.log("AlertPhoto,watch="+this.state.watchImagevi);
        return ( <View style={[styles.background,{width: SCREEN_WIDTH , height: SCREEN_HEIGHT * 0.38}]}>
            {this.state.watchImagevi===true?
            <TouchableOpacity onPress={this.watchSingle}>
                <View style={styles.alertStyle}>
                    <Text style={{fontSize:18, color:'#323232', margin:15}}>查看大图</Text>
                </View>
            </TouchableOpacity>:
                <View style={{height:44,
                    width:SCREEN_WIDTH-50,
                    backgroundColor:'rgba(0, 0, 0, 0)',
                    marginBottom:15,}}>
                </View>
            }
            <TouchableOpacity activeOpacity={0.5} onPress={this.pickSingleWithCamera}>
                <View style={styles.alertStyle}>
                    <Text style={{fontSize:18, color:'#323232',margin:15}}>相机拍照</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.pickSingle}>
                <View style={styles.alertStyle}>
                    <Text style={{fontSize:18, color:'#323232', margin:15}}>去相册选择</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} onPress={this.close}>
                <View style={styles.alertCancelStyle}>
                    <Text style={{fontSize:18, color:'white',margin:15}}>取消</Text>
                </View>
            </TouchableOpacity>
        </View>)
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
                        {this.renderContent()}
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
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
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
        marginBottom:10,
        borderRadius: 22,
        borderWidth:1,
        borderColor:'white',
        alignItems: 'center',
        justifyContent: 'center',

    }

})