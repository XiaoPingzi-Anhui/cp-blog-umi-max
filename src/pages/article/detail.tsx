import { useParams } from '@umijs/max';
import dayjs from 'dayjs';
import { Skeleton, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import ShowMarkDown from '@/components/markdown/showMarkDown';
import useArticleDetail from './hooks/useArticleDetail';
import './articleDetail.less';

const ArticleDetail = () => {
  const { id } = useParams();
  const { articleInfo, loading } = useArticleDetail(id);
  const { title, createdAt, category, readCount, content } = articleInfo || {};

  return (
    <PageContainer
      header={{
        title: !loading ? (
          <div className="detail-header">
            <h1>{title}</h1>
            <span>
              发布于：
              {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
            </span>
            <span>归类：《{category}》</span>
            <span>阅读量：{readCount}</span>
            <Divider dashed className="divider" />
          </div>
        ) : null,
        breadcrumb: {},
      }}
      loading={
        loading && (
          <>
            <Skeleton active paragraph={{ rows: 2 }} />
            <Skeleton active paragraph={{ rows: 10 }} />
          </>
        )
      }
    >
      <ShowMarkDown markDownText={content || ''} />
    </PageContainer>
  );
};

export default ArticleDetail;
