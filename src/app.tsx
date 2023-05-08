import { RunTimeLayoutConfig, history } from '@umijs/max';
import type { RequestConfig } from '@umijs/max';
import Cookies from 'js-cookie';
import { message } from 'antd';
import logoSvg from '@/assets/images/logo.svg';
import { verifyToken } from '@/utils/jwt';
import { ACCESS_TOKEN } from '@/constants';
import { LOGIN_LINK } from '@/constants/url';

/* 全局初始化数据配置，用于 Layout 用户信息和权限初始化 */
export async function getInitialState(): Promise<InitialState> {
  let userInfo;
  try {
    const token = Cookies.get(ACCESS_TOKEN);
    const tokenPayload = await verifyToken(token!);
    userInfo = tokenPayload?.userInfo;
    console.log('userInfo:', userInfo);
  } catch (error) {
    history.push(LOGIN_LINK);
  }
  return { name: userInfo?.username || '', userInfo };
}

const authHeaderInterceptor = (url: string, options: RequestConfig) => {
  const authHeader = { Authorization: `${Cookies.get(ACCESS_TOKEN)}` };
  return {
    url: `${url}`,
    options: { ...options, headers: authHeader },
  };
};

export const request: RequestConfig = {
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  // withCredentials: true,
  requestInterceptors: [authHeaderInterceptor],
  //@ts-ignore
  // responseInterceptors: [demoResponseInterceptors],
};

/* 运行时配置 */

export const layout: RunTimeLayoutConfig = (initialData) => {
  return {
    logo: logoSvg,
    title: '菜狗搬砖小站',
    // rightContentRender: () => <div> rightContentRender</div>,
    onPageChange: async () => {
      try {
        await verifyToken(Cookies.get(ACCESS_TOKEN)!);
      } catch (error) {
        message.info('登录信息过期，请重新登陆！');
        history.push(LOGIN_LINK);
      }
    },
    logout: () => {
      Cookies.remove(ACCESS_TOKEN);
      history.push(LOGIN_LINK);
    },
    fixSiderbar: true,
    navTheme: 'light',
    layout: 'mix',
    contentWidth: 'Fluid',
    colorPrimary: '#1677FF',
    fixedHeader: false,
    splitMenus: false,
  };
};
