import { useState, useMemo } from 'react';
import { useModel, history } from '@umijs/max';
import { LoginFormPage } from '@ant-design/pro-components';
import { Tabs, message, Tooltip } from 'antd';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import { useMemoizedFn, useRequest } from 'ahooks';
import { LoginPageWrapper } from './styles';
import Action from './actions';
import useActivityConfig from './useActivityConfig';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { login, register } from '@/services/user';
import logoSvg from '@/assets/images/logo.svg';
import bgJpg from '@/assets/images/b3b10388de01440c8f11c4adcff61ec3.jpg';
import { HOME_LINK } from '@/constants/url';
import { Authority, ACCESS_TOKEN } from '@/constants';
import styles from './login.less';

enum TabType {
  LOGIN = 'login',
  REGISTER = 'register',
}

export default () => {
  const [tabType, setTabType] = useState<TabType>(TabType.LOGIN);
  const { refresh } = useModel('@@initialState');

  const activityConfig = useActivityConfig();

  const onTabChange = useMemoizedFn((activeKey) => setTabType(activeKey));

  const useRequestOption = useMemo(
    () => ({
      manual: true,
      onSuccess: (data: any) => {
        if (data.cookie) {
          Cookies.set(ACCESS_TOKEN, data.cookie);
        }
        refresh();
        history.push(HOME_LINK);
      },
      onError: (e: any) => {
        message.error(e?.response?.data?.message || e.toString());
      },
    }),
    [],
  );

  const { loading: loginLoading, run: startLogin } = useRequest(
    login,
    useRequestOption,
  );

  const { loading: registerLoading, run: startRegister } = useRequest(
    register,
    useRequestOption,
  );

  const onFinish = useMemoizedFn((values) => {
    const { email, password } = values;
    if (tabType === TabType.LOGIN) {
      startLogin({ email, password });
    } else {
      const { phoneNumber, username } = values;

      startRegister({
        email,
        password: bcrypt.hashSync(password, 10),
        phoneNumber,
        username,
        authority: Authority.TOURIST,
        personalSignature: '随便瞅瞅的路人甲',
        avatarUrl: '',
        sex: '',
      });
    }
    return Promise.resolve();
  });

  const submitter = useMemo(
    () => ({
      searchConfig: {
        submitText: tabType === TabType.LOGIN ? '登录' : '注册',
      },
      submitButtonProps: { loading: loginLoading || registerLoading },
    }),
    [tabType, loginLoading, registerLoading],
  );

  const tabBarExtraContent = useMemo(
    () => (
      <Tooltip
        title={'免注册登录，以游客身份浏览本站，没有发表博客等权限！'}
        color="#fff"
        overlayInnerStyle={{ color: '#141414' }}
      >
        <div
          className={styles['tourist-login-button']}
          onClick={() => {
            startLogin({
              email: process.env.TOURIST_EMAIL,
              password: process.env.TOURIST_PASSWORD,
            });
          }}
        >
          游客身份登录
        </div>
      </Tooltip>
    ),
    [],
  );

  return (
    <LoginPageWrapper>
      <LoginFormPage
        backgroundImageUrl={bgJpg}
        logo={logoSvg}
        title="菜狗搬砖"
        subTitle="一只前端菜狗的博客网站"
        activityConfig={activityConfig}
        actions={<Action />}
        onFinish={onFinish}
        submitter={submitter}
      >
        <Tabs
          centered
          activeKey={tabType}
          onChange={onTabChange}
          tabBarExtraContent={tabBarExtraContent}
        >
          <Tabs.TabPane key={TabType.LOGIN} tab={'账号密码登录'} />
          <Tabs.TabPane key={TabType.REGISTER} tab={'新用户注册'} />
        </Tabs>
        {tabType === TabType.LOGIN && <LoginForm />}
        {tabType === TabType.REGISTER && <RegisterForm />}
      </LoginFormPage>
    </LoginPageWrapper>
  );
};
