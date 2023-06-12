import { memo, useEffect, useState } from 'react';
import { useControllableValue, useMemoizedFn } from 'ahooks';
import MdEditor from 'react-markdown-editor-lite';
import ShowMarkDown from '@/components/markdown/showMarkDown';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}

const MarkDownEditor = ({ value, onChange }: Props) => {
  const [text, setText] = useControllableValue(
    { value, onChange },
    { defaultValue: '' },
  );
  const [state, setState] = useState('');

  const handleEditorChange = useMemoizedFn(
    ({ text }: { html: string; text: string }) => {
      setText(text);
      setState(text);
    },
  );

  return (
    <MdEditor
      value={text}
      style={{ height: '80vh' }}
      renderHTML={(text) => <ShowMarkDown markDownText={text} />}
      onChange={handleEditorChange}
    />
  );
};

export default memo(MarkDownEditor);
