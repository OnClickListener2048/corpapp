/**
 * by liufei on 2017-8-21
 */

import 'react-native';
import React from 'react';
import MyOutSideWorkItemPage from '../MyOutSideWorkItemPage'
import {shallow} from 'enzyme';
import fetchMock from 'fetch-mock';


const navigator = Object.create(null);

navigator.setOnNavigatorEvent = jest.fn();
navigator.setButtons = jest.fn();
navigator.callback = jest.fn();

const wrapper = shallow(
    <MyOutSideWorkItemPage navigator={navigator}/>

);
let instance = wrapper.instance();

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


it('MyOutSideWorkItemPage 重复点击', (done) => {
    instance.props.allList==='all'
    jest.useFakeTimers();

    instance._press(null);

    setTimeout(() => {
        instance._press(1);
    }, 1000);

    jest.runAllTimers(null);
    expect(instance.state.canClickBtn, false);
});
