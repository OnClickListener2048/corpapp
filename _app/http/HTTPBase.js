/**
 * 基础的Http功能封装.
 * Created by beansoft on 17/5/22.
 */

var HTTPBase = {};

HTTPBase.commonHeaders = function (headers) {
    let finalHeaders = new Headers();
    finalHeaders.append('Cookie', 'search_test=1; beacon_id=MTAxLjI1MS4yMTQuMTMwLTMyODZELTU0RTg2MDgzNEUyNjktMTY; ' +
        'search_r=23; login_test=0;appInfo=hlj-android/3.5.8.1');
    if(headers) {
        // 获取 headers 内所有的 key
        let headersKeyArray = Object.keys(headers);
        // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
        headersKeyArray.forEach(key => finalHeaders.append(key, params[key]));
    }

    console.log("======> Header: ", finalHeaders, "\n");
    return finalHeaders;
}
/**
 *
 * GET请求
 *
 * @param url
 * @param params {}包装
 * @param headers
 *
 * @return {Promise}
 *
 * */
HTTPBase.get = async function (url, params, headers) {
    if (params) {

        let paramsArray = [];

        // 获取 params 内所有的 key
        let paramsKeyArray = Object.keys(params);
        // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
        paramsKeyArray.forEach(key => paramsArray.push(key + '=' + params[key]));

        // 网址拼接
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&');
        }else {
            url += paramsArray.join('&');
        }
    }
    console.log("======> ", url, "\n");
    let response = await  fetch(url, {
        method:'GET',
        headers:this.commonHeaders(headers)
    });

    if (!response.ok) return new Error(response);

    let responseJson = await response.json();
    console.log("response:",  responseJson, "\n");
    return responseJson;
    // return new Promise(function (resolve, reject) {
    //     fetch(url, {
    //         method:'GET',
    //         headers:headers
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             resolve(response);
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
HTTPBase.post = async function (url, params, headers) {
    if (params) {
        // 初始化FormData
        var formData = new FormData();

        // 获取 params 内所有的 key
        let paramsKeyArray = Object.keys(params);
        // 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
        paramsKeyArray.forEach(key => formData.append(key, params[key]));
    }

    console.log("======> ", url, "\n");
    let response = await fetch(url, {
        method:'POST',
        // headers:headers,
        headers:this.commonHeaders(headers),
        body:formData,
    });
    let responseJson = await response.json();
    console.log("response:",  responseJson, "\n");
    return responseJson;

    // return new Promise(function (resolve, reject) {
    //     fetch(url, {
    //         method:'POST',
    //         headers:headers,
    //         body:formData,
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             resolve(response);
    //         })
    //         .catch((error) => {
    //             reject({status:-1})
    //         })
    //         .done();
    // })
};

global.HTTPBase = HTTPBase;