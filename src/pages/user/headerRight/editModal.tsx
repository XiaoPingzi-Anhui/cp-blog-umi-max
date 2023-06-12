import { useState } from 'react';
import Cookies from 'js-cookie';
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormText,
  ProFormDigit,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Avatar, message } from 'antd';
import { verifyToken } from '@/utils/jwt';
import { Gender } from './index';
import { updateUserById } from '@/services/user';
import { ACCESS_TOKEN } from '@/constants';

export default function EditModal({
  editModalOpen,
  setEditModalOpen,
}: {
  editModalOpen: boolean;
  setEditModalOpen: (open: boolean) => void;
}) {
  const { initialState, setInitialState } = useModel('@@initialState');

  const { userInfo } = initialState as InitialState;
  const {
    email,
    authority,
    passwordHash,
    personalSignature,
    phoneNumber,
    sex,
    username,
    avatarUrl,
    _id,
  } = userInfo || {};

  const [curAvatarUrl, setCurAvatarUrl] = useState(avatarUrl);

  const { loading, run } = useRequest(updateUserById, {
    manual: true,
    onSuccess: async (data) => {
      if (data?.cookie) {
        message.success('修改成功！');
        Cookies.set(ACCESS_TOKEN, data.cookie);
        const tokenPayload = await verifyToken(data.cookie!);
        const userInfo = tokenPayload?.userInfo || {};
        setInitialState({ userInfo });
        setEditModalOpen(false);
      } else {
        message.error(String(data.error));
      }
    },
    onError: (e) => message.error(String(e)),
  });

  return (
    <ModalForm
      title="编辑用户信息"
      open={editModalOpen}
      onFinish={async (v) => {
        if (v.username && v.email) {
          /* @ts-ignore */
          run({ ...v, userId: _id, authority, passwordHash });
        } else {
          message.warning('用户名和邮箱不能为空！');
        }
      }}
      onOpenChange={setEditModalOpen}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          tooltip="最长为 20 位"
          initialValue={username}
          fieldProps={{
            maxLength: 20,
          }}
        />

        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          initialValue={email}
          rules={[
            {
              required: true,
              message: '请正确输入注册邮箱！',
              pattern:
                /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/,
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          width="md"
          name="phoneNumber"
          label="手机号"
          placeholder="请输入手机号"
          initialValue={phoneNumber}
          rules={[
            {
              required: true,
              message: '请正确输入手机号！',
              pattern: /^1\d{10}$/,
            },
          ]}
        />
        <ProFormDatePicker name="birthday" label="生日" />

        <ProFormRadio.Group
          label="性别"
          name="sex"
          initialValue={sex}
          options={[Gender.MALE, Gender.FEMALE]}
        />
      </ProForm.Group>

      <ProFormTextArea
        name="personalSignature"
        initialValue={personalSignature}
        placeholder="请输入个性签名"
        label="个性签名"
        tooltip="最长为 100 位"
        fieldProps={{
          showCount: true,
        }}
      />

      <ProFormTextArea
        name="avatarUrl"
        label="头像"
        placeholder="请输入头像地址"
        initialValue={avatarUrl}
        tooltip="最长为 200 位"
        fieldProps={{
          onChange: (e) => setCurAvatarUrl(e.target.value),
          showCount: true,
        }}
      />
      <label style={{ marginRight: '10px' }}>头像预览</label>
      <Avatar size="large" src={curAvatarUrl} alt="头像" />
    </ModalForm>
  );
}
