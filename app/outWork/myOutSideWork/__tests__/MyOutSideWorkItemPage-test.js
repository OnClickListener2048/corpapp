/**
 * by liufei on 2017-8-21
 */

import 'react-native';
import React from 'react';
import MyOutSideWorkItemPage from '../MyOutSideWorkItemPage'
import {shallow} from 'enzyme';


const navigator = Object.create(null);

navigator.setOnNavigatorEvent = jest.fn();
navigator.setButtons = jest.fn();
navigator.callback = jest.fn();
navigator.push=jest.fn();

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

//提取方法以便复用
repeatClick=(time,state)=>{
    wrapper.setProps({allList:'all'});//设置属性值执行if语句

    jest.useFakeTimers();

    instance._press(null);
    setTimeout(() => {
        expect(instance.state.canClickBtn).toEqual(state);
    }, time);

    jest.runAllTimers(null);

}

it('MyOutSideWorkItemPage 1s内不可以点击', () => {
    repeatClick(500,false);
});

it('MyOutSideWorkItemPage 超过1s可点击', () => {
    repeatClick(2000,true);
});
