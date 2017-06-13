# 噼里啪 Pi Corp App

This is the repository for corp version of mobile apps of pilipa. It's powered by React Native for supporting both iOS and Android.

## 新导航组件的使用说明

https://wix.github.io/react-native-navigation

, 支持单页直接跳转, 直接自带顶部导航栏配置(返回,标题栏和右侧按钮), 支持直接跳转到多Tab页面, 支持隐藏显示Tab页, 支持数字气泡.

此组件底层全部使用Native代码实现, 基于iOS和Android封装而成, 缺陷是不支持顶部导航栏, 顶部导航栏可参考使用 https://github.com/Slowyn/react-native-underline-tabbar(带数字提示), 不带数字提示的可使用 https://github.com/skv-headless/react-native-scrollable-tab-view.

步骤:

1. app/screen.js 所有需要通过导航跳转的组件都需要在此文件中注册, 第一个参数为组件别名, 需要唯一, 建议带包名.

2. 在子页面中进行跳转

   跳入

```javascript
this.props.navigator.push({
  screen: 'example.ScreenThree', // unique ID registered with Navigation.registerScreen
  title: undefined, // 导航栏标题 (可选)
  titleImage: require('../../img/my_image.png'), //导航栏标题图片, 代替文字标题 (可选)
  passProps: {}, // 被跳转页面的属性 (可选)
  animated: true, // 是否显示动画 (可选)
  backButtonTitle: undefined, // 返回按钮的文字 (可选)
  backButtonHidden: false, // 是否隐藏返回按钮 (可选)
  navigatorStyle: {}, // 覆盖默认导航栏风格 (可选)
  navigatorButtons: {} // 覆盖默认导航栏按钮 (可选)
});
```

跳出

```javascript
this.props.navigator.pop({
  animated: true // does the pop have transition animation or does it happen immediately (可选)
});
```

替换当前页(不可返回原页面)

```javascript
this.props.navigator.resetTo({
  screen: 'example.ScreenThree', // unique ID registered with Navigation.registerScreen
  title: undefined, // 导航栏标题 (可选)
  titleImage: require('../../img/my_image.png'), //导航栏标题图片, 代替文字标题 (可选)
  passProps: {}, // 被跳转页面的属性 (可选)
  animated: true, // 是否显示动画 (可选)
  navigatorStyle: {}, // 覆盖默认导航栏风格 (可选)
  navigatorButtons: {} // 覆盖默认导航栏按钮 (可选)
});
```

显示模态页面

```javascript
this.props.navigator.showModal({
  screen: "example.ModalScreen", // unique ID registered with Navigation.registerScreen
  title: "Modal", // title of the screen as appears in the nav bar (可选)
  passProps: {}, // simple serializable object that will pass as props to the modal (可选)
  navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (可选)
  animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (可选, default 'slide-up')
});
```

关闭模态页面

```javascript
this.props.navigator.dismissModal({
  animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (可选, default 'slide-down')
});
```

切换标签页的显示和隐藏

```javascript
this.props.navigator.toggleTabs({
  to: 'hidden', // 必填参数, 'hidden' = hide tab bar, 'shown' = show tab bar
  animated: true // does the toggle have transition animation or does it happen immediately (optional)
});
```

显示数字气泡提示

```javascript
this.props.navigator.setTabBadge({
  tabIndex: 0, // (可选) 不填写时默认添加到当前标签页
  badge: 17 // 数字气泡提示, 设置为null会删除
});
```

切换导航栏的显示和隐藏

```javascript
this.props.navigator.toggleNavBar({
  to: 'hidden', // 必填参数, 'hidden' = hide tab bar, 'shown' = show tab bar
  animated: true // does the toggle have transition animation or does it happen immediately (optional)
});
```

注: 因为咱们的项目之前有一些导航栏是自己定制的, 如果希望页面打开时就隐藏, 可以这样写:

```javascript
export default class XXXPage extends Component {

    static navigatorStyle = {
        navBarHidden: true, // 隐藏默认的顶部导航栏
    };
```

3. 全局顶层跳转(一般用在首次启动App时)

整个App重新导航到单个页面

```javascript
Navigation.startSingleScreenApp({
    screen: {
        screen: 'user.LoginPage',
    },
    passProps: {}, // 被跳转页面的属性 (可选)
    portraitOnlyMode: true,// 只支持竖屏
});
```

打开新的标签页App(只支持底部标签页)

```javascript
Navigation.startTabBasedApp({
  tabs: [
    {
      label: '标签', // iOS图标下的标题 (optional)
      screen: 'example.FirstTabScreen', // unique ID registered with Navigation.registerScreen
      icon: require('../img/one.png'), // 标签未选中时的图片 (optional on iOS)
      selectedIcon: require('../img/one_selected.png'), // 标签选中时的图片 (optional, 仅支持iOS. Android使用 `tabBarSelectedButtonColor` 代替)
      title: 'Screen One', // 导航栏标题 (optional)
      navigatorStyle: {}, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
      navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
    },
    {
      label: 'Two',
      screen: 'example.SecondTabScreen',
      icon: require('../img/two.png'),
      selectedIcon: require('../img/two_selected.png'),
      title: 'Screen Two'
    }
  ],
  tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
    tabBarButtonColor: '#ffff00', // optional, change the color of the tab icons and text (also unselected)
    tabBarSelectedButtonColor: '#ff9900', // optional, change the color of the selected tab icon and text (only selected)
    tabBarBackgroundColor: '#551A8B' // optional, change the background color of the tab bar
  },
  appStyle: {
    orientation: 'portrait' // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
```

常见错误:

navigator.replace/push等报错, 因为现在项目的写法都是直接传入组件, 而replace方法要改成用reset, push等则需要传入页面ID.



# 全局遮罩组件的使用

这些组件将会显示在所有视图的顶部, 无法点击下面的组件, 直到使用代码将其清除, 比如我们用的载入中提示框底层就用到了它.

```javascript
let loading = SActivityIndicator.show(true, "载入中...");
SActivityIndicator.hide(loading);
```

显示:

```javascript
let sibling = new RootSiblings(<View
    style={{top: 0,right: 0,bottom: 0,left: 0,backgroundColor: 'red'}}/>);
```
更新组件:

```javascript
sibling.update(<View
    style={{top: 10,right: 10,bottom: 10,left: 10,backgroundColor: 'blue'}}
/>);
```

销毁并删除:

```javascript
sibling.destroy();
```



