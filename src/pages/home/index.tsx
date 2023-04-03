import { useState } from 'react';
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [a, setA] = useState(1);
  return (
    <PageContainer ghost>
      <div
        className={styles.container}
        onClick={() => {
          setA(a + 1);
        }}
      >
        {a}
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
