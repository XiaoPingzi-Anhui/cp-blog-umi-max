import { FC, useEffect, useRef, useMemo } from 'react';
import { useSafeState } from 'ahooks';
import dayjs from 'dayjs';
import { range } from 'lodash';
import styled from 'styled-components';
import useCurTime from './useCurTime';

/** 达到这个大小，才会显示每个月 */
const showMonthLabelSize = 600;

type Props = {
  size: number;
  backgroundColor?: string;
  highlightColor?: string;
  darkColor?: string;
};
const RomanClock: FC<Props> = ({
  size,
  backgroundColor = 'black',
  highlightColor = '#fff',
  darkColor = '#4d4d4d',
}) => {
  const [textLists, setTextLists] = useSafeState<string[][]>([]);
  const clockRef = useRef<HTMLDivElement>(null);

  const curTime = useCurTime();

  const hasTotalMonth = useMemo(() => size >= showMonthLabelSize, [size]);

  useEffect(() => {
    const curDayNum = dayjs(dayjs().format('YYYYMM')).daysInMonth(); // 当前月份有多少天
    const monthText = range(1, 13).map((item) => `${item}`);
    const dayText = range(1, curDayNum + 1).map(
      (item) => `${item}${hasTotalMonth ? '日' : ''}`,
    );
    const weekText = range(1, 8).map((item) => `星期${item}`);
    const hourText = range(24).map((item) => `${item}点`);
    const minuteText = range(60).map((item) => `${item}分`);
    const secondsText = range(60).map((item) => `${item}秒`);
    setTextLists([
      monthText,
      dayText,
      weekText,
      hourText,
      minuteText,
      secondsText,
    ]);
  }, [setTextLists, hasTotalMonth]);

  const timeDom = useMemo(() => {
    const widthMid = size / 2;
    const heightMid = size / 2;
    return [
      <div
        className="label"
        style={{
          color: highlightColor,
          transform: `rotate(-90deg)`,
          left: `${widthMid}px`,
          top: `${heightMid + 21}px`,
          position: 'absolute',
          fontWeight: 600,
        }}
        key="year"
      >
        {curTime[0]}年
      </div>,
      ...textLists.map((textItem, i) =>
        textItem.map((item, j) => {
          // 加算出每一个元素的位置  x y 坐标
          // 每一个圆的半径与时分秒的位置有关
          const r =
            (heightMid / 6) * i +
            (i === 0 ? 0.05 * size : i === 1 ? 0.02 * size : 0);
          // 计算每一个平均的角度  再将每一个单位对齐 然后转化成弧度
          const deg =
            (360 / textLists[i].length) *
            (j - curTime[i + 1] + (i < 3 ? 1 : 0));
          // 计算出每一个dom元素的坐标
          const x = r * Math.sin((deg * Math.PI) / 180) + widthMid;
          const y = heightMid - r * Math.cos((deg * Math.PI) / 180);
          const active =
            item.replace(/[^0-9]/gi, '') === String(curTime[i + 1]);
          return (i === 0 || (i === 1 && !hasTotalMonth)) &&
            deg !== 0 ? null : (
            <div
              className="label"
              style={{
                color: active ? highlightColor : darkColor,
                fontWeight: active ? 600 : 400,
                transform: `rotate(${deg - 90}deg)`,
                left: `${x}px`,
                top: `${y}px`,
                position: 'absolute',
              }}
              key={`${i}${j}`}
            >
              {`${item}${
                i === 0 ? '月' : i === 1 && !hasTotalMonth ? '日' : ''
              }`}
            </div>
          );
        }),
      ),
    ];
  }, [textLists, curTime, size, darkColor, highlightColor, hasTotalMonth]);

  return (
    <ClockWrapper backgroundColor={backgroundColor} size={size} ref={clockRef}>
      {timeDom}
    </ClockWrapper>
  );
};

export default RomanClock;

const ClockWrapper = styled.div<{ backgroundColor: string; size: number }>`
  position: relative;
  margin: auto;
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  transform: rotate(90deg);
  .label {
    display: inline-block;
    color: #4d4d4d;
    text-align: center;
    padding: 0 2px;
    font-size: 12px;
    transform: scale(0.8);
    transition: left 1s, top 1s;
    transform-origin: 0 0;
  }
`;
