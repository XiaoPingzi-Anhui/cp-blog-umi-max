import { ProFormText } from '@ant-design/pro-components';
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import VerifyCodeForm from './verifyCodeForm';

export default function RegisterForm() {
  return (
    <>
      <ProFormText
        name="email"
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined />,
        }}
        placeholder={'邮箱'}
        rules={[
          {
            required: true,
            message: '请正确输入邮箱地址！',
            pattern:
              /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/,
          },
        ]}
      />
      <ProFormText
        name="phoneNumber"
        fieldProps={{
          size: 'large',
          prefix: <MobileOutlined />,
        }}
        placeholder={'手机号'}
        rules={[
          {
            required: true,
            message: '请正确输入手机号！',
            pattern: /^1\d{10}$/,
          },
        ]}
      />
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
        }}
        placeholder={'用户名'}
        rules={[
          {
            required: true,
            message: '用户名不能为空，且长度20以内',
            type: 'string',
            max: 20,
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder={'密码'}
        rules={[
          {
            required: true,
            message:
              '请正确输入密码！8到16位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
            pattern:
              /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{8,16}$/, // 8~16，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            min: 8,
            max: 16,
            type: 'string',
          },
        ]}
      />
      <ProFormText.Password
        name="confirmPassword"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder={'确认密码'}
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: '请与第一次输入的密码一致！',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value)
                return Promise.resolve();
              return Promise.reject(new Error('请与第一次输入的密码一致！'));
            },
          }),
        ]}
      />
      <VerifyCodeForm />
    </>
  );
}
