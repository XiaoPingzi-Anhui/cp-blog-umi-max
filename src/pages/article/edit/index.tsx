import { memo, useEffect, useState } from 'react';
import { useLocation, useModel } from '@umijs/max';
import { useMemoizedFn, useRequest } from 'ahooks';
import { Button, message, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import shortid from 'shortid';

import EditContent from './editContent';
import ExtraContent from './extraContent';
import usePageActive from '@/utils/hooks/usePageActive';
import { ARTICLE_EDIT } from '@/constants/url';
import { addNewArticle, updateArticleById } from '@/services/article';

const MarkDownEditor = () => {
  const { state } = useLocation();
  const { initialState } = useModel('@@initialState');
  const modal = useModel('article.model');

  console.log('modal:', modal);

  const pageVisible = usePageActive(ARTICLE_EDIT);

  const {
    authorId,
    authorName,
    category,
    content,
    labels,
    title,
    readCount,
    _id,
  } = (state as API.ArticleInfo) || {};
  useEffect(() => console.log('state:', state), [state]);

  const [text, setText] = useState(content || '');
  const [articleTitle, setArticleTitle] = useState(title || '');
  const [curLabels, setCurLabels] = useState(labels?.split(',') || []);
  const [curCategory, setCurCategory] = useState(category?.split(',') || []);
  const [extraContentKey, setExtraContentKey] = useState(shortid.generate());

  const { loading, run } = useRequest(
    state ? updateArticleById : addNewArticle,
    {
      manual: true,
      onSuccess: (data) => {
        console.log('data:', data);
        /* refresh();
        history.push(HOME_LINK); */
      },
      onError: (e: any) => {
        message.error(e?.response?.data?.message || e.toString());
      },
    },
  );

  const onTextChange = useMemoizedFn((t) => setText(t));

  const onReset = useMemoizedFn(() => {
    setText(content || '');
    setArticleTitle(title || '');
    setCurLabels(labels?.split(',') || []);
    setCurCategory(category?.split(',') || []);
    setExtraContentKey(shortid.generate());
  });

  const onSubmit = useMemoizedFn(() => {
    const params = {
      authorName: authorName ?? initialState?.userInfo?.username,
      authorId: authorId ?? initialState?.userInfo?._id,
      title: articleTitle,
      content: text,
      labels: curLabels.join(','),
      category: curCategory.join(','),
      readCount,
      articleId: _id,
    };
    run(params);
  });

  useEffect(() => console.log('text:', text), [text]);

  return (
    <PageContainer
      header={{
        title: (
          <Input
            placeholder="请输入文章标题"
            style={{ width: '370px' }}
            value={articleTitle}
            showCount
            maxLength={20}
            onChange={(e) => setArticleTitle(e?.target?.value || '')}
          />
        ),
      }}
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
        key={extraContentKey}
        defaultLabels={curLabels}
        onLabelsChange={setCurLabels}
        defaultCategory={curCategory}
        onCategoryChange={setCurCategory}
      />
    </PageContainer>
  );
};

export default memo(MarkDownEditor);
