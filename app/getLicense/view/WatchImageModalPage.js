/**
 * 图片预览
 * Created by jiaxueting on 2017/8/8.
 */

import React, { Component ,PropTypes} from 'react';
import {
    View,
    Dimensions,
    Image
} from 'react-native';
import ImageViewer from "../../view/imgZoom/image-viewer.component";
import BComponent from "../../base/BComponent";
const window = Dimensions.get('window');
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;


export default class WatchImageModal extends BComponent{
    constructor(props){
        super(props)
        this.state = {
            imageUrl: this.props.imageUrl,
            imageFile:this.props.imageFile,
            titleName:this.props.titleName,
            isShowMenu:false,
            img:null,
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    static navigatorButtons = {
        rightButtons: [
            {
                title: '', // for a textual button, provide the button title (label)
                buttonColor: 'black', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                id: 'more',
                icon: require('../../img/more_icon.png'),

            }]

    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        super.onNavigatorEvent(event);
        if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'more') { // this is the same id field from the static navigatorButtons definition
                this.alertModal();
            }
        }
    }

    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };


    alertModal=()=>{
        console.log("==输出弹窗==");
        this.setState({
            isShowMenu:true,
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            imageUrl: props.imageUrl,
            imageFile:props.imageFile,
            isShowMenu: props.isShowMenu,
        });
    }

    _callbackPhoto(img){

        if(img===null){
            this.setState({
                imageFile:null,
                imageUrl:null,
                isShowMenu:false,
            });
        }else{
            this.setState({
                imageFile:img.uri,
                // imageUrl:null,
                img:img,
                isShowMenu:false,
            });
        }

        this.props.callback(img,false);//将图片传递给页面

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


        console.log("WatchImageModal=>imageUrl="+this.state.imageUrl+this.state.imageFile+images[0].url);

                return (
                    <View style={{flex: 1,
                        backgroundColor: 'transparent'}} >

                            <ImageViewer imageUrls={images}
                                         isShowMenu={this.state.isShowMenu}
                                         callback={this._callbackPhoto.bind(this)}/>
                    </View>
                )
    }
}
