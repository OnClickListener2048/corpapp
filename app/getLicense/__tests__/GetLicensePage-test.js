/**
 * Created by jiaxueting on 2017/8/18.
 */
import GetLicensePage from '../GetLicensePage';
import 'react-native';
import React from 'react';
import fetchMock from 'fetch-mock';
import * as apis from '../../apis';
fetchMock.get('https://app.i-counting.cn/app/v0/outsource/task/step',
    JSON.parse('{"success":true,"code":200,"msg":null,"data":{"allowEditInfo":"true","bizLics":["https://qd.pilipa.cn/FileUploads/Order/BusinessLicense/201708/BodyPart_5be6636a-8609-448d-a155-1d426ab181c1.jpg"],"bizRange":"sfdg","bizTime":{"startDate":"2017-07-03","endDate":"2017-08-11","unlimited":"false"},"contactName":"s**","contactPhone":"dg********","corpAddress":"sdfg","corpAddressArea":{"cityId":"110100","districtId":"","city":"北京市","district":""},"corpName":"sfgd","corpTypeId":2,"corpType":"一般纳税人","idCards":[],"industryId":1,"industry":"农、林、牧、渔业","legalEntity":"dg","localTaxId":"sdf","nationalTaxId":"gfs","progress":{"finished":"true","inProgress":false,"materialConfirm":"false"},"regFunds":"1000000","regId":"sdf","salesmanName":"z**","salesmanPhone":"135********","stepContact":"贾雪婷","stepId":2559,"stepName":"核实名称","taskId":531,"taskName":"通办任务2","taskStatus":"已完成"}}'));

it('getLicensePage', async () => {
    const response = await fetch('https://app.i-counting.cn/app/v0/outsource/task/step');
    const result = await response.json();
    expect(result.code).toEqual(200);
    // expect((await apis.loadOutSourceTaskStep('2559', '531')).code).toEqual(200);

});


