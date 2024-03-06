import { useState } from 'react';
import { useMemoizedFn, useMount, useRafInterval } from 'ahooks';
import styled from 'styled-components';
import { load } from 'jinrishici';

export default function TodayPoetry() {
  const [poem, setPoem] = useState('');

  const getPoem = useMemoizedFn(() => {
    load(
      (res: {
        data: {
          content: string;
        };
      }) => setPoem(res.data.content),
    );
  });

  useRafInterval(() => {
    getPoem();
  }, 60000);

  useMount(() => getPoem());

  return <PoemWrapper>{poem.substring(0, poem.length - 1)}</PoemWrapper>;
}

export const PoemWrapper = styled.div`
  /* position: absolute;
  top: 50%; */
  width: 100%;
  font-size: 18px;
  line-height: 20px;
  transition: all 0.3s;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 600;
  text-align: center;
  background-image: -webkit-linear-gradient(right, #355c7d, #6c5b7b, #c06c84);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
