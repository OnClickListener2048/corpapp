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
             backgroundColor: 'orange',
             flexDirection: 'column'

         },
    realRowStyle: {
        marginLeft: 27.5,
        marginRight: 15,
        height : 65,

        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'

    },
    titleViewStyle: {
        marginLeft: 22.5,
        marginRight: 15,
        height : 65,
        // width : 200,
        flexDirection: 'column'

    },


    }
);
export default styles;
