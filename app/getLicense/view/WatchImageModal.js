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
import AlertPhotoModal from "../../view/AlertPhotoModal";
const window = Dimensions.get('window');
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

export default class WatchImageModal extends Component{
    constructor(props){
        super(props)
        this.state = { visible: this.props.visible,
            imageUrl: this.props.imageUrl,
            imageFile:this.props.imageFile,
            titleName:this.props.titleName,
            isShowMenu:false,
        };
    }

    close=()=>{
        this.setState({ visible: false });
        this.props.callback();//将图片传递给父组件
    }

    alertModal=()=>{
        console.log("==输出弹窗==");
        this.setState({
            isShowMenu:true,
        })
    }

    open=()=>{
        this.setState({ visible: true });
        this.props.callback();//将图片传递给父组件
    }

    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible,
            imageUrl: props.imageUrl,
            imageFile:props.imageFile,
            isShowMenu: props.isShowMenu,});
    }

    _callbackPhoto(img){
        this.setState({
            imageFile:img.path,
        });
        this.props.callbackfile(img,false);//将图片传递给页面
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
                <View style={styles.titlelayout}>
                    <TouchableOpacity onPress={() => {
                        this.close()
                    }}>
                    <Text style={{fontSize:15,color:'white',marginLeft:15}}>{'返回'} </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:18, textAlign:'center',alignItems:'center',alignSelf:'center', justifyContent: 'center',color:'white'}}>{this.props.titleName}</Text>

                    <TouchableOpacity onPress={() => {
                        this.alertModal()
                    }}style={{width:50,height:40}}>
                        <View style={{
                            height: 40,
                            width: 50,
                            alignItems: 'center',
                            backgroundColor: 'black',
                            justifyContent: 'center'
                        }}>
                            <Text style={{fontSize: 15, textAlign: 'center', justifyContent: 'center', color: '#FFFFFF'}}>
                                {'更多'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{flex:1}} activeOpacity={1}
                >
                    <ImageViewer imageUrls={images}
                                 isShowMenu={this.state.isShowMenu}
                                 callback={this._callbackPhoto.bind(this)}/>
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
    titlelayout:{
        width:SCREEN_WIDTH,
        backgroundColor:'black',
        paddingTop:30,
        height:50,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems: 'center'
    },

})
