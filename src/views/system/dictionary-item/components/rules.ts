import type { FieldRule } from "@arco-design/web-vue";

const Rules: Record<string, FieldRule | FieldRule[]> = {
  label: [
    { required: true, message: '选项名称为必填项' },
    { minLength: 2, message: '选项名称至少需要2个字符' },
    { maxLength: 32, message: '选项名称最多只能32个字符' }
  ],
  value: [
    { required: true, message: '选项编码为必填项' },
    { minLength: 2, message: '选项编码至少需要2个字符' },
    { maxLength: 32, message: '选项编码最多只能32个字符' }
  ],
  color: [{ required: true, message: '选项颜色为必填项' }],
  status: [{ required: true, message: '状态为必选项' }],
  sort: [
    { required: true, message: '排序为必填项' },
    { positive: true, message: '排序为正整数' }
  ]
};

export default Rules;
