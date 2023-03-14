import { defineConfig } from '@umijs/max';

export default defineConfig({
  npmClient: 'pnpm',
  apiRoute: {
    platform: 'vercel',
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  styledComponents: {},
  layout: {
    title: '菜狗搬砖小站',
  },
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      name: '登录',
      path: '/login',
      component: './login',
      layout: false,
    },
    {
      name: '首页',
      path: '/home',
      component: './home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例1',
      path: '/table',
      component: './Table',
    },
  ],
  /* 应用里要读到环境变量得在这里也配一下 */
  define: {
    'process.env.JWT_SECRET': process.env.JWT_SECRET,
    'process.env.TOURIST_EMAIL': process.env.TOURIST_EMAIL,
    'process.env.TOURIST_PASSWORD': process.env.TOURIST_PASSWORD,
  },
});
