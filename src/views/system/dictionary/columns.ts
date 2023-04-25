import type { TableColumnData } from '@arco-design/web-vue';

export const Columns: TableColumnData[] = [
  {
    title: '字典名称',
    dataIndex: 'name',
    fixed: 'left'
  },
  {
    title: '字典编码',
    dataIndex: 'code'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status'
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
    align: 'center',
    fixed: 'right'
  }
];
