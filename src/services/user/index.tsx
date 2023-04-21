import { request } from '@umijs/max';

const BASE_URL = process.env.REQUEST_BASE_URL;

export const register = (params: API.UserInfo) =>
  request('/api/register', {
    method: 'POST',
    data: {
      ...params,
    },
  });

export const login = (params: API.UserInfo) =>
  request('/api/login', {
    method: 'POST',
    data: {
      ...params,
    },
  });

/** 获取所有的文章列表 */
export const getAllUsers = () =>
  request(`${BASE_URL}/userLists`, {
    method: 'GET',
  });
