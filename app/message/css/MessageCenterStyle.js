/**
 * Created by jinglan on 2017/6/9.
 */
import {StyleSheet, Dimensions} from 'react-native';
import px2dp from '../../util'
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;
const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FAFAFA',
            flexDirection: 'column'
        },

         rowStyle: {
             marginTop: 15,
             height : 65,
             backgroundColor: '#FAFAFA',
             flexDirection: 'column'

         },
    realRowStyle: {
        marginLeft: 27.5,
        marginRight: 15,
        height : 65,
        // justifyContent : 'space-between',
        // borderBottomColor: 'blue',
        borderBottomWidth: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

        borderColor: '#FAFAFA',
        borderRadius: 6,
        borderWidth: 1,

    },
    titleViewStyle: {
        marginLeft: 10,
         marginRight: 22.5,
        flex: 1,
        height : 65,
        // maxWidth: SCREEN_WIDTH - 120,
        // width : 200,
        flexDirection: 'column',

    },
    timeTitleStyle: {
        fontSize: 14,
        marginTop: 15,
        marginLeft : 10,
        marginRight : 15,
        color : '#969696',
        // marginRight: 22.5,
        // width : 200,

    },
    }
);
export default styles;
