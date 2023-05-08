import { useState } from 'react';
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useRequest } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { getAllUsers } from '@/services/user';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [a, setA] = useState(1);
  const { loading, run } = useRequest(getAllUsers, { manual: true });

  return (
    <PageContainer ghost>
      <div
        className={styles.container}
        onClick={() => {
          setA(a + 1);
          run();
        }}
      >
        {a}
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
