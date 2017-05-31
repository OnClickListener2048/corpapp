import {StyleSheet, Dimensions} from 'react-native';
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

export default StyleSheet.create({

    fullScreen: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        resizeMode: 'cover',
        marginBottom: 0,
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column'
    },
});
