import { useMemo } from 'react';
import { Button } from 'antd';

export default function useActivityConfig() {
  const activityConfig = useMemo(
    () => ({
      style: {
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
        color: '#fff',
        borderRadius: 8,
        backgroundColor: '#1677FF',
      },
      title: '全新升级的博客2.0',
      subTitle: <p>增加用户模块，大家可以来发表自己的博客</p>,
      action: (
        <Button
          size="large"
          style={{
            borderRadius: 20,
            background: '#fff',
            color: '#1677FF',
            width: 120,
          }}
        >
          查看旧版
        </Button>
      ),
    }),
    [],
  );
  return activityConfig;
}
