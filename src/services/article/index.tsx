import { request } from '@umijs/max';

import { REQ_BASE_URL } from '@/constants/url';

// const REQ_BASE_URL = 'http://localhost:8082/api';

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

export const addNewArticle = (params: Partial<API.ArticleInfo>) =>
  request(`${REQ_BASE_URL}/addNewArticle`, {
    method: 'POST',
    data: params,
  });

export const updateArticleById = (params: Partial<API.ArticleInfo>) =>
  request(`${REQ_BASE_URL}/updateArticleById`, {
    method: 'POST',
    data: params,
  });
