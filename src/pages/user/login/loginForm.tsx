import { ProFormText } from '@ant-design/pro-components';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import VerifyCodeForm from './verifyCodeForm';

export default function LoginForm() {
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
            message: '请正确输入注册邮箱！',
            pattern:
              /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/,
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
      <VerifyCodeForm />
    </>
  );
}
