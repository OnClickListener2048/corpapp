/**
 * Created by jinglan on 2017/6/12.
 */
import {StyleSheet, Dimensions} from 'react-native';
import px2dp from '../../util/index'
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        flexDirection: 'column'
    }
});
export default styles;
