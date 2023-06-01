import { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getArticleDetailById } from '@/services/article';

export default function useArticleDetail(id?: string) {
  const { run, error, loading, data } = useRequest(getArticleDetailById, {
    manual: true,
    retryCount: 3,
  });

  useEffect(() => {
    if (id) run(id);
  }, [id, run]);

  return {
    articleInfo: (data as any)?.data as API.ArticleInfo,
    loading,
    error,
  };
}
