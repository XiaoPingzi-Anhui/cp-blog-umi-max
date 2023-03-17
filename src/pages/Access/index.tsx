import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Access, useAccess } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  const [userName, setUserName] = useState('初始化');
  const [a, seta] = useState(0);
  async function submit() {
    try {
      const res = await fetch('/api/login', {
        method: 'post',
        body: JSON.stringify({
          email: '1915375353@qq.com',
          password: 'Chenping@824925',
        }),
        /* body: JSON.stringify({
          email: '1915375353@qq.com',
          authority: '站长',
          password: bcrypt.hashSync('Chenping@824925', 10),
          username: '菜狗站长',
          sex: '男',
          phoneNumber: '1915375353',
          avatarUrl: '',
        }), */
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resData = await res.json();
      console.log('resData:', resData);
      setUserName(resData.username ?? '修改了');
      // const data = await res.json();

      /* if (res.status !== 200) {
        console.error(await res.text());
        return;
      }
      const data = await res.json();
      alert(`欢迎回来，${data.name}`);
      history.push("/posts/create"); */
    } catch (err) {
      console.error(err);
      /*  setUserName('chucuola'); */
    }
  }
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      {userName}
      {/* <Access accessible={access.canSeeAdmin}> */}
      <Button onClick={submit}>只有 Admin 可以看到这个按钮</Button>
      <Button
        onClick={() => {
          seta((pre) => pre + 1);
        }}
      >
        {a}{' '}
      </Button>
      {/* </Access> */}
    </PageContainer>
  );
};

export default AccessPage;
