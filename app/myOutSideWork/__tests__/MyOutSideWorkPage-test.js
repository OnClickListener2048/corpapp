/**
 * by liufei on 2017-8-18
 */

import 'react-native';
import React from 'react';
import MyOutSideWorkPage from '../MyOutSideWorkPage'
import {shallow} from 'enzyme';
import fetchMock from 'fetch-mock';


const navigator = Object.create(null);

navigator.setOnNavigatorEvent = jest.fn();
navigator.setButtons = jest.fn();
navigator.push = jest.fn();

const wrapper = shallow(
    <MyOutSideWorkPage navigator={navigator}/>

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

it('componentWillMount执行了', () => {
    expect(instance.state.needLoding).toEqual(true);
});


fetchMock.restore();// 重置数据
fetchMock.post('*', {"success":true,"code":200,"msg":null,"data":{"inProgressNum":3,"todoNum":0,"totalNum":3},"jest-post": true},);


//mock接口请求不管用
it('测试接口请求后outSourceCountObj状态值设置', (done) => {
    instance._loadCount(true);

    jest.useRealTimers();//使用真正的定时器用于同步接口请求

    setTimeout(function() {
        expect(instance.state.outSourceCountObj).toEqual({"inProgressNum":3,"todoNum":0,"totalNum":3});
        done();
    }, 1000);

});

