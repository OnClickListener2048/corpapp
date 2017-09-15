package cn.pilipa.corpapp;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * 腾讯云免费版HttpDNS客户端, OkHttp3版本.
 * 如果流量很大, 需要购买企业版服务.
 * Created by beansoft on 2017/9/15.
 */

public class TencentHttpDNSHelper {
    /**
     * 根据url获得ip,此方法只是最简单的模拟,实际情况很复杂,需要做缓存处理
     *
     * @param host
     * @return
     */
    public static String getIpByHost(String host) {
        // 腾讯云 http://119.29.29.29/d?dn=www.dnspod.cn.
        HttpUrl httpUrl = new HttpUrl.Builder()
                .scheme("http")
                .host("119.29.29.29")
                .addPathSegment("d")
                .addQueryParameter("dn", host)
                .build();
        //与我们正式请求独立，所以这里新建一个OkHttpClient
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder()
                .url(httpUrl)
                .get()
                .build();
        try {
            String result = null;
            /**
             * 子线程中同步去获取
             */
            Response response = okHttpClient.newCall(request).execute();
            if (response.isSuccessful()) {
                String body = response.body().string();
                return body;
//                JSONObject jsonObject = new JSONObject(body);
//                JSONArray ips = jsonObject.optJSONArray("ips");
//                if (ips != null) {
//                    result = ips.optString(0);
//                }
            }
//            return result;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
