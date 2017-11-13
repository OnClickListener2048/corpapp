/**
 * Created by jinglan on 2017/6/16.
 */
import {postApi, getApi} from './common';
export function loadMessageData(count = 15, sinceId = '') {
    return postApi('/app/v0/message/list', {count, sinceId});
}

export function loadMessageReaded( msgId = '') {
    return postApi('/app/v0/message/markRead', {msgId});
}

// 获取所有未读消息数
export function loadMessageTotalReaded( ) {
    return postApi('/app/v0/message/list/count');
}

//索引获取数据
export function loadSearchIndex( queryText = '',count = '') {
    return postApi('/app/v0/outsource/search', {queryText,count});
}

//点击确定获取具体数据
export function loadSearchData(queryText = '' ,count = '',sinceId='') {
    return postApi('/app/v0/outsource/search', {queryText,count,sinceId});
}