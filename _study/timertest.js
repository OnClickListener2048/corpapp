/**
 * Created by beansoft on 2017/6/27.
 */
let num = 0;
function typewrite() {
    num++;
    console.log(num)
    if(num === 5) {
        clearInterval(nIntervId);
    }
}

nIntervId = setInterval(typewrite, 500);