/**
 * Created by jiaxueting on 2017/6/23.
 */
import React, { Component } from 'react';
import { Text, TouchableOpacity, View,StyleSheet ,Dimensions} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
const window = Dimensions.get('window');
export const SCREEN_WIDTH = window.width;
export const SCREEN_HEIGHT = window.height;

export default class DataTimerView extends Component {

    constructor(props){
        super(props)
        this.state = { isDateTimePickerVisible: this.props.isDateTimePickerVisible,
            date:this.props.date,};
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => {this.setState({ isDateTimePickerVisible: false })
        this.props.callback("",this.state.isDateTimePickerVisible);//将数据传递给父组件
    };

    _handleDatePicked = date => {
        console.log('A date has been picked: ', date);
        this.setState({
            date:date,
        }),
        this._hideDateTimePicker();
        this.props.callback(date,this.state.isDateTimePickerVisible);//将日期传递给父组件
    };

    render() {
        return (
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgba(0, 0, 0, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});