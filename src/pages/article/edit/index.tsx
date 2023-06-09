import { memo, useEffect, useState, useMemo } from 'react';
import { useLocation, useModel, history } from '@umijs/max';
import { useMemoizedFn, useRequest } from 'ahooks';
import { Button, message, Input, Switch } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import shortid from 'shortid';
import CheckedTags from '@/components/checkedTags';
import { BASIC_CATEGORY, BASIC_LABEL } from '@/constants';

import EditContent from './editContent';
import usePageActive from '@/utils/hooks/usePageActive';
import { ARTICLE_EDIT, ARTICLE_DETAIL } from '@/constants/url';
import { addNewArticle, updateArticleById } from '@/services/article';
import './articleEdit.less';

const MarkDownEditor = () => {
  const { state } = useLocation();
  const { initialState } = useModel('@@initialState');
  const { allLabels, allCategories } = useModel(
    'article.model',
    ({ allLabels, allCategories }) => ({
      allLabels,
      allCategories,
    }),
  );

  const pageVisible = usePageActive(ARTICLE_EDIT);

  const {
    authorId,
    authorName,
    category,
    content,
    labels,
    title,
    readCount,
    ownSee: defaultOwnSee,
    _id,
  } = (state as API.ArticleInfo) || {};

  const defaultLabels = useMemo(() => labels?.split(',') || [], [labels]);
  const defaultCategory = useMemo(() => category?.split(',') || [], [category]);

  const [text, setText] = useState(content || '');
  const [articleTitle, setArticleTitle] = useState(title || '');
  const [curLabels, setCurLabels] = useState(defaultLabels);
  const [curCategory, setCurCategory] = useState(defaultCategory);
  const [extraContentKey, setExtraContentKey] = useState(shortid.generate());
  const [ownSee, setOwnSee] = useState(!!defaultOwnSee);

  const initLabels = useMemo(
    () =>
      allLabels.length
        ? allLabels
        : Array.from(new Set([...BASIC_LABEL, ...defaultLabels])),
    [allLabels],
  );

  const initCategory = useMemo(
    () =>
      allCategories.length
        ? allCategories
        : Array.from(new Set([...BASIC_CATEGORY, ...defaultCategory])),
    [allCategories],
  );

  const { loading, run } = useRequest(
    state ? updateArticleById : addNewArticle,
    {
      manual: true,
      onSuccess: (data) => {
        const id = data?.data?._id || _id;
        id && history.push(`${ARTICLE_DETAIL}/${id}`);
      },
      onError: (e: any) => {
        message.error(e?.response?.data?.message || e.toString());
      },
    },
  );

  const onReset = useMemoizedFn(() => {
    setText(content || '');
    setArticleTitle(title || '');
    setCurLabels(defaultLabels);
    setCurCategory(defaultCategory);
    setOwnSee(!!defaultOwnSee);
    setExtraContentKey(shortid.generate());
  });

  const onSubmit = useMemoizedFn(() => {
    if (curLabels.length && curCategory.length) {
      const params = {
        authorName: authorName ?? initialState?.userInfo?.username,
        authorId: authorId ?? initialState?.userInfo?._id,
        title: articleTitle,
        content: text,
        labels: curLabels.join(','),
        category: curCategory.join(','),
        readCount,
        articleId: _id,
        ownSee: ownSee,
      };
      run(params);
    } else message.warning('请给文章添加分类和标签！');
  });

  const onTitleChange = useMemoizedFn((e) =>
    setArticleTitle(e?.target?.value || ''),
  );

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
            onChange={onTitleChange}
          />
        ),
      }}
      footer={
        pageVisible
          ? [
              <Button key="3" onClick={onReset}>
                重置
              </Button>,
              <Button
                disabled={loading}
                loading={loading}
                key="2"
                type="primary"
                onClick={onSubmit}
              >
                提交
              </Button>,
            ]
          : undefined
      }
    >
      <EditContent value={text} onChange={setText} />
      <div key={extraContentKey}>
        <div className="checked-tags-container">
          <label className="checked-tags-label">分类：</label>
          <CheckedTags
            initTags={initCategory}
            defaultChecked={defaultCategory}
            onCheckedChange={setCurCategory}
            single
          />
        </div>

        <div className="checked-tags-container">
          <label className="checked-tags-label">标签：</label>
          <CheckedTags
            initTags={initLabels}
            defaultChecked={defaultLabels}
            onCheckedChange={setCurLabels}
          />
        </div>

        <div>
          <label className="checked-tags-label">仅自己可见：</label>
          <Switch size="small" defaultChecked={ownSee} onChange={setOwnSee} />
        </div>
      </div>
    </PageContainer>
  );
};

export default memo(MarkDownEditor);
