import { FC, memo, useState, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { getToken, getAST } from './utils';
import { useMemoizedFn, useDebounceFn } from 'ahooks';

import S from './jsEngine.less';

import CodeEdit from '@/components/codeEdit';
import JsonView from '@/components/jsonView';
import { Button } from 'antd';

interface Props {}

const JsEngine: FC<Props> = ({}) => {
  const [code, setCode] = useState('');
  const [participleJson, setParticipleJson] = useState({});
  const [ast, setAST] = useState({});

  const { run: onChange } = useDebounceFn(setCode, { wait: 500 });

  const getResult = useMemoizedFn(() => {
    setParticipleJson({ ...getToken(code) });
    setAST(getAST(code));
  });

  return (
    <PageContainer>
      <strong>请输入 JS 代码试试：</strong>
      <br />
      <br />
      <CodeEdit
        onChange={onChange}
        width="100%"
        height="300px"
        className={S['js-code-edit']}
      />
      <Button onClick={getResult}>点击进行解析</Button>
      <br />
      <strong>词法分析结果：</strong>
      <br />
      <br />
      <JsonView data={participleJson} />
      <br />
      <br />
      <strong>语法分析结果（AST）：</strong>
      <br />
      <br />
      <JsonView data={ast} />
    </PageContainer>
  );
};

export default memo(JsEngine);
