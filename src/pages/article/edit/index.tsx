import { memo, useEffect, useState } from 'react';
import { useMemoizedFn, useRequest } from 'ahooks';
import { Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import EditContent from './editContent';
import ExtraContent from './extraContent';
import usePageActive from '@/utils/hooks/usePageActive';
import { ARTICLE_EDIT } from '@/constants/url';
import { editArticle } from '@/services/article';

const MarkDownEditor = () => {
  const [text, setText] = useState('');
  const pageVisible = usePageActive(ARTICLE_EDIT);

  const { loading, run } = useRequest(editArticle, {
    manual: true,
    onSuccess: (data) => {
      console.log('data:', data);
      /* refresh();
        history.push(HOME_LINK); */
    },
    onError: (e: any) => {
      message.error(e?.response?.data?.message || e.toString());
    },
  });

  const onTextChange = useMemoizedFn((t) => setText(t));

  const onReset = useMemoizedFn(() => {
    setText('');
  });

  const onSubmit = useMemoizedFn(() => {
    const params = {
      title: 'test',
      content: text,
      createdAt: new Date(),
      tags: 'tags',
      categories: 'categories',
    };
    run(params);
  });

  useEffect(() => console.log('text:', text), [text]);

  return (
    <PageContainer
      footer={
        pageVisible
          ? [
              <Button key="3" onClick={onReset}>
                重置
              </Button>,
              <Button key="2" type="primary" onClick={onSubmit}>
                提交
              </Button>,
            ]
          : undefined
      }
    >
      <EditContent value={text} onChange={onTextChange} />
      <ExtraContent
      /* initTags={['1222', '122', 'aaa']}
        defaultChecked={[]}
        onCheckedChange={() => {}} */
      />
    </PageContainer>
  );
};

export default memo(MarkDownEditor);
