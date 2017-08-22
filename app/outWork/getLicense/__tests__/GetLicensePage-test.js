/**
 * Created by jiaxueting on 2017/8/18.
 */
import GetLicensePage from '../GetLicensePage';
import 'react-native';
import React from 'react';
import fetchMock from 'fetch-mock';
import {shallow} from 'enzyme';
import responseData from './getLicenseData.json'


fetchMock.get('https://app.i-counting.cn/app/v0/outsource/task/step',
    JSON.parse('{"success":true,"code":200,"msg":null,"data":{"allowEditInfo":"true","bizLics":["https://qd.pilipa.cn/FileUploads/Order/BusinessLicense/201708/BodyPart_5be6636a-8609-448d-a155-1d426ab181c1.jpg"],"bizRange":"sfdg","bizTime":{"startDate":"2017-07-03","endDate":"2017-08-11","unlimited":"false"},"contactName":"s**","contactPhone":"dg********","corpAddress":"sdfg","corpAddressArea":{"cityId":"110100","districtId":"","city":"北京市","district":""},"corpName":"sfgd","corpTypeId":2,"corpType":"一般纳税人","idCards":[],"industryId":1,"industry":"农、林、牧、渔业","legalEntity":"dg","localTaxId":"sdf","nationalTaxId":"gfs","progress":{"finished":"true","inProgress":false,"materialConfirm":"false"},"regFunds":"1000000","regId":"sdf","salesmanName":"z**","salesmanPhone":"135********","stepContact":"贾雪婷","stepId":2559,"stepName":"核实名称","taskId":531,"taskName":"通办任务2","taskStatus":"已完成"}}'));
const navigator = Object.create(null);

navigator.setOnNavigatorEvent = jest.fn();
navigator.setButtons = jest.fn();
navigator.push = jest.fn();
const wrapper = shallow(
    <GetLicensePage navigator={navigator}/>
);
let instance = wrapper.instance();

it('getLicensePage 模拟接口请求返回数据', async () => {
    const response = await fetch('https://app.i-counting.cn/app/v0/outsource/task/step');
    const result = await response.json();
    expect(result.code).toEqual(200);
    // expect((await apis.loadOutSourceTaskStep('2559', '531')).code).toEqual(200);

});

it('getLicensePageTest 经营范围--重复跳转逻辑', () => {
    jest.useFakeTimers();
    instance.toMultiTextInput();
    // instance.toLicense(null);

    // expect(instance.state.canClickBtn, false);
    setTimeout(() => {
        instance.toMultiTextInput();
    }, 2000);

    jest.runAllTimers();
    expect(instance.state.canClickBtn, true);
});

it('getLicensePageTest 图片--重复跳转逻辑', () => {
    jest.useFakeTimers();
    instance._watchImVisible(null);
    // instance.toLicense(null);

    // expect(instance.state.canClickBtn, false);
    setTimeout(() => {
        instance._watchImVisible(null);
    }, 2000);

    jest.runAllTimers();
    expect(instance.state.canClickBtn, true);
});

fetchMock.post('*', responseData);
it('getLicensePage 模拟接口请求是否得到渲染', (done) => {
    instance._loadData()
    jest.useRealTimers();
    setTimeout(() => {
        let data =  responseData.data;
        //数据源比较
        expect( instance.state.detailObj).toEqual(data);
        //是否请求失败比较
        expect( instance.state.loaded).toEqual(true);
        done();
        }, 2000);


});

