import { request } from '@umijs/max';

import { REQ_BASE_URL } from '@/constants/url';

export const getAllArticles: () => Promise<
  API.commonRes<API.ArticleInfo>
> = () =>
  request(`${REQ_BASE_URL}/articleLists`, {
    method: 'GET',
  });

export const editArticle = (params: API.UserInfo) =>
  request('/api/articles', {
    method: 'POST',
    data: {
      ...params,
    },
  });
