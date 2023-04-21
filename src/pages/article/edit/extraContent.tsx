import { FC } from 'react';
import { Space } from 'antd';
import CheckedTags from '@/components/checkedTags';

const ExtraContent: FC = ({}) => {
  return (
    <>
      <Space align="start">
        <label>分类：</label>
        <CheckedTags
          initTags={['1222', '122', 'aaa']}
          defaultChecked={[]}
          onCheckedChange={() => {}}
        />
      </Space>

      <Space align="start">
        <label>标签：</label>
        <CheckedTags
          initTags={['1222', '122', 'aaa']}
          defaultChecked={[]}
          onCheckedChange={() => {}}
        />
      </Space>
    </>
  );
};

export default ExtraContent;
