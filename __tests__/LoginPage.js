import 'react-native';
import React from 'react';
import LoginPage from '../app/user/LoginPage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

// 修正 Invariant Violation: Native module cannot be null.
jest.mock('NetInfo', () => {
    return {
        isConnected: {
            fetch: () => {
                return new Promise((accept, resolve) => {
                    accept(true);
                })
            },
            addEventListener:jest.fn()
        }
    }
});


const navigator = Object.create(null);

navigator.setOnNavigatorEvent = jest.fn();

const wrapper = shallow(
    <LoginPage navigator={navigator} />
);

// case1
// 通过查找存在 Input,测试组件正常渲染
it('timerButton Component should be render', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
    expect(wrapper.find('timerButton').exists());
})

it('renders correctly', () => {

  // console.log("wrapper======>", wrapper);
    let instance = wrapper.instance();
    instance.componentDidMount();
    console.log("instance.refs.timerButton======>", instance.refs.timerButton);
    // instance.refs.timerButton = {state : {counting: false}};
    instance.updateMobile('13810397064');
    expect(instance.state.mobile).toEqual('13810397064');

    console.log(instance);

  //   const tree = renderer.create(
  //       <LoginPage navigator={navigator} />
  //   ).toJSON();
  //   expect(tree).toMatchSnapshot();
});
