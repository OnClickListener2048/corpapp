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
    Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

var HTTPBase = {};

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
HTTPBase.getEx = async function (url, params, headers) {
    let responseJson = await this.get(url, params, headers);
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
HTTPBase.postEx = async function (url, params= {}, headers= null) {
    let responseJson = await this.post(url, params, headers);
    console.log('HTTPBase.postEx()');
    return HTTPBase._handleResponse(responseJson);
}

// 通用的处理响应报文的方法
HTTPBase._handleResponse = async function(responseJson) {
    if(responseJson.success == true && responseJson.code == 200) {
        return responseJson;
    }
    console.log("后台响应报文有误");
    return Promise.reject(responseJson);
}

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
HTTPBase.get = async function (url, params= {}, headers= null) {
    let paramsFinal = await this._commonParams(params);

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

    console.log("======> ", url, "\n");
    let response = await  fetch(url, {
        method:'GET',
        headers:this._commonHeaders(headers)
    });

    console.log(response);

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
HTTPBase.post = async function (url, params= {}, headers= null) {
    let paramsArray = await this._commonParams(params);
    let formData = new FormData();
    for (let [k, v] of Object.entries(paramsArray)) {
        if(v !== null) {
            formData.append(k, v);
        }
    }
    console.log("POST======> ", url, "params", formData, "\n");
    let response = await fetch(url, {
        method:'POST',
        headers:this._commonHeaders(headers),
        body:formData,
    });

    return this._parseHttpResult(response);
};

HTTPBase._parseHttpResult = async function (response) {
    if (!response.ok) {
        let text = await response.text();
        console.log("error response text:", text);
        try {
            let responseJson = JSON.parse(text);
            console.log("post() will throw2 ", JSON.stringify(responseJson));
            return Promise.reject(responseJson);
        } catch (e) {
            console.log("post() will throw2 error ", e);
            return Promise.reject(this._makeErrorMsg(response));
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
        return Promise.reject(this._makeErrorMsg(response));
    }

}

// 处理默认的Http错误信息, 确保msg不为空
HTTPBase._makeErrorMsg =  function (response) {

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

HTTPBase._commonHeaders =  function (headers) : Headers {
    let finalHeaders = new Headers();
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
HTTPBase._commonParams = async function (params) {
    let paramsArray = {};

    try {
        let token = await UserInfoStore.getUserToken();
        console.log('_commonParams token', token);
        if (token !== null){
            paramsArray.token = token;
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

global.HTTPBase = HTTPBase;// 全局可用