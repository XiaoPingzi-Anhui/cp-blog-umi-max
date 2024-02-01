import { FC, memo, useRef } from 'react';
import styled from 'styled-components';
import { useControllableValue, useMemoizedFn, useLatest } from 'ahooks';

import InputItem, { isLegal } from './inputItem';

interface Props {
  inputNumber?: number;
  value?: string[];
  onChange?: (v: string[]) => void;
}

const CardInput: FC<Props> = ({ inputNumber = 5, ...restProps }) => {
  const [cards, setCards] = useControllableValue<string[]>(restProps, {
    defaultValue: new Array(inputNumber).fill(''),
  });

  const inputListsRef = useRef<HTMLDivElement>(null);
  const latestCards = useLatest(cards);

  const onComplete = useMemoizedFn((i, nextValue = '') => {
    /* @ts-ignore */
    inputListsRef.current?.children[i]?.blur();
    setTimeout(() => {
      const emptyIndex = latestCards.current.findIndex((card) => !card);
      if (isLegal(nextValue) && emptyIndex !== -1) {
        /* @ts-ignore */
        inputListsRef.current?.children[emptyIndex]?.focus();
        setCards((preState) => {
          preState[emptyIndex] = nextValue;
          return [...preState];
        });
      }
    }, 100);
  });

  return (
    <Space ref={inputListsRef}>
      {Array.from({ length: inputNumber }, (x, i) => i).map((i) => (
        <InputItem
          key={i}
          value={cards[i]}
          sort={i}
          setCards={setCards}
          onComplete={onComplete}
        />
      ))}
    </Space>
  );
};

export default memo(CardInput);

const Space = styled.div`
  display: inline-flex;
  gap: 8px;
`;
