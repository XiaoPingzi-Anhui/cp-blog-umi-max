import { request } from '@umijs/max';
import { REQ_BASE_URL } from '@/constants/url';
// const REQ_BASE_URL = 'http://localhost:8082/api';

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

export const updateUserById = (params: API.UserInfo) =>
  request(`${REQ_BASE_URL}/updateUserById`, {
    method: 'POST',
    data: params,
  });
