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
      hideInBreadcrumb: true,
      routes: [
        {
          name: '文章列表',
          path: '/article/lists',
          component: './article/lists',
        },
        {
          name: '编辑文章',
          path: '/article/edit',
          component: './article/edit',
          access: 'canEdit',
          hideInBreadcrumb: true,
        },
        {
          name: '文章详情',
          path: '/article/detail/:id',
          component: './article/detail',
          hideInMenu: true,
          hideInBreadcrumb: true,
        },
      ],
    },
    {
      name: '工具',
      routes: [
        {
          name: '零宽字符加密',
          routes: [
            {
              name: '文本加密',
              path: '/tools/zeroWidthCharacterEncryption/textEncrypt',
              component: './tools/zeroWidthCharacterEncryption/textEncryption',
            },
            {
              name: '图片加密',
              path: '/tools/zeroWidthCharacterEncryption/imageEncrypt',
              component: './tools/zeroWidthCharacterEncryption/imageEncryption/encrypt',
            },
            {
              name: '图片解密',
              path: '/tools/zeroWidthCharacterEncryption/imageDecrypt',
              component: './tools/zeroWidthCharacterEncryption/imageEncryption/decrypt',
            },
          ],
        },
      ],
    },
  ],
  /* 应用里要读到环境变量得在这里也配一下 */
  define: {
    'process.env.JWT_SECRET': process.env.JWT_SECRET,
    'process.env.TOURIST_EMAIL': process.env.TOURIST_EMAIL,
    'process.env.TOURIST_PASSWORD': process.env.TOURIST_PASSWORD,
    'process.env.REQUEST_BASE_URL': process.env.REQUEST_BASE_URL,
  },
});
