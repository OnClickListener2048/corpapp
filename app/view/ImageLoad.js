/**
 * Created by jiaxueting on 2017/7/3.
 */
import React, { PropTypes } from 'react';
import { Image, ActivityIndicator,Dimensions } from 'react-native';
const window = Dimensions.get('window');
import  TimerMixin from "react-timer-mixin";
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

class ImageLoad extends React.Component {
    static propTypes = {
        isShowActivity: PropTypes.bool,
        isWatch:PropTypes.bool,
    };

    static defaultProps = {
        isShowActivity: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isError: false,
            isWatch:this.props.isWatch,
            animating: true,
        };
    }

    //图片加载超时（暂定5秒）
    setToggleTimeout() {
        TimerMixin.setTimeout(() => {
            this.setState({animating:false});
            // this.setState({animating: !this.state.animating});
            this.setToggleTimeout();
        }, 5000);
    }

    componentDidMount() {
        this.setToggleTimeout();
    }

    onLoadEnd(){
        this.setState({
            isLoaded: true
        });
    }

    onError(){
        this.setState({
            isError: true
        });
    }

    render() {
        console.log("图片地址="+this.props.source);
        return(
            <Image
                onLoadEnd={this.onLoadEnd.bind(this)}
                onError={this.onError.bind(this)}
                style={[this.props.style, { alignItems: 'center' }]}
                source={this.props.source}
                fadeDuration={0}
                resizeMode={this.props.resizeMode}
            >
                {
                    this.state.isLoaded && !this.state.isError ? null :
                        <Image
                            fadeDuration={0}
                            style={[this.props.isWatch===false?this.props.placeholderStyle ? this.props.placeholderStyle : styles.imagePlaceholderStyles:styles.imagePlaceholderStyle]}
                            source={this.props.placeholderSource ? this.props.placeholderSource : require('../img/empty-image.png')}
                            resizeMode={'contain'}
                        >
                            {
                                this.props.children  ? this.props.children :
                                    this.props.isShowActivity ?
                                        <ActivityIndicator
                                            animating={this.state.animating}
                                            size={this.props.loadingStyle ? this.props.loadingStyle.size : 'small'}
                                            color={this.props.loadingStyle ? this.props.loadingStyle.color : 'black'}
                                        /> :
                                        null
                            }
                        </Image>
                }
            </Image>
        );
    }
}

const styles = {
    imagePlaceholderStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width:110,
        height:75,
    },
    imagePlaceholderStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
    }
}

export default ImageLoad;
