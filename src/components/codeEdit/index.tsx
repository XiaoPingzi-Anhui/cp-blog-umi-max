import { FC, memo } from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

const EDITOR_PROPS = { $blockScrolling: true };
const SET_OPTIONS = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
};

const CodeEdit: FC<IAceEditorProps> = (IAceEditorProps) => {
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      editorProps={EDITOR_PROPS}
      setOptions={SET_OPTIONS}
      {...IAceEditorProps}
    />
  );
};

export default memo(CodeEdit);
