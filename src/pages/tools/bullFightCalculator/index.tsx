import { FC, memo, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Divider } from 'antd';

import { getResults } from './utils';
import CardInput from './cardInput';

interface Props {}

const BullFightCalculator: FC<Props> = () => {
  const [cards, setCards] = useState(new Array(5).fill(''));
  const [results, setResults] = useState('');

  return (
    <PageContainer>
      <CardInput value={cards} onChange={setCards} /> ：{results}
      <Divider />
      <Button onClick={() => setResults(getResults(cards))}>计算牌型</Button>
    </PageContainer>
  );
};

export default memo(BullFightCalculator);
