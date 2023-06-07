import { FC, Dispatch, SetStateAction } from 'react';
import { Space } from 'antd';
import CheckedTags from '@/components/checkedTags';
import { BASIC_CATEGORY, BASIC_LABEL } from '@/constants';

interface ExtraContentProps {
  defaultLabels: string[];
  onLabelsChange: Dispatch<SetStateAction<string[]>>;
  defaultCategory: string[];
  onCategoryChange: Dispatch<SetStateAction<string[]>>;
}

const ExtraContent: FC<ExtraContentProps> = ({
  defaultLabels,
  onLabelsChange,
  defaultCategory,
  onCategoryChange,
}) => {
  return (
    <>
      <Space align="start">
        <label>分类：</label>
        <CheckedTags
          initTags={BASIC_CATEGORY}
          defaultChecked={defaultLabels}
          onCheckedChange={() => {}}
        />
      </Space>

      <Space align="start">
        <label>标签：</label>
        <CheckedTags
          initTags={BASIC_LABEL}
          defaultChecked={defaultCategory}
          onCheckedChange={() => {}}
        />
      </Space>
    </>
  );
};

export default ExtraContent;
