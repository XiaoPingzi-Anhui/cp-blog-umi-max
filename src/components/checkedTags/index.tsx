import { useEffect, useMemo, useRef, useState, FC } from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { InputRef, message, Input, Tag, theme } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { useMemoizedFn, useBoolean } from 'ahooks';

const { CheckableTag } = Tag;

const MyCheckableTag = styled(CheckableTag)`
  border-color: #ccc;
`;

export interface CheckedTagsProps {
  initTags?: string[];
  defaultChecked?: string[];
  single?: boolean;
  onCheckedChange?: (checkedTags: string[]) => void;
}

const CheckedTags: FC<CheckedTagsProps> = ({
  initTags = [],
  defaultChecked = [],
  single = false,
  onCheckedChange,
}) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState(initTags);
  const [checkedTags, setCheckedTags] = useState(defaultChecked);
  const [inputVisible, { setTrue, setFalse }] = useBoolean(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) inputRef.current?.focus();
  }, [inputVisible]);

  useEffect(() => {
    onCheckedChange?.(checkedTags);
  }, [onCheckedChange, checkedTags]);

  const handleCheck = useMemoizedFn((changeTag, checked) => {
    if (single) {
      setCheckedTags(checked ? [changeTag] : []);
    } else {
      if (checked) setCheckedTags([...checkedTags, changeTag]);
      else setCheckedTags(checkedTags.filter((tag) => tag !== changeTag));
    }
  });

  const handleInputChange = useMemoizedFn(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
  );

  const handleInputConfirm = useMemoizedFn(() => {
    if (inputValue) {
      if (!tags.includes(inputValue)) setTags([...tags, inputValue]);
      else message.error('tag 不能重复！');
    }
    setFalse();
    setInputValue('');
  });

  const tagPlusStyle = useMemo(
    () => ({
      background: token.colorBgContainer,
      borderStyle: 'dashed',
      height: '22px',
    }),
    [token.colorBgContainer],
  );

  return (
    <>
      <TweenOneGroup
        enter={{
          scale: 0.8,
          opacity: 0,
          type: 'from',
          duration: 100,
        }}
        onEnd={(e) => {
          if (e.type === 'appear' || e.type === 'enter') {
            (e.target as any).style = 'display: inline-block';
          }
        }}
        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
        appear={false}
      >
        {tags.map((tag: string) => (
          <span
            key={tag}
            style={{ display: 'inline-block', marginBottom: '10px' }}
          >
            <MyCheckableTag
              checked={checkedTags.includes(tag)}
              onChange={(checked) => handleCheck(tag, checked)}
            >
              {tag}
            </MyCheckableTag>
          </span>
        ))}
      </TweenOneGroup>

      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={setTrue} style={tagPlusStyle}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default CheckedTags;
