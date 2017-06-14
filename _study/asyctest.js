/**
 * async中的错误处理:
 * http://es6.ruanyifeng.com/#docs/async
 * 注意: Error 对象的message只能是字符串对象, 不能是普通Object.
 */

async function f() {
    let obj = {'id': 1, 'message': '出错了'};
    return Promise.reject(obj);
}

f().then(
    v => console.log(v),
    e => console.log(e.message)
)

/**
 * 以下代码为绕弯版本:
 *
 async function f() {
    let obj = {'id': 1, 'message': 'error'};
    throw new Error(JSON.stringify(obj));
}

 f().then(
 v => console.log(v),
 e => {
        console.log(e.message)
        console.log(JSON.parse(e.message).id)
    }
 )
 */