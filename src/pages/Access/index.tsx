import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  const [userName, setUserName] = useState('初始化');
  async function submit() {
    try {
      const res = await fetch('/api/users/1', {
        method: 'get',
        /* body: JSON.stringify({
          email: '1915375353@qq.com',
          authority: '站长',
          password: 'bcrypt.hashSync(password, 8)',
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
      <Access accessible={access.canSeeAdmin}>
        <Button onClick={submit}>只有 Admin 可以看到这个按钮</Button>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
