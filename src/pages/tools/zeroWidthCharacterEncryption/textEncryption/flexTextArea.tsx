import { FC, Dispatch, SetStateAction, useMemo } from 'react';
import { Space, Input, Divider } from 'antd';

const { TextArea } = Input;
const TEXT_AREA_WIDTH = '30vw';
const AUTO_SIZE = { minRows: 4 };

interface FlexTextAreaProps {
  dividerTip: string;
  isDoubleLeft: boolean;
  topPlaceholder: string;
  topValue: string;
  setTopValue?: Dispatch<SetStateAction<string>>;
  bottomPlaceholder: string;
  bottomValue: string;
  setBottomValue?: Dispatch<SetStateAction<string>>;
  singlePlaceholder: string;
  singleValue: string;
  setSingleValue?: Dispatch<SetStateAction<string>>;
}

const FlexTextArea: FC<FlexTextAreaProps> = ({
  dividerTip,
  isDoubleLeft,
  topPlaceholder,
  topValue,
  setTopValue,
  bottomPlaceholder,
  bottomValue,
  setBottomValue,
  singlePlaceholder,
  singleValue,
  setSingleValue,
}) => {
  const doubleTextArea = useMemo(
    () => (
      <div style={{ width: TEXT_AREA_WIDTH }}>
        <TextArea
          size="large"
          autoSize={AUTO_SIZE}
          placeholder={topPlaceholder}
          style={{ marginBottom: 30, width: '100%' }}
          value={topValue}
          onChange={(e) => setTopValue?.(e.target.value)}
        />
        <TextArea
          size="large"
          autoSize={AUTO_SIZE}
          style={{ width: '100%' }}
          placeholder={bottomPlaceholder}
          value={bottomValue}
          onChange={(e) => setBottomValue?.(e.target.value)}
        />
      </div>
    ),
    [
      topValue,
      setTopValue,
      topPlaceholder,
      bottomPlaceholder,
      bottomValue,
      setBottomValue,
    ],
  );

  const singleTextArea = useMemo(
    () => (
      <TextArea
        size="large"
        style={{ width: TEXT_AREA_WIDTH }}
        autoSize={AUTO_SIZE}
        placeholder={singlePlaceholder}
        value={singleValue}
        onChange={(e) => setSingleValue?.(e.target.value)}
      />
    ),
    [singlePlaceholder, singleValue, setSingleValue],
  );

  return (
    <Space
      split={
        <div style={{ width: '10vw', textAlign: 'center' }}>
          <Divider />
          {dividerTip}
          <Divider />
        </div>
      }
    >
      {isDoubleLeft ? doubleTextArea : singleTextArea}
      {isDoubleLeft ? singleTextArea : doubleTextArea}
    </Space>
  );
};

export default FlexTextArea;
