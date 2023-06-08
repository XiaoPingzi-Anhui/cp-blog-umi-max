import { styled } from '@umijs/max';
import { Skeleton } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import useArticleLists from '../hooks/useArticleLists';
import ArticleCollapse from './articleCollapse';
import RightCard from './rightCard/filter';

const MySkeleton = styled(Skeleton)`
  padding: 40px;
`;

export default function ArticleLists() {
  const { loading } = useArticleLists();

  return (
    <PageContainer
      header={{
        title: <RightCard />,
      }}
      loading={
        loading && (
          <MySkeleton active paragraph={{ rows: 14 }} className="test" />
        )
      }
    >
      <ArticleCollapse />
    </PageContainer>
  );
}
