/**
 * Created by jiaxueting on 2017/6/22.
 */

import {postApi, getApi} from './common';

/**
 * 外勤主任务数
 * @returns {Promise}
 */
export function loadOutSourceCount() {
    return postApi('/app/v0/outsource/count');
}

/**
 * 外勤主任务列表
 * @param count
 * @param sinceId
 * @param taskType  todo（待处理）或inProgress（进行中）, end（已完成）或all（全部）
 * @returns {Promise}
 */
export function loadOutSourceList(count = 15, sinceId = '',taskType='') {
    return postApi('/app/v0/outsource/list',{count, sinceId ,taskType });
}


/**
 * 我的外勤-主任务详情 即 公司信息 + 所有的任务信息 包括 任务处理人员 任务ID 任务状态
 */

export function loadOutSourceTask(taskId = '1') {
    return postApi('/app/v0/outsource/task',{taskId});
}
