import { request } from '@umijs/max';

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
