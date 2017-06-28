/**
 * 单列地址选择
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
} from 'react-native';
import TextInputView from "./TextInputView";

const window = Dimensions.get('window');
export const height = window.height;
export const width = window.width;

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class SinglePickerView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hint: this.props.hint,
            value: this.props.value,
        }
        console.log("this.props.city=" + this.props.city);

        this._Press = this._Press.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    static propTypes = {
        hint: PropTypes.string,// 左侧提示文案
        value: PropTypes.string,//显示值
        onPress: PropTypes.func,// 点击回调
        enable: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number])// 是否启用编辑
    };

    setValue(value) {
        this.setState({value: value});
    }

    _Press() {
        if (this.props.onPress) {
            this.props.onPress();
        }
    };

    render() {
        const {hint, enable} = this.props;
        return (
            <View
                style={styles.container}>
                <Text style={styles.leftTipStyle}>{this.props.hint}</Text>

                <View style={styles.rightViewStyle}>

                    <View style={ styles.rightRowViewStyle}>

                        {!enable &&
                        <View style={styles.textShowStyle}>
                            <Text numberOfLines={1} style={[{
                                textAlign: 'left',
                                marginRight: 5,
                                justifyContent: 'center',
                                flex: 1,
                                color: '#323232'
                            }]}>{this.props.value}</Text>
                        </View>
                        }

                        {enable &&
                        <TouchableOpacity style={ styles.leftdownDrapViewStyle} onPress={() => {
                            this._Press()
                        }}>
                            <Image source={require('../../img/down.png')}/>
                            <Text numberOfLines={1} style={[{
                                textAlign: 'center',
                                marginRight: 5,
                                justifyContent: 'center',
                                flex: 1,
                                color: '#dcdcdc'
                            }]}>{this.props.value}</Text>
                        </TouchableOpacity>
                        }

                    </View>


                    <View style={ styles.rightRowViewStyle}>
                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 38 * 2,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 2,
        backgroundColor: '#FFFFFF'
    },

    textShowStyle: {
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 0.5,
        width: SCREEN_WIDTH- 130
    },

    leftTipStyle: {
        marginLeft: 15,
        marginRight: 4,
        paddingTop: 5,

    },
    rightViewStyle: {
        marginRight: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1

    },

    rightRowViewStyle: {
        flexDirection: 'row',
        height: 25,
        backgroundColor: 'white',
        // justifyContent:'center',
        alignItems: 'center',
    },

    selectBtnStyle: {

        width: 20,
        height: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftdownDrapViewStyle: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        // width : 105.5,
        flex: 1,
        marginLeft: 4.5,
        marginRight: 0,
        height: 23,
        borderRadius: 2.5,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        backgroundColor: 'white',
    },

    rightdownDrapViewStyle: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 0,
        // width : 105.5,
        flex: 1,
        height: 23,
        borderWidth: 1,
        borderRadius: 2.5,
        borderColor: '#e6e6e6',
        backgroundColor: 'white',
    },
});