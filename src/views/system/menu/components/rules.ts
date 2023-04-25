import type { FieldRule } from "@arco-design/web-vue";

const Rules: Record<string, FieldRule | FieldRule[]> = {
  type: [{ required: true, message: '菜单类型为必选项' }],
  parent_id: [{ required: true, message: '上级菜单为必选项' }],
  status: [{ required: true, message: '状态为必选项' }],
  sort: [
    { required: true, message: '排序为必填项' },
    { positive: true, message: '排序为正整数' }
  ]
};

export default Rules;
