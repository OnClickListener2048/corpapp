/**
 * Created by jiaxueting on 2017/6/14.
 */
import {StyleSheet, Dimensions} from 'react-native';
import px2dp from '../../util'
const window = Dimensions.get('window');

export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;
const styles = StyleSheet.create({
        container: {
            backgroundColor: '#FAFAFA',
            flexDirection: 'column'
        },

         rowStyle: {
             marginTop: 18,
             height : 75,
             backgroundColor: '#FAFAFA',
             flexDirection: 'column'

         },
        realRowStyle: {
            marginLeft: 23.5,
            marginRight: 15,
            height : 75,
            // justifyContent : 'space-between',
            // borderBottomColor: 'blue',
            borderBottomWidth: 1,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            borderColor: '#FAFAFA',
            borderRadius: 6,
            borderWidth: 1,

        },
    badgeBubble: {
        width: 37,
        height:37,
        marginLeft: -15,
        alignSelf: 'center',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        top: -0.5
    },

    titleViewStyle: {
        marginLeft: 10,
        flex: 1,
        height : 65,
        // maxWidth: SCREEN_WIDTH - 120,
        // width : 200,
        flexDirection: 'column',

    },
    timeTitleStyle: {
        fontSize: 14,
        marginTop: 30,
        marginLeft : 10,
        marginRight : 15,
        color : '#a2a1a6',
        // marginRight: 22.5,
        // width : 200,

    },
    }
);
export default styles;
