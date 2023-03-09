import { RunTimeLayoutConfig, history } from '@umijs/max';
import type { RequestConfig } from '@umijs/max';
import Cookies from 'js-cookie';
import logoSvg from '@/assets/images/logo.svg';
import { verifyToken } from '@/utils/jwt';
import { ACCESS_TOKEN } from '@/constants';

/* 全局初始化数据配置，用于 Layout 用户信息和权限初始化 */
export async function getInitialState(): Promise<InitialState> {
  let userInfo;
  try {
    const token = Cookies.get(ACCESS_TOKEN);
    const tokenPayload = await verifyToken(token!);
    userInfo = tokenPayload?.userInfo;
  } catch (error) {
    history.push('/');
  }
  return { name: '@umijs/max111', userInfo };
}

export const request: RequestConfig = {
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [],
  responseInterceptors: [],
};

/* 运行时配置 */

export const layout: RunTimeLayoutConfig = (initialData) => {
  console.log('initialData:', initialData);
  return {
    logo: logoSvg,
    title: '菜狗搬砖小站',
    /* menuHeaderRender: () => <div> menuHeader</div>,
    menuFooterRender: () => <div> menuFooter</div>,
    menuExtraRender: () => <div> menuExtra</div>, */
    layout: 'top',
    onPageChange: () => {}, // 可以在这里检验用户登录是否过期
    // fixedHeader: true,
  };
};
