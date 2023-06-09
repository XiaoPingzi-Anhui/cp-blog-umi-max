import { useEffect } from 'react';
import { useLocation } from '@umijs/max';
import { useRequest } from 'ahooks';
import { getArticleDetailById } from '@/services/article';

export default function useArticleDetail(id?: string) {
  const { state } = useLocation();
  const { run, error, loading, data } = useRequest(getArticleDetailById, {
    manual: true,
    retryCount: 3,
  });

  useEffect(() => {
    if (id) run(id);
  }, [id, (state as any)?.refresh, run]);

  return {
    articleInfo: (data as any)?.data as API.ArticleInfo,
    loading,
    error,
  };
}
