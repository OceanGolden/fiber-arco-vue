import type { TableColumnData } from '@arco-design/web-vue';

export const Columns: TableColumnData[] = [
  {
    title: '名称',
    dataIndex: 'label'
  },
  {
    title: '编码',
    dataIndex: 'value'
  },
  {
    title: '颜色',
    dataIndex: 'color',
    slotName: 'color'
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status'
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations'
  }
];
