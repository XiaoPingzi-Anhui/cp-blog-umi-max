import { useRef, useMemo } from 'react';
import { styled } from '@umijs/max';
import { min } from 'lodash';
import { useSize } from 'ahooks';
import RomanClock from './clock/romanClock';

export default function Home() {
  const wrapperRef = useRef(null);
  const { height, width } = useSize(wrapperRef) || { height: 0, width: 0 };

  const size = useMemo(() => {
    const minSize = min([height, width]) ?? 0;
    return minSize < 800 ? 800 : minSize;
  }, [height, width]);

  return (
    <HomeWrapper ref={wrapperRef}>
      <RomanClock
        size={size}
        backgroundColor="transparent"
        highlightColor="#000"
      />
    </HomeWrapper>
  );
}

// const TopBackground = styled.div`
//   background: url(https://picsum.photos/1920/1280) center/cover;
//   height: calc(100vh - 56px);
// `;

const HomeWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 56px - 48px);
`;
