/**
 * Created by jiaxueting on 2017/7/3.
 */
import React, { PropTypes } from 'react';
import { Image, ActivityIndicator } from 'react-native';

class ImageLoad extends React.Component {
    static propTypes = {
        isShowActivity: PropTypes.bool,
    };

    static defaultProps = {
        isShowActivity: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isError: false
        };
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
        return(
            <Image
                onLoadEnd={this.onLoadEnd.bind(this)}
                onError={this.onError.bind(this)}
                style={[this.props.style, { alignItems: 'center' }]}
                source={this.props.source}
                resizeMode={this.props.resizeMode}
            >
                {
                    this.state.isLoaded && !this.state.isError ? null :
                        <Image
                            style={this.props.placeholderStyle ? this.props.placeholderStyle : styles.imagePlaceholderStyles}
                            source={this.props.placeholderSource ? this.props.placeholderSource : require('../img/empty-image.png')}
                            resizeMode={'contain'}
                        >
                            {
                                this.props.children  ? this.props.children :
                                    this.props.isShowActivity ?
                                        <ActivityIndicator
                                            size={this.props.loadingStyle ? this.props.loadingStyle.size : 'small'}
                                            color={this.props.loadingStyle ? this.props.loadingStyle.color : 'white'}
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
    }
}

export default ImageLoad;
