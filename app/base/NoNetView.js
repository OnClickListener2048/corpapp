/**
 *  无网状态显示组件.
 * Created by beansoft on 2017/7/25.
 */

import React, {Component, PropTypes} from 'react';
import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    DeviceEventEmitter, TouchableOpacity,
    KeyboardAvoidingView, TouchableWithoutFeedback,
    InteractionManager,
    Platform,
    BackAndroid,
    ToastAndroid,
    NetInfo
} from 'react-native';
import NoMessage from '../test/NoMessage';
import Toast from 'react-native-root-toast';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../config';

/**
 * 用法:
 * import NoNetView from '../../base/NoNetView';
 * <NoNetView onClick= {点击处理事件}>
 *     <... 原始的view代码>
 *  </NoNetView>
 */
export default class NoNetView extends Component {
    static propTypes = {
        style: PropTypes.object, // 样式, 可选
        onClick: PropTypes.func,// 点击事件
    };

    constructor(props) {
        super(props);

        this.state = {
            isConnected: true,// 是否已连接网络
        };

        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({isConnected: isConnected});
        })

        this._updateConnectionStatus = this._updateConnectionStatus.bind(this);
        NetInfo.isConnected.addEventListener('change', this._updateConnectionStatus);
    }

    _updateConnectionStatus(isConnected) {
        this.setState({isConnected: isConnected});
    }

    render() {
        console.log("NoNetView" + this.state.isConnected);
        const {onClick, style} = this.props;
        if (!this.state.isConnected) {      // 无网络
            return(
                <TouchableOpacity style={{flex : 1 , backgroundColor:'#FFFFFF'}}
                                  onPress={() => { if(onClick !== null){ onClick(); } }}>
                    <View style={{flex : 1 , backgroundColor:'#FFFFFF' }}>
                        <NoMessage
                            textContent='网络错误,点击重新开始'
                            active={require('../img/network_error.png')}/>
                    </View>
                </TouchableOpacity>
            );
        }else {
            return (
                <View  style={[{flex:1}, style]}>
                    {this.props.children}
                </View>
            )
        }
    }
}