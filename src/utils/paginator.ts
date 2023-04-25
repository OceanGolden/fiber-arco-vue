import { PaginationDefault } from '@/common/constants';

export const CalCurrent = (
  current: number = PaginationDefault.Current,
  pageSize: number = PaginationDefault.PageSize,
  total: number = PaginationDefault.Total
) => {
  const totalPage = Math.ceil((total - 1) / pageSize); // 总页数
  current = current > totalPage ? totalPage : current;
  current = current < 1 ? 1 : current;
  return current;
};
