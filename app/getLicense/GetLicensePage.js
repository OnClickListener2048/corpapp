/**
 * 领取执照
 * Created by jiaxueting on 2017/6/16.
 */

import React, { Component,PropTypes } from 'react';

import {
    Text,
    View,
    ScrollView,
    Dimensions, Image, TouchableOpacity,NativeModules
} from 'react-native';

import styles from '../VerifyCompanyInfo/css/VerifyCompanyStyle'
import CompanyInfoView from '../test/view/CompanyInfoView'
import VerifyProcessTipView from '../VerifyCompanyInfo/view/VerifyProcessTipView'
import CompanyAddress from "../test/view/CompanyAddress";
import TextInputView from "./view/TextInputView";
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

//图片选择器
import ImagePicker from 'react-native-image-picker';
//图片选择器参数设置
var options = {
    title: '请选择图片来源',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'相册图片',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

var details = [
    {processName:'确认材料'},
    {processName:'开始任务'},
    {processName:'结束任务'},
];

export default class GetLicensePage extends Component{
    static navigatorStyle = {
        navBarHidden: false, // 隐藏默认的顶部导航栏
        tabBarHidden: true, // 默认隐藏底部标签栏
    };

    constructor(props) {
        super(props);

        this.state = {
            renderUnderline: true,
            avatarSource: null,
            blicenseSource:null,

        };
    }


    // renderExpenseItem(item , i) {
    //     return <RegisterCompanyCell key={i} detail={item} isFirst={i == 0} isLast={i == details.length - 1}/>;
    // }

    renderTest() {

        return  <CompanyInfoView companyName='CRM'
                                 ContactsName='野原新之助'
                                 ContactsPhone='13256738495'
                                 SalesName='销售员'
                                 SalesPhone='13522805747'
        />
    }

    renderVerifyProcessTipView(){

        return <VerifyProcessTipView messageTitle={'呵呵哒'} currentNum={0}/>
    }

    //选择照片按钮点击
    choosePic(type) {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('用户取消了选择！');
            }
            else if (response.error) {
                console.log("ImagePicker发生错误：" + response.error);

            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(response.uri+"<==>"+source+"<==>");
                if(type === 0) {//身份证
                    this.setState({
                        avatarSource: source,
                    });
                }else{//营业执照
                    this.setState({
                        blicenseSource: source,
                    });
                }
                console.log("=====a"+this.state.avatarSource+"======a");

            }
        });

    }

    //输入框回调
    _callback(content) {

        this.setState({
            status: content,
        });
    }

    render() {
        return(
            <View style={styles.container}>


                <ScrollView style={styles.container}>

                    {this.renderVerifyProcessTipView()}

                    {<View style={[{height:15}]}></View>}

                    {<View >
                        {this.renderTest()}

                    </View>}

                    {/*{<View >*/}
                        {/*{this.customerMessage()}*/}

                    {/*</View>}*/}

                    <TextInputView
                        textName={'法       人：'}
                        inputWidth={{width:75}}
                        winWidth={{width:SCREEN_WIDTH-110}}
                        callback={this._callback.bind(this)}
                    />
                    <View style={styles.identityCardPhoto}>
                        <Text style={{marginLeft : 15,fontSize:15,marginTop:10}}>身  份  证：</Text>
                        <TouchableOpacity onPress={this.choosePic.bind(this,0)}>
                            { this.state.avatarSource === null ? <Image source={require('../img/reverse.png')} style={{marginTop:15}}/> :
                                <Image source={this.state.avatarSource} style={{marginTop:15,width:120,height:85}}/>
                            }
                        </TouchableOpacity>
                        {/*<Image source={require('../img/obverse.png')} style={{marginLeft:27,marginTop:15,*/}
                            {/*justifyContent:'flex-end'}}/>*/}
                    </View>
                    <View
                        style={{paddingTop:5,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'注  册  号：'}
                        inputWidth={{width:80}}
                        winWidth={{width:SCREEN_WIDTH-115}}
                        callback={this._callback.bind(this)}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'国税登记号：'}
                        inputWidth={{width:93}}
                        winWidth={{width:SCREEN_WIDTH-130}}
                        callback={this._callback.bind(this)}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'地税登记号：'}
                        inputWidth={{width:93}}
                        winWidth={{width:SCREEN_WIDTH-130}}
                        callback={this._callback.bind(this)}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'注册资金：'}
                        inputWidth={{width:80}}
                        winWidth={{width:SCREEN_WIDTH-115}}
                        callback={this._callback.bind(this)}
                    />
                    </View>
                    <View
                        style={{paddingTop:15,backgroundColor:'white'}}>
                    <TextInputView
                        textName={'经营范围：'}
                        inputWidth={{width:80}}
                        winWidth={{width:SCREEN_WIDTH-115}}
                        callback={this._callback.bind(this)}
                    />
                    </View>
                    <View style={[styles.identityCardPhoto,{height:150}]}>
                        <Text style={{marginLeft : 15,fontSize:15,marginTop:10}} >经营执照：</Text>
                        <TouchableOpacity onPress={this.choosePic.bind(this,1)}>
                            { this.state.blicenseSource === null ? <Image source={require('../img/blicense.png')} style={{marginTop:10}}/> :
                                <Image source={this.state.blicenseSource} style={{marginTop:15,width:120,height:85}}/>
                            }
                        </TouchableOpacity>
                    </View>
                </ScrollView>


            </View>
        );
    }
}