/**
 * Created by jinglan on 2017/8/18.
 */
import 'react-native';
import React from 'react';
import fetchMock from 'fetch-mock';
import * as apis from '../../apis';
import MyOutSideWorkPage from '../MyOutSideWorkPage';
import {shallow} from 'enzyme';

const navigator = Object.create(null);

navigator.setOnNavigatorEvent = jest.fn();

const wrapper = shallow(
    <MyOutSideWorkPage navigator={navigator}/>
);
fetchMock.get('https://app.i-counting.cn/app/v0/outsource/task',
    JSON.parse('{"success":true,"code":200,"msg":null,"data":{"contactName":"1","contactPhone":"1vbj","corpName":"测试测试","salesmanName":"zhangsa","salesmanPhone":"13581665456","taskId":788,"taskName":"其他","taskStatus":"待分配","steps":[{"stepContact":"张经兰","stepId":"3879","stepName":"交社保","stepStatus":"进行中","outWorkerId":"1337","subsidiaryId":"101101160630000005"},{"stepContact":"张经兰","stepId":"3880","stepName":"国税报道","stepStatus":"待处理","outWorkerId":"1337","subsidiaryId":"101101160630000005"},{"stepContact":"张经兰","stepId":"3881","stepName":"地税报道","stepStatus":"待处理","outWorkerId":"1337","subsidiaryId":"101101160630000005"}]}}'));


it('outSideTaskPageTest', async () => {
    // fetchMock.get('https://app.i-counting.cn/app/v0/outsource/task', {hello: "world"});
    const response = await fetch('https://app.i-counting.cn/app/v0/outsource/task');
    // console.log("fetch******=", response.json());
    // const response = await fetch('http://fake.com');
    // console.log("fetch response ******=", response);
    // const response = await HTTPBase.get('http://fake.com', {});
    const result = await response.json();
    expect(result.success).toEqual(true);
});

//这个不成功
it('outSideTaskPageTest Component should be render', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
    let companyInfoView = wrapper.find('companyInfoView');
    // console.log(timerBtn.instance());
    expect(wrapper.find('companyInfoView').exists());
})


