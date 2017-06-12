package cn.pilipa.corpapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativenavigation.NavigationReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
              return Arrays.<ReactPackage>asList(
                  //new MainReactPackage(),
                    //new NavigationReactPackage(),
                    new RNDeviceInfo(),
                    new RealmReactPackage(),
                    new VectorIconsPackage(),
                    new SplashScreenReactPackage(),
                    new BlurViewPackage()
              );
    }

}