import type { FieldRule } from '@arco-design/web-vue';

const Rules: Record<string, FieldRule | FieldRule[]> = {
  username: [{ type: 'string', required: true, message: '用户名称为必填项' }],
  password: [{ type: 'string', required: true, message: '密码为必填项' }]
};

export default Rules;
