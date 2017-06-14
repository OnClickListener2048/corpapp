package cn.pilipa.corpapp;

import android.os.Bundle;
import android.support.annotation.LayoutRes;

import com.reactnativenavigation.controllers.SplashActivity;

// 闪屏界面: R.layout.launch_screen
public class MainActivity extends SplashActivity {

    /**
     * @return xml layout res id
     */
    @LayoutRes
    public int getSplashLayout() {
        return R.layout.launch_screen;
    }
}