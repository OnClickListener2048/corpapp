package cn.pilipa.corpapp;

import android.os.Bundle;
import android.support.annotation.LayoutRes;

import com.reactnativenavigation.controllers.SplashActivity;

import cn.jpush.android.api.JPushInterface;

// 闪屏界面: R.layout.launch_screen
public class MainActivity extends SplashActivity {

    /**
     * @return xml layout res id
     */
    @LayoutRes
    public int getSplashLayout() {
        return R.layout.launch_screen;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
        System.out.println("Init Jpush()");
    }


    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }
}