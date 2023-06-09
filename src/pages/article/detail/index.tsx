import { useParams, Link, useModel, history } from '@umijs/max';
import dayjs from 'dayjs';
import { Skeleton, Divider, Alert, Button, message } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { useMemoizedFn, useBoolean, useRequest } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';

import ShowMarkDown from '@/components/markdown/showMarkDown';
import { ARTICLE_EDIT, ARTICLE_LISTS } from '@/constants/url';
import { Authority } from '@/constants';
import useArticleDetail from '../hooks/useArticleDetail';
import { deleteArticleById } from '@/services/article';
import './articleDetail.less';

const ArticleDetail = () => {
  const [showAlert, { setTrue, setFalse }] = useBoolean(false);
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

  const { run } = useRequest(deleteArticleById, {
    manual: true,
    onSuccess: (data) => {
      history.push(ARTICLE_LISTS, { refresh: true });
    },
    onError: (e: any) => {
      message.error(e?.response?.data?.message || e.toString());
    },
  });

  const onDelete = useMemoizedFn(() => {
    id && run(id);
    setFalse();
  });

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
              <>
                <Link to={ARTICLE_EDIT} state={articleInfo}>
                  <EditTwoTone style={{ marginRight: '3px' }} />
                  编辑
                </Link>
                <span className="delete" onClick={setTrue}>
                  <DeleteTwoTone style={{ marginRight: '3px' }} />
                  删除
                </span>
              </>
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
      {showAlert && (
        <Alert
          className="delete-alert"
          message="确定删除本篇文章！"
          type="warning"
          action={
            <Button onClick={onDelete} size="small">
              删除
            </Button>
          }
          showIcon
          closable
        />
      )}
      <ShowMarkDown markDownText={content || ''} />
    </PageContainer>
  );
};

export default ArticleDetail;
