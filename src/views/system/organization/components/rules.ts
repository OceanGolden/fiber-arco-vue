import type { FieldRule } from "@arco-design/web-vue";

const Rules: Record<string, FieldRule | FieldRule[]> = {
  parent_id: [{ required: true, message: '上级组织为必选项' }],
  name: [
    { required: true, message: '组织名称为必填项' },
    { minLength: 2, message: '组织名称至少需要2个字符' },
    { maxLength: 32, message: '组织名称最多只能32个字符' }
  ],
  code: [
    { required: true, message: '组织编码为必填项' },
    { minLength: 2, message: '组织编码至少需要2个字符' },
    { maxLength: 32, message: '组织编码最多只能32个字符' }
  ],
  status: [{ required: true, message: '状态为必选项' }],
  sort: [
    { required: true, message: '排序为必填项' },
    { positive: true, message: '排序为正整数' }
  ]
};

export default Rules;
