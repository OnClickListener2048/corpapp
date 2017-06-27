/**
 * Created by beansoft on 2017/6/27.
 */

NetInfo.isConnected.fetch().done((isConnected) => {  })

NetInfo.isConnected.addEventListener(
    'change',
    isConnected => {
        if (isConnected !== undefined) {
            let status =
                isConnected === true ? '网络已恢复。' : '网络不可用。';
        }
    },
);

NetInfo.addEventListener(
    'change',
    reach => {
        reach = (reach == 'cell' ||
        reach.startsWith('MOBILE')) ? 'mobile' : 'wifi';
        if (reach !== undefined) {
            let status =
                reach == 'mobile' ? '当前为移动网络。' : '当前为WIFI网络。';
        }
    },
);