// ElLoading 为elementplus的loading加载动画，不需要自行去除！！
import { ElLoading } from "element-plus";

// 登录类型枚举
enum LoginType {
  Apple = "apple",
  Google = "google",
  Facebook = "facebook",
}

// 全局 window 对象
const globalWindow: any = window;

// 封装登录函数
const loginWithSocialMedia = async (type: LoginType): Promise<any> => {
  // 显示 loading 动画
  const loading = ElLoading.service({ lock: true });
  try {
    // 根据不同的登录类型执行相应的登录逻辑
    switch (type) {
      case LoginType.Apple:
        return await loginWithApple();
      case LoginType.Google:
        return await loginWithGoogle();
      case LoginType.Facebook:
        return await loginWithFacebook();
      default:
        throw new Error("Unsupported login type");
    }
  } catch (error) {
    // 捕获错误并向外部抛出
    throw error;
  } finally {
    // 无论如何都关闭 loading 动画
    loading.close();
  }
};

// Apple 登录逻辑封装
const loginWithApple = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      globalWindow.AppleID.auth.init({
        clientId: "com.honghe.test",
        scope: "email",
        redirectURI: "https://b2537z8000.vicp.fun",
        state: "initial",
        usePopup: true,
      });
      globalWindow.AppleID.auth.signIn().then(resolve).catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

// Google 登录逻辑封装
/**
 * 
 * @returns 
 * 需要去这里https://console.developers.google.com/apis/credentials创建 应用凭据
 * 创建好应用凭据之后，可以去https://console.developers.google.com/apis/library把对应的API服务启
 * client_id
 */
const loginWithGoogle = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      globalWindow.google.accounts.id.initialize({
        client_id:
          "726537125667-bd9r88mokdifavb80pd6og4ai2ltis6h.apps.googleusercontent.com",
        scope: "email",
        callback: resolve,
      });
      globalWindow.google.accounts.id.prompt();
    } catch (error) {
      reject(error);
    }
  });
};

// Facebook 登录逻辑封装
const loginWithFacebook = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      globalWindow.FB.init({
        appId: "283948457571505",
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      globalWindow.FB.getLoginStatus((response: any) => {
        if (response.status !== "connected") {
          globalWindow.FB.login((res: any) => {
            resolve(res.authResponse);
          });
        } else {
          resolve(response.authResponse);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { loginWithSocialMedia, LoginType };
