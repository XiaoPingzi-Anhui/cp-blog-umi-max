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
  /*   plugins: [
    require.resolve('@alita/plugins/dist/keepalive'),
    require.resolve('@alita/plugins/dist/tabs-layout'),
  ], */
  // keepalive: [/./],
  // keepalive: ['/home'],
  /*   tabsLayout: {
    hasCustomTabs: false,
  }, */
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '登录',
      path: '/user/login',
      component: './user/login',
      layout: false,
    },
    {
      name: '首页',
      path: '/home',
      component: './home',
    },
    {
      name: '走丢了',
      path: '*',
      hideInMenu: true,
      component: './404.tsx',
    },
    {
      name: '文章',
      path: '/article',
      routes: [
        {
          name: '编辑文章',
          path: '/article/edit',
          component: './article/edit',
        },
        {
          name: '文章详情',
          path: '/article/detail/:id',
          component: './article/detail',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '权限演示',
      path: '/access',
      // access: 'canSeeAdmin1',
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
    'process.env.MONGODB_URL': process.env.MONGODB_URL,
  },
});
