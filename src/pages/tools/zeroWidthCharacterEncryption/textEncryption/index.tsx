import { useEffect, useMemo, useState } from 'react';
import { Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-components';

import { encodeStr, decodeStr } from '../utils';
import FlexTextArea from './flexTextArea';

export default function TextEncryption() {
  const [showText, setShowText] = useState('');
  const [encryptText, setEncryptText] = useState('');
  const [cipherText, setCipherText] = useState('');

  const topResultText = useMemo(
    () => encodeStr(showText, encryptText),
    [showText, encryptText],
  );

  const { carrierText, hiddenText } = useMemo(
    () => decodeStr(cipherText),
    [cipherText],
  );

  useEffect(() => console.log('carrierText:', carrierText), [carrierText]);
  useEffect(() => console.log('hiddenText:', hiddenText), [hiddenText]);

  return (
    <PageContainer>
      <FlexTextArea
        isDoubleLeft
        dividerTip="encode"
        topPlaceholder="请输入载体文字"
        topValue={showText}
        setTopValue={setShowText}
        bottomPlaceholder="请输入隐藏文字"
        bottomValue={encryptText}
        setBottomValue={setEncryptText}
        singlePlaceholder="加密后文字"
        singleValue={topResultText}
      />
      <Divider />
      <FlexTextArea
        isDoubleLeft={false}
        dividerTip="decode"
        topPlaceholder="载体文字"
        topValue={carrierText}
        bottomPlaceholder="隐藏文字"
        bottomValue={hiddenText}
        singlePlaceholder="请输入加密后文字"
        singleValue={cipherText}
        setSingleValue={setCipherText}
      />
    </PageContainer>
  );
}
