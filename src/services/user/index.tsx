import { request } from '@umijs/max';
import { REQ_BASE_URL } from '@/constants/url';

export const getAllUsers = () =>
  request(`${REQ_BASE_URL}/userLists`, {
    method: 'GET',
  });

export const register = (params: API.UserInfo) =>
  request(`${REQ_BASE_URL}/addNewUser`, {
    method: 'POST',
    data: {
      ...params,
    },
  });

export const login = (params: API.UserInfo) =>
  request(`${REQ_BASE_URL}/login`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
