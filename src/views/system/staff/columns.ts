import type { TableColumnData } from '@arco-design/web-vue';

export const Columns: TableColumnData[] = [
  {
    title: '用户名称',
    dataIndex: 'username',
    fixed: 'left'
  },
  {
    title: '用户姓名',
    dataIndex: 'name',
    align: 'center'
  },
  // {
  //   title: '电话号码',
  //   dataIndex: 'mobile'
  // },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'center',
    slotName: 'gender'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
    align: 'center'
  },
  {
    title: '在职状态',
    dataIndex: 'work_status',
    slotName: 'work_status',
    align: 'center'
  },

  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
    align: 'center',
    fixed: 'right'
  }
];
