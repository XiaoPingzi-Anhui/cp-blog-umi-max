import { useParams, Link, useModel } from '@umijs/max';
import dayjs from 'dayjs';
import { Skeleton, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-components';

import ShowMarkDown from '@/components/markdown/showMarkDown';
import { ARTICLE_EDIT } from '@/constants/url';
import { Authority } from '@/constants';
import useArticleDetail from './hooks/useArticleDetail';
import './articleDetail.less';

const ArticleDetail = () => {
  const { id } = useParams();
  const { articleInfo, loading } = useArticleDetail(id);
  const {
    title,
    createdAt,
    category,
    readCount,
    content,
    authorId,
    authorName,
  } = articleInfo || {};
  const { initialState } = useModel('@@initialState');

  return (
    <PageContainer
      className="detail-page-container"
      header={{
        title: !loading ? (
          <div className="detail-header">
            <h1>{title}</h1>
            <span>作者：{authorName}</span>
            <span>
              发布于：
              {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
            </span>
            <span>归类：《{category}》</span>
            <span>阅读量：{readCount}</span>
            {authorId === initialState?.userInfo?._id ||
            initialState?.userInfo?.authority === Authority.WEBMASTER ? (
              <Link to={ARTICLE_EDIT} state={articleInfo}>
                编辑
              </Link>
            ) : null}
            <Divider dashed className="divider" />
          </div>
        ) : null,
        breadcrumb: {},
      }}
      loading={
        loading && (
          <div style={{ padding: '40px' }}>
            <Skeleton active paragraph={{ rows: 2 }} />
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        )
      }
    >
      <ShowMarkDown markDownText={content || ''} />
    </PageContainer>
  );
};

export default ArticleDetail;
