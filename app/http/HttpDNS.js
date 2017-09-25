import HTTPBase from './HTTPBase';
// @deprecated 此类暂时未使用
export default class HttpDNS extends Object {
    static async parseDNS(host:string):string {
        try {
            let ip = await HTTPBase.getRaw("http://119.29.29.29/d", {dn:host});
            if(ip !== null && ip.length > 0) {
                return ip;
            }
        } catch (e) {
            console.log('tencent httpdns failure', e);
            return host;
        }

        return host;
    }
}