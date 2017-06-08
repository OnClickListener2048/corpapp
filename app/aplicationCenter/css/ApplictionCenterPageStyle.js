import {StyleSheet, Dimensions} from 'react-native';
import px2dp from '../../util'
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column'
    },
    // phone input box
    applicationViewContainer: {
        height: (SCREEN_WIDTH - 45)/2,
        width: (SCREEN_WIDTH - 45)/2,
        backgroundColor: '#FFFFFF',

        // width: SCREEN_WIDTH,
        // backgroundColor: '#FFDDFF',
        flexDirection: 'row',
        //justifyContent:'center'
    }
    }
);
export default styles;
