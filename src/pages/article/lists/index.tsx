import React from 'react';
import { styled } from '@umijs/max';
import { Skeleton } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import useArticleLists from './hooks/useArticleLists';
import ArticleCollapse from './articleCollapse';

const MySkeleton = styled(Skeleton)`
  padding: 40px;
`;

export default function ArticleLists() {
  const { articleInfos, loading, error } = useArticleLists();
  console.log('articleInfos:', articleInfos);
  console.log('loading:', loading);
  console.log('error:', error);
  return (
    <PageContainer
      header={{ title: '' }}
      loading={
        loading && (
          <MySkeleton active paragraph={{ rows: 14 }} className="test" />
        )
      }
    >
      <ArticleCollapse filterArticles={articleInfos.articleLists} />
    </PageContainer>
  );
}
