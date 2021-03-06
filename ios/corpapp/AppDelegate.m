/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif
#import <CodePush.h>


#import <AlicloudHttpDNS/AlicloudHttpDNS.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Bugly/Bugly.h>
// **********************************************
// *** 重要, 本行必须添加以使用 React Native Navigation ***
// **********************************************
#import "RCCManager.h"

// IMPORTANT: if you're getting an Xcode error that RCCManager.h isn't found, you've probably ran "npm install"
// with npm ver 2. You'll need to "npm install" with npm 3 (see https://github.com/wix/react-native-navigation/issues/1)

#import "UMMobClick/MobClick.h"

@implementation AppDelegate

static BOOL isProduction = true;  //填写isProdurion  平时测试时为false ，生产时填写 true

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
   /** 友盟统计 */
  UMConfigInstance.appKey = @"5992c88aa40fa3403a000218";
  
  //  UMConfigInstance.eSType=E_UM_GAME;//友盟游戏统计，如不设置默认为应用统计
  NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
  [MobClick setAppVersion:version];
  [MobClick startWithConfigure:UMConfigInstance];
  [MobClick setLogEnabled:YES];
  /** 极光推送 */
  
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
    JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
    entity.types = UNAuthorizationOptionAlert|UNAuthorizationOptionBadge|UNAuthorizationOptionSound;
    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
    
#endif
  } else if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    [JPUSHService registerForRemoteNotificationTypes:(UIUserNotificationTypeBadge |
                                                      UIUserNotificationTypeSound |
                                                      UIUserNotificationTypeAlert)
                                          categories:nil];
  } else {
    [JPUSHService registerForRemoteNotificationTypes:(UIRemoteNotificationTypeBadge |
                                                      UIRemoteNotificationTypeSound |
                                                      UIRemoteNotificationTypeAlert)
                                          categories:nil];
  }
  
  [JPUSHService setupWithOption:launchOptions appKey:@"e8f5ec679b9976aa36858ebb"
                        channel:nil apsForProduction:isProduction];
  
  
  /*
   NSURL *jsCodeLocation;
   
   jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
   */
  NSURL *jsCodeLocation;

#ifdef DEBUG
 jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  //jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];

#else
  jsCodeLocation = [CodePush bundleURL];
#endif
  
//  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  // **********************************************
  // *** DON'T MISS: 启动App的方式发生了改变! *****
  // **********************************************
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
   [Bugly startWithAppId:@"c572d6596a"];
  /*
   // 旧的 RN 启动方式 - remove this part
   RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
   moduleName:@"example"
   initialProperties:nil
   launchOptions:launchOptions];
   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
   UIViewController *rootViewController = [UIViewController new];
   rootViewController.view = rootView;
   self.window.rootViewController = rootViewController;
   [self.window makeKeyAndVisible];
   */
  
  
  
  /** httpdns */
  // 初始化HTTPDNS
  // 设置AccoutID
  HttpDnsService *httpdns = [[HttpDnsService alloc] initWithAccountID:116532];
  //鉴权方式初始化
  //HttpDnsService *httpdns = [[HttpDnsService alloc] initWithAccountID:0000 secretKey:@"XXXX"];
  
  // 为HTTPDNS服务设置降级机制
  //  [httpdns setDelegateForDegradationFilter:self];
  // 允许返回过期的IP
  [httpdns setExpiredIPEnabled:YES];
  // 打开HTTPDNS Log，线上建议关闭
  [httpdns setLogEnabled:YES];
  /*
   *  设置HTTPDNS域名解析请求类型(HTTP/HTTPS)，若不调用该接口，默认为HTTP请求；
   *  SDK内部HTTP请求基于CFNetwork实现，不受ATS限制。
   */
  [httpdns setHTTPSRequestEnabled:YES];
  // edited  @"x-crm.i-counting.cn" @"app.i-counting.cn",
  NSArray *preResolveHosts = @[@"app.i-counting.cn",@"x-crm.i-counting.cn"];
  // NSArray* preResolveHosts = @[@"pic1cdn.igetget.com"];
  // 设置预解析域名列表
  [httpdns setPreResolveHosts:preResolveHosts];
  
  return YES;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  NSLog(@"myDeviceToken %@", deviceToken);
  [JPUSHService registerDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler {
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  NSDictionary * userInfo = notification.request.content.userInfo;
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  }
  completionHandler(UNNotificationPresentationOptionAlert);
}
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFOpenNotification object:userInfo];
  }
  completionHandler();
}
@end
