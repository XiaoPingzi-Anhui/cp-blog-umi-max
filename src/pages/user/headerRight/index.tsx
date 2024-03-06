import { useState } from 'react';
import { useModel, history, styled } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { Avatar, Popover, Divider } from 'antd';
import { LogoutOutlined, FormOutlined } from '@ant-design/icons';
import { ACCESS_TOKEN } from '@/constants';
import { LOGIN_LINK } from '@/constants/url';
import EditModal from './editModal';
import usernameSvg from '@/assets/images/username.svg';
import maleSvg from '@/assets/images/male.svg';
import femaleSvg from '@/assets/images/female.svg';
import phoneSvg from '@/assets/images/phone.svg';
import emailSvg from '@/assets/images/email.svg';
import signatureSvg from '@/assets/images/signature.svg';
import birthDaySvg from '@/assets/images/birthday.svg';
import './headerRight.less';
import shortid from 'shortid';
import TodayPoetry from '@/components/todayPoetry';

export enum Gender {
  MALE = '男',
  FEMALE = '女',
}

export default function HeaderRight() {
  const [open, setOpen] = useState(false);
  const { initialState } = useModel('@@initialState');
  const [modalKey, setModalKey] = useState(shortid.generate());

  const { userInfo } = initialState as InitialState;
  const {
    authority,
    email,
    personalSignature,
    phoneNumber,
    sex,
    username,
    avatarUrl,
    birthday,
  } = userInfo || {};

  const getPopupContainer = useMemoizedFn(
    () => document.getElementById('ant-pro-global-header') || document.body,
  );

  const getPopoverContent = useMemoizedFn(() => (
    <div className="popover-content-wrapper">
      <li className="row-li">
        <img className="label-img" alt={''} src={usernameSvg} height={14} />
        <span style={{ marginRight: '4px' }}>{username}</span>
        {sex === Gender.MALE && <img alt={''} src={maleSvg} height={12} />}
        {sex === Gender.FEMALE && <img alt={''} src={femaleSvg} height={12} />}
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
      {birthday && (
        <li className="row-li">
          <img className="label-img" alt={''} src={birthDaySvg} height={14} />
          {dayjs(birthday).format('YYYY-MM-DD')}
        </li>
      )}
      <Divider />
      <div className="popover-bottom-action">
        <div
          className="action-item-wrapper"
          onClick={() => {
            Cookies.remove(ACCESS_TOKEN);
            history.push(LOGIN_LINK);
          }}
        >
          <LogoutOutlined />
        </div>
        {authority !== '游客' && (
          <>
            <Divider type="vertical" />
            <div
              className="action-item-wrapper"
              onClick={() => {
                setModalKey(shortid.generate());
                setOpen(true);
              }}
            >
              <FormOutlined />
            </div>
          </>
        )}
      </div>
    </div>
  ));

  return (
    <Container>
      <TodayPoetry />
      <div>
        <Popover
          // trigger={['click']}
          content={getPopoverContent}
          placement="bottomRight"
          getPopupContainer={getPopupContainer}
        >
          <Avatar size="large" src={avatarUrl} alt="头像" />
        </Popover>
        <EditModal
          key={modalKey}
          editModalOpen={open}
          setEditModalOpen={setOpen}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: calc(100vw - 166px - 32px);
  display: inline-flex;
  align-items: center;
`;
