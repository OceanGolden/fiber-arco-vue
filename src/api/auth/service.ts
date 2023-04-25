import { LoginRequest, TokenRecord } from './type';

import type { UserState } from '@/stores/modules/user/type';
import request from '@/utils/request';

const URL = '/auth';

export const login = async (
  data: Partial<LoginRequest>
): Promise<TokenRecord> => {
  return request.post(`${URL}/login`, data);
};

export const logout = async () => {
  return request.post(`${URL}/logout`);
};

export const refresh = async () => {
  return request.post(`${URL}/refresh`);
};

export const info = async (): Promise<Partial<UserState>> => {
  return request.get(`${URL}/info `);
};
