/**
 * 单列选择器
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

                        {!enable &&
                        <View style={styles.textShowStyle}>
                            {this.props.value===''?<Text numberOfLines={1} style={[{
                                    textAlign: 'left',
                                    marginRight: 5,
                                marginBottom: 5,
                                    justifyContent: 'flex-end',
                                    flex: 1,
                                fontSize:15,
                                    color: '#323232',
                                }]}>{'请选择'}</Text>:
                            <Text numberOfLines={1} style={[{
                                textAlign: 'left',
                                marginRight: 5,
                                marginBottom: 5,
                                color: '#323232',
                                fontSize:15,
                                justifyContent:'flex-end',
                            }]}>{this.props.value}</Text>}
                        </View>
                        }

                        {enable &&
                        <TouchableOpacity style={{paddingBottom:10,paddingTop:1,flex:1,backgroundColor:'white',alignItems: 'flex-start',justifyContent:'flex-start'}} onPress={() => {
                            this._Press()
                        }}>
                            <View style={styles.leftdownDrapViewStyle}>
                            <Image source={require('../../img/down.png')}/>
                            {this.props.value===''?<Text numberOfLines={1} style={[{
                                textAlign: 'center',
                                marginRight: 5,
                                justifyContent: 'center',
                                flex: 1,
                                color: '#323232',
                            }]}>{'请选择'}</Text>
                            :<Text numberOfLines={1} style={[{
                                textAlign: 'center',
                                marginRight: 5,
                                justifyContent: 'center',
                                flex: 1,
                                    fontSize:15,
                                color: '#323232',
                            }]}>{this.props.value}</Text>}
                            </View>
                        </TouchableOpacity>
                        }

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 2,
        backgroundColor: 'white'
    },

    textShowStyle: {
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 0.5,
        width: SCREEN_WIDTH- 110,
        backgroundColor:'white',
        flex:1,
        marginBottom:18,
        justifyContent:'flex-end'
    },

    leftTipStyle: {
        marginLeft: 15,
        width:85,
        paddingTop: 5,
        color:'#323232',
        fontSize:15,

    },
    rightViewStyle: {
        marginRight: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor:'white'

    },

    rightRowViewStyle: {
        flexDirection: 'row',
        height: 20,
        // backgroundColor: 'white',
        backgroundColor:'white',
        // justifyContent:'center',
        alignItems: 'center',
    },
    leftdownDrapViewStyle: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width : SCREEN_WIDTH-115,
        flex: 1,
        marginLeft: 4.5,
        marginRight: 0,
        height: 30,
        borderRadius: 2.5,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        backgroundColor: 'white',
    },
});