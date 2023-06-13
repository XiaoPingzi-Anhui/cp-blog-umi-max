import { useEffect } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import dayjs from 'dayjs';

/** 获取当前最新时间hook */
export default function useCurTime() {
  /* 按照年月日星期时分秒顺序的 */
  const [curTime, setCurTime] = useSafeState([2000, 1, 1, 1, 0, 0, 0]);
  /* 获取当前时间 */
  const getCurTime = useMemoizedFn(() => {
    const time = dayjs();
    setCurTime([
      time.year(),
      time.month() + 1,
      time.date(),
      time.day(),
      time.hour(),
      time.minute(),
      time.second(),
    ]);
  });

  /* 每隔1s更新下时间 */
  useEffect(() => {
    getCurTime();
    setInterval(() => getCurTime(), 1000);
  }, [getCurTime]);

  return curTime;
}
