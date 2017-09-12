/**
 * 用户基本信息
 * Created by jiaxueting on 2017/9/11.
 */
var SearchHistoryStore = {};

import Realm from 'realm';

const AllSchame = {
    name:'AllData',
    properties:{
        corpName:'string',
        stepId:'string',
        stepName:'string',
        taskId:'string',
        taskName:'string',
        taskStatus:'string',
        connector:'string',
        createDate:'string',
    }
};

const AddSchame = {
    name:'AddData',
    properties:{
        corpName:'string',
        stepId:'string',
        stepName:'string',
        taskId:'string',
        taskName:'string',
        taskStatus:'string',
        connector:'string',
        createDate:'string',
    }
};

// 初始化realm
let realm = new Realm({schema:[AllSchame]});

// 增加
SearchHistoryStore.create = function (schame, data) {
    realm.write(() => {
        for (let i = 0; i<data.length; i++) {
            let temp = data[i];
            realm.create(schame, {corpName:temp.corpName, stepId:temp.stepId, stepName:temp.stepName,
                taskId:temp.taskId, taskName:temp.taskName, taskStatus:temp.taskStatus,
                connector:temp.connector,createDate:temp.createDate});
        }
    })
}

// 增加一条
SearchHistoryStore.singleCreate = function (schame, data) {
    console.log("增加的数据是否为空="+data+";;"+data.corpName);
    realm.write(() => {
        realm.create(schame, {corpName:data.corpName, stepId:data.stepId, stepName:data.stepName,
            taskId:data.taskId, taskName:data.taskName, taskStatus:data.taskStatus,
            connector:data.connector,createDate:data.createDate});
    })
}

// 查询全部数据
SearchHistoryStore.loadAll = function (schame) {
    return realm.objects(schame);
}

// 条件查询
SearchHistoryStore.filtered = function (schame, filtered) {
    // 获取对象
    let objects = realm.objects(schame);
    // 筛选
    let object = objects.filtered(filtered);

    if (object) {   // 有对象
        return object;
    }else {
        return '未找到数据';
    }
}

// 删除所有数据
SearchHistoryStore.removeAllData = function (schame) {
    realm.write(() => {
        // 获取对象
        let objects = realm.objects(schame);
        // 删除表
        realm.delete(objects);
    })
}

global.SearchHistoryStore = SearchHistoryStore;


