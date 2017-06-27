/**
 * Created by beansoft on 2017/6/27.
 */

let src = {"天津" : "1234"};
for( let index in src) {
    console.log(index);
    let obj = {};
    obj[index] = 1234;
    console.log(obj);
}
// let index = "中文";
// let obj = {};
// obj["" + index + ""] = 1234;
//
// console.log(obj);
//
// obj[index] = 1234;
// console.log(obj);