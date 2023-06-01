import { request } from '@umijs/max';

import { REQ_BASE_URL } from '@/constants/url';

export const getAllArticles: () => Promise<
  API.commonRes<API.ArticleInfo>
> = () =>
  request(`${REQ_BASE_URL}/articleLists`, {
    method: 'GET',
  });

/**
 * 根据id获取文章的详细内容
 * @param id 文章id
 */
export const getArticleDetailById = (id: string) =>
  request(`${REQ_BASE_URL}/getArticleById/${id}`, {
    method: 'GET',
  });

export const editArticle = (params: API.UserInfo) =>
  request('/api/articles', {
    method: 'POST',
    data: {
      ...params,
    },
  });
