import { FC, memo } from 'react';
import { Input, Space } from 'antd';
import { useControllableValue } from 'ahooks';

import { CARDS } from './utils';

interface Props {
  inputNumber?: number;
  value?: string[];
  onChange?: (v: string[]) => void;
}

const CardInput: FC<Props> = ({ inputNumber = 5, ...restProps }) => {
  const [cards, setCards] = useControllableValue<string[]>(restProps, {
    defaultValue: new Array(inputNumber).fill(''),
  });

  return (
    <Space>
      {Array.from({ length: inputNumber }, (x, i) => i).map((i) => (
        <Input
          key={i}
          value={cards[i]}
          size="large"
          style={{ width: 42 }}
          onChange={(e) => {
            const value = e.target.value?.toUpperCase();
            if (CARDS.includes(value) || value === '1' || value === '') {
              setCards((preState) => {
                preState[i] = value;
                return [...preState];
              });
            }
          }}
          onBlur={() => {
            if (cards[i] === '1') {
              setCards((preState) => {
                preState[i] = 'A';
                return [...preState];
              });
            }
          }}
        />
      ))}
    </Space>
  );
};

export default memo(CardInput);
