import { Image, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import useVerifyCode from '@/utils/hooks/useVerifyCode';
import styles from './login.less';

export default function VerifyCodeForm() {
  const { code, dataURL, updateCode } = useVerifyCode();

  return (
    <Space align="baseline">
      <ProFormText
        name="verifyCode"
        fieldProps={{
          size: 'large',
        }}
        placeholder={'验证码'}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('verifyCode').toLowerCase() === code)
                return Promise.resolve();
              return Promise.reject(new Error('验证码错误！'));
            },
          }),
        ]}
      />
      <Image src={dataURL} width={90} height={30} />
      <ReloadOutlined
        onClick={updateCode}
        className={styles['refresh-verify-code-icon']}
      />
    </Space>
  );
}
