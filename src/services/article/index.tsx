import { request } from '@umijs/max';

export const editArticle = (params: API.UserInfo) =>
  request('/api/articles', {
    method: 'POST',
    data: {
      ...params,
    },
  });
