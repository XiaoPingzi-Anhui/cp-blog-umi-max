import { FC, memo, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Divider, Space } from 'antd';

import { getResults, CARDS, getUniqueRandoms, ALL_CARDS } from './utils';
import CardInput from './cardInput';
import { useMemoizedFn } from 'ahooks';

interface Props {}

const DEFAULT_CARDS = new Array<string>(5).fill('');

const BullFightCalculator: FC<Props> = () => {
  const [cards, setCards] = useState([...DEFAULT_CARDS]);
  const [results, setResults] = useState('');

  useEffect(() => {
    if (cards.every((card) => CARDS.includes(card)))
      setResults(getResults(cards));
    else setResults('');
  }, [cards]);

  const getNewCards = useMemoizedFn(() => {
    const cardIndex = getUniqueRandoms(5, 0, ALL_CARDS.length - 1);
    const newCards = cardIndex.map((i) => ALL_CARDS[i]);
    setCards(newCards);
  });

  return (
    <PageContainer>
      <CardInput value={cards} onChange={setCards} /> ：{results}
      <Divider />
      <Space>
        <Button onClick={() => setCards([...DEFAULT_CARDS])}>清空</Button>
        <Button onClick={getNewCards}>发牌</Button>
      </Space>
    </PageContainer>
  );
};

export default memo(BullFightCalculator);
