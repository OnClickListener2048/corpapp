package cn.pilipa.corpapp;

import android.app.Application;
import android.support.annotation.Nullable;
import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import cn.pilipa.alert.PLPAlertPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativenavigation.NavigationApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import cn.jpush.reactnativejpush.JPushPackage;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
//import com.tencent.bugly.Bugly;
import com.tencent.bugly.Bugly;
import com.tencent.bugly.beta.Beta;
import com.tencent.bugly.crashreport.CrashReport;
import com.microsoft.codepush.react.CodePush;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication{
    // 设置为 true 将不弹出 toast
    private boolean SHUTDOWN_TOAST = true;
    // 设置为 true 将不打印 log
    private boolean SHUTDOWN_LOG = true;

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }


    @Override
    public void onCreate() {
        super.onCreate();
        MultiDex.install(this);
//        CrashReport.initCrashReport(getApplicationContext(), "c2c07c0373", true);
        Bugly.init(getApplicationContext(), "c2c07c0373", true);
        Beta.checkUpgrade(false,false);
    }

    @Nullable
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
                //new MainReactPackage(),
                new PLPAlertPackage(),
                new PickerViewPackage(),
                new PickerPackage(),
                //new NavigationReactPackage(),
                new RNDeviceInfo(),
                new RealmReactPackage(),
                new VectorIconsPackage(),
                new BlurViewPackage(),
                new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
                new UmengReactPackage(),
                new CodePush("nAUClmgp3lGQfnnroHsXKtA2CDQAb9c43031-f8df-47b3-8e35-085700d8d99a", MainApplication.this, BuildConfig.DEBUG)
        );
    }

    @Override
    public String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }


}