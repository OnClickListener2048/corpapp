/**
 * by liufei on 2017-8-18
 */

import 'react-native';
import React from 'react';
import MyOutSideWorkPage from '../MyOutSideWorkPage'
import {shallow} from 'enzyme';

// const navigator = Object.create(null);
//
// navigator.setOnNavigatorEvent = jest.fn();
//
const wrapper = shallow(
    <MyOutSideWorkPage navigator={navigator}/>

);

// 修正 Invariant Violation: Native module cannot be null.
jest.mock('NetInfo', () => {
    return {
        isConnected: {
            fetch: () => {
                return new Promise((accept, resolve) => {
                    accept(true);
                })
            },
            addEventListener: jest.fn()
        }
    }
});

it('componentWillMount执行了', () => {
    // console.log("wrapper======>", wrapper);
    let instance = wrapper.instance();
    instance.componentWillMount();





    // console.log("instance.refs.timerButton======>", instance.refs.timerButton);
    // // instance.refs.timerButton = {state : {counting: false}};
    // instance.updateMobile('13810397064');
    // expect(instance.state.mobile).toEqual('13810397064');
    // expect(instance.state.mobileValid).toEqual(true);
    //
    // instance.updateMobile('汉字1234');
    // expect(instance.state.mobile).toEqual('1234');
    // expect(instance.state.mobileValid).toEqual(false);
    //
    // console.log(instance);

    //   const tree = renderer.create(
    //       <LoginPage navigator={navigator} />
    //   ).toJSON();
    //   expect(tree).toMatchSnapshot();
});