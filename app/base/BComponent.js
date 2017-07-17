/**
 * 基础的自定义返回按钮的组件, 所有的需要显示返回按钮的都需要继承此子类,
 * 并根据需要覆盖 onNavigatorEvent 回调.
 * Created by beansoft on 2017/7/17.
 */

import React, {Component} from 'react';

/**
 * 用法:
 * import BComponent from '../../base';
 * export default class Settings extends BComponent { }
 */
export default class BComponent extends Component {

    constructor(props) {
        super(props);

        // 自定义左侧返回按钮
        if(this.props.navigator) {
            this.props.navigator.setButtons({
                leftButtons: [
                    {
                        title: '', // for a textual button, provide the button title (label)
                        // buttonColor: 'black', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                        id: 'goBack',
                        icon: require('../img/left.png'),
                    }], // see "Adding buttons to the navigator" below for format (optional)
                // rightButtons: [], // see "Adding buttons to the navigator" below for format (optional)
                animated: false // does the change have transition animation or does it happen immediately (optional)
            });

            this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        }
    }

    // 子类请继承此方法, 不要忘了调用super.onNavigatorEvent(event);
    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        console.log(event);
        if (event.type === 'NavBarButtonPress') {
            let { id } = event;
            console.log('id=', id);
            if (id === 'goBack') {
                this.props.navigator.pop();
            }
        }
    }
}