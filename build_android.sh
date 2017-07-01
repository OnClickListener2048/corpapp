rm -f android/app/src/main/assets/index.android.bundle
react-native bundle --platform android --entry-file index.android.js --reset-cache --bundle-output android/app/src/main/assets/index.android.bundle --dev false --assets-dest android/app/src/main/res/
rm -f android/app/build/outputs/apk/app-release.apk
cd android && ./gradlew assembleRelease