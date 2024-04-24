import { notification } from 'antd';
import { useMount, useKeyPress, useBoolean } from 'ahooks';
import { memo } from 'react';
import StarCanvas from './starCanvas';

const MouseStar = () => {
  const [showStar, { toggle }] = useBoolean(true);
  useKeyPress('alt.shift.m', toggle);
  const [api, contextHolder] = notification.useNotification();

  useMount(() => {
    api.info({
      message: `小提示`,
      description: (
        <>
          使用 <strong>Alt + Shift + M</strong>
          快捷键即可 <strong>开启/关闭</strong> 鼠标星星特效
        </>
      ),
      placement: 'bottomRight',
      duration: null,
    });
  });

  return (
    <>
      {contextHolder}
      {showStar ? <StarCanvas /> : null}
    </>
  );
};

export default memo(MouseStar);
