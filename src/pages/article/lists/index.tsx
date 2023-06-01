import React, { useState } from 'react';
import { styled } from '@umijs/max';
import { Skeleton } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import useArticleLists, { ArticleListsType } from '../hooks/useArticleLists';
import ArticleCollapse from './articleCollapse';
import RightCard from './rightCard/filter';

const MySkeleton = styled(Skeleton)`
  padding: 40px;
`;

export default function ArticleLists() {
  const { articleInfos, loading } = useArticleLists();

  const { articleLists, allCategories, allLabels } = articleInfos;
  const [filterArticles, setFilterArticles] =
    useState<ArticleListsType>(articleLists);

  return (
    <PageContainer
      header={{
        title: (
          <RightCard
            articleLists={articleLists}
            allCategories={allCategories}
            allLabels={allLabels}
            setFilterArticles={setFilterArticles}
          />
        ),
      }}
      loading={
        loading && (
          <MySkeleton active paragraph={{ rows: 14 }} className="test" />
        )
      }
    >
      <ArticleCollapse filterArticles={filterArticles} />
    </PageContainer>
  );
}
