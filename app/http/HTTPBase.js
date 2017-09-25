/**
 * 基础的Http功能封装.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Headers
 * https://developer.mozilla.org/en-US/docs/Web/API/Response
 * node_modules/node-fetch/lib/response.js
 * https://developer.mozilla.org/en-US/docs/Web/API/Request
 * http://www.jianshu.com/p/ccf99a12faf1
 * https://github.com/rebeccahughes/react-native-device-info 设备信息
 *
 * Created by beansoft on 17/5/22.
 */

import {
    Platform, DeviceEventEmitter, NetInfo
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import '../util/NetInfoSingleton';

export default class HTTPBase extends Object {
    static oldFetchfn = fetch; //拦截原始的fetch方法
    static timeout = 10;// 5秒请求超时

    static _fetch(input, opts) {//定义新的fetch方法，封装原有的fetch方法, 支持超时
        if (__DEV__) {
            return fetch(input, opts);// fix jest
        }

        let fetchPromise = oldFetchfn(input, opts);

        if (opts.timeout === undefined) {
            opts.timeout = timeout;
        }

        let timeoutPromise = new Promise(function (resolve, reject) {
            setTimeout(() => {
                console.log("HTTPBase._fetch() 请求超时!");
                reject({'code': '408', 'msg': '暂无网络'});
            }, opts.timeout)
        });

        return Promise.race([fetchPromise, timeoutPromise]);
    }

    /**
     * 支持报文校验处理的GET请求.
     *
     * @param url
     * @param params {} 表单参数
     * @param headers 自定义头信息
     *
     * @return {Promise}
     *
     */
    static async getEx(url, params, headers) {
        let responseJson = await HTTPBase.get(url, params, headers);
        console.log('HTTPBase.getEx()');
        return HTTPBase._handleResponse(responseJson);
    }

    /**
     * 支持报文校验处理的GET请求.
     *
     * @param url
     * @param params {} 表单参数
     * @param headers 自定义头信息
     *
     * @return {Promise}
     *
     * */
    static async postEx(url, params= {}, headers= null) {
        if(!NetInfoSingleton.isConnected) {
            return Promise.reject(
                {'code':  '4009', 'msg':  '网络错误'}//（错误代码：4009）
            );
        }

        let responseJson = await HTTPBase.post(url, params, headers);
        console.log('HTTPBase.postEx()');
        return HTTPBase._handleResponse(responseJson);
    }

    // 通用的处理响应报文的方法
    static async _handleResponse(responseJson) {
        console.log("_handleResponse" + responseJson);
        if(responseJson !== undefined && responseJson.hasOwnProperty('success') &&
            responseJson.hasOwnProperty('code')) {
            if (responseJson.success === true && responseJson.code === 200) {
                return responseJson;
            } else if (responseJson.success === false && responseJson.code === 40000003) {
                // Token无效时自动跳转到登录页
                DeviceEventEmitter.emit('goLoginPage', true);
                return Promise.reject(responseJson);
            }
        }
        console.log("后台响应报文有误");
        return Promise.reject(responseJson);
    }

    /**
     * GET请求, 不与当前业务有任何关联, 不使用HttpDNS.
     *
     * @param url
     * @param params {} 表单参数
     * @param headers 自定义头信息
     *
     * @return {Promise}
     *
     * */
    static async getRaw(url, params= {}, headers= null) {
        if (params) {
            let paramsArray = [];

            // 获取 params 内所有的 key
            let paramsKeyArray = Object.keys(params);
            // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
            paramsKeyArray.forEach(key => paramsArray.push(key + '=' + params[key]));
            // 网址拼接
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += paramsArray.join('&');
            }
        }

        console.log(new Date().toString() + "======> ", url, "\n");
        let response = await HTTPBase._fetch(url, {
            method:'GET',
            headers:headers
        });

        console.log(new Date().toString() + "<<<<<<== " , response.statusText);

        if (!response.ok) {
            let text = await response.text();
            console.log("will throw ", text);
            // throw new Error(text);
            return Promise.reject(text);
        }

        let responseText = await response.text();
        console.log("response text:",  responseText, "\n");
        return responseText;
    };


    /**
     * GET请求
     *
     * @param url
     * @param params {} 表单参数
     * @param headers 自定义头信息
     *
     * @return {Promise}
     *
     * */
    static async get(url, params= {}, headers= null) {
        let paramsFinal = await HTTPBase._commonParams(params);

        if (paramsFinal) {
            let paramsArray = [];

            // 获取 params 内所有的 key
            let paramsKeyArray = Object.keys(paramsFinal);
            // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
            paramsKeyArray.forEach(key => paramsArray.push(key + '=' + paramsFinal[key]));
            // 网址拼接
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += paramsArray.join('&');
            }
        }

        console.log(new Date().toString() + "======> ", url, "\n");
        let response = await HTTPBase._fetch(url, {
            method:'GET',
            headers:HTTPBase._commonHeaders(headers)
        });

        console.log(new Date().toString() + "<<<<<<== " + response);

        if (!response.ok) {
            let text = await response.text();
            console.log("will throw ", text);
            // throw new Error(text);
            return Promise.reject(text);
        }

        let responseJson = await response.json();
        console.log("response:",  responseJson, "\n");
        return responseJson;
        // return new Promise(function (resolve, reject) {
        //     fetch(url, {
        //         method:'GET',
        //         headers:headers
        //     })
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //             resolve(responseJson);
        //         })
        //         .catch((error) => {
        //             reject({status:-1})
        //         })
        //         .done();
        // })
    };


    /**
     *
     * POST请求
     * @param url
     * @param params {}包装
     * @param headers
     *
     * @return {Promise}
     *
     **/
    static async post(url, params= {}, headers= null) {
        let paramsArray = await HTTPBase._commonParams(params);
        let formData = new FormData();
        for (let [k, v] of Object.entries(paramsArray)) {
            if(v !== null) {
                formData.append(k, v);
            }
        }

        let start = new Date().getTime();
        console.log( "======> POST " + new Date() , " ", url, "params", formData, "\n");
        let response = await HTTPBase._fetch(url, {
            method:'POST',
            headers:HTTPBase._commonHeaders(headers),
            body:formData,
        });
        let end = new Date().getTime();
        console.log( "<====== 耗时 " + (end - start) + "毫秒");

        return HTTPBase._parseHttpResult(response);
    };

    /**
     * TODO 此功能需要第三方库支持, 暂时先不用
     * POST请求, 返回原始的response对象, 不进行任何解析.
     * @param url
     * @param params {}包装
     * @param headers
     *
     * @return {Promise}
     *
     **/
    static async postRaw (url, params= {}, headers= null) {
        let paramsArray = await HTTPBase._commonParams(params);
        let formData = new FormData();
        for (let [k, v] of Object.entries(paramsArray)) {
            if(v !== null) {
                formData.append(k, v);
            }
        }
        console.log("POST======> ", url, "params", formData, "\n");
        let response = await fetch(url, {
            method:'POST',
            headers:HTTPBase._commonHeaders(headers),
            body:formData,
        });

        return response;
    };

    static async _parseHttpResult(response) {
        if (!response.ok) {
            let text = await response.text();
            console.log("error response text:", text);
            try {
                let responseJson = JSON.parse(text);
                console.log("post() will throw2 ", JSON.stringify(responseJson));
                return HTTPBase._handleResponse(responseJson);
                // return Promise.reject(responseJson);
            } catch (e) {
                console.log("post() will throw2 error ", e);
                return Promise.reject(HTTPBase._makeErrorMsg(response));
            }
        }

        try {
            let text = await response.text();
            try {
                let responseJson = JSON.parse(text);
                console.log("post() will throw2 ", JSON.stringify(responseJson));
                return responseJson;
            } catch (e) {
                if(text !== '' && text.length > 0) {
                    return Promise.reject(text);
                }
            }
        } catch (e) {
            console.log("post() will throw2 error ", e);
            return Promise.reject(HTTPBase._makeErrorMsg(response));
        }

    }

// 处理默认的Http错误信息, 确保msg不为空
    static _makeErrorMsg (response) {

        let {status, statusText} = response;
        if (statusText === undefined) {
            let errorMap = new Map();
            errorMap.set(200, '成功');
            errorMap.set(400, '请求不正确');
            errorMap.set(401, '没有权限');
            errorMap.set(404, '找不到文件或目录');
            errorMap.set(413, '发送内容过大');
            errorMap.set(500, '服务器内部错误');
            errorMap.set(502, '服务暂时不可用');
            errorMap.set(504, '服务器处理超时');

            statusText= errorMap.get(status);
            if (statusText === undefined) {
                statusText = '请求服务出错';
            }
        }
        return {'code':  status, 'msg':  statusText}
    }

    static _commonHeaders =  function (headers) : Object {
        let finalHeaders = new Object();
        // finalHeaders.append('Cookie', ''); // TODO 登录时的头信息, userAgent
        if(headers) {
            // 获取 headers 内所有的 key
            let headersKeyArray = Object.keys(headers);
            // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
            headersKeyArray.forEach(key => finalHeaders.append(key, params[key]));
        }

        console.log("======> Header: ", finalHeaders, "\n");
        return finalHeaders;
    }

// 添加App的公共表单参数
    static async _commonParams(params) {
        let paramsArray = {};

        try {
            let token = await UserInfoStore.getUserToken();
            console.log('_commonParams token', token);
            if (token !== null){
                paramsArray.token = token;
            } else {
                paramsArray.token = '0';// 给一个空token
            }
        } catch (error) {
        }

        paramsArray.version = DeviceInfo.getVersion();
        paramsArray.deviceType = Platform.OS;
        paramsArray.deviceId = DeviceInfo.getUniqueID();
        // 获取 params 内所有的 key
        let paramsKeyArray = Object.keys(params);
        // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
        paramsKeyArray.forEach(key => paramsArray[key] =  params[key] );
        return paramsArray;
    }

}

// global.HTTPBase = HTTPBase;// 全局可用