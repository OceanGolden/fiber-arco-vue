import { TableColumnData } from '@arco-design/web-vue';

export const Columns: TableColumnData[] = [
  {
    title: '名称',
    dataIndex: 'name',
    fixed: 'left'
  },
  {
    title: '类型',
    dataIndex: 'type',
    slotName: 'type'
  },
  {
    title: '图标',
    dataIndex: 'icon',
    slotName: 'icon'
  },
  {
    title: '路径',
    dataIndex: 'path'
  },
  {
    title: '方法',
    dataIndex: 'method'
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
    align: 'center',
    fixed: 'right'
  }
];
