import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { Avatar, Popover } from 'antd';
import usernameSvg from '@/assets/images/username.svg';
import maleSvg from '@/assets/images/male.svg';
import femaleSvg from '@/assets/images/female.svg';
import phoneSvg from '@/assets/images/phone.svg';
import emailSvg from '@/assets/images/email.svg';
import signatureSvg from '@/assets/images/signature.svg';
import './headerRight.less';

export enum Gender {
  MALE = '男',
  FEMALE = '女',
}

export default function HeaderRight() {
  const { initialState, refresh, setInitialState } = useModel('@@initialState');

  const { userInfo } = initialState as InitialState;
  const { authority, email, personalSignature, phoneNumber, sex, username } =
    userInfo || {};

  useEffect(() => console.log('userInfo:', userInfo), [userInfo]);

  const getPopupContainer = useMemoizedFn(
    () => document.getElementById('ant-pro-global-header') || document.body,
  );

  const getPopoverContent = useMemoizedFn(() => (
    <div className="popover-content-wrapper">
      <li className="row-li">
        <img className="label-img" alt={''} src={usernameSvg} height={14} />
        {username}
        {sex === Gender.MALE && <img alt={''} src={maleSvg} height={14} />}
        {sex === Gender.FEMALE && <img alt={''} src={femaleSvg} height={14} />}
      </li>
      <li className="row-li">
        <img className="label-img" alt={''} src={signatureSvg} height={14} />
        {personalSignature}
      </li>
      <li className="row-li">
        <img className="label-img" alt={''} src={emailSvg} height={14} />
        {email}
      </li>
      <li className="row-li">
        <img className="label-img" alt={''} src={phoneSvg} height={14} />
        {phoneNumber}
      </li>
    </div>
  ));

  return (
    <Popover
      trigger={['click']}
      content={getPopoverContent}
      placement="bottomRight"
      getPopupContainer={getPopupContainer}
    >
      <Avatar
        size="large"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.qZcSZztHMSt31jccDRVu8wHaFu?w=218&h=180&c=7&r=0&o=5&pid=1.7"
      />
    </Popover>
  );
}
