import { memo, useRef, forwardRef, useImperativeHandle } from 'react';
import { Input, InputRef } from 'antd';

import { CARDS } from './utils';

interface Props {
  sort: number;
  value: string;
  setCards: (v: React.SetStateAction<string[]>, ...args: any[]) => void;
  onComplete: (i: number, nextV?: string) => void;
}

interface ForwardObject {
  blur: () => void;
  focus: () => void;
}

export const isLegal = (v: string) =>
  CARDS.includes(v) || v === '' || v === '1';

const InputItem = forwardRef<ForwardObject, Props>(
  ({ sort, value, setCards, onComplete }, ref) => {
    const inputRef = useRef<InputRef>(null);

    useImperativeHandle(ref, () => ({
      blur: () => inputRef.current?.blur(),
      focus: () => inputRef.current?.focus(),
    }));

    return (
      <Input
        ref={inputRef}
        key={sort}
        value={value}
        size="large"
        style={{ width: 42 }}
        onChange={(e) => {
          const value = e.target.value?.toUpperCase();

          if (isLegal(value)) {
            setCards((preState) => {
              preState[sort] = value;
              return [...preState];
            });
            if (CARDS.includes(value)) onComplete(sort, '');
          } else {
            const spiltV = value.split('');
            if (isLegal(spiltV[0]))
              onComplete(sort, isLegal(spiltV[1]) ? spiltV[1] : '');
          }
        }}
        onBlur={() => {
          setTimeout(() => {
            setCards((preState) => {
              if (preState[sort] === '1') {
                preState[sort] = 'A';
                return [...preState];
              } else return preState;
            });
          }, 166);
        }}
      />
    );
  },
);

export default memo(InputItem);
