/**
 * Created by jinglan on 2017/6/16.
 */
import {postApi, getApi} from './common';
export function loadMessageData(count = 15, sinceId = '') {
    return postApi('/app/v0/message/list', {count, sinceId});
}