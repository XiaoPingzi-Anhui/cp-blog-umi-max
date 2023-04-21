import { memo } from 'react';
import { useControllableValue, useMemoizedFn } from 'ahooks';
import MdEditor from 'react-markdown-editor-lite';
import ShowMarkDown from '@/components/markdown/showMarkDown';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}

const EditorContent = ({ value, onChange }: Props) => {
  const [text, setText] = useControllableValue(
    { value, onChange },
    { defaultValue: '' },
  );

  const handleEditorChange = useMemoizedFn(
    ({ text }: { html: string; text: string }) => setText(text),
  );

  return (
    <MdEditor
      value={text}
      style={{ height: '50vh' }}
      renderHTML={(text) => <ShowMarkDown markDownText={text} />}
      onChange={handleEditorChange}
    />
  );
};

export default memo(EditorContent);
