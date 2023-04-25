import type { FieldRule } from "@arco-design/web-vue";

const Rules: Record<string, FieldRule | FieldRule[]> = {
  username: [
    { required: true, message: '用户名称为必填项' },
    { minLength: 2, message: '用户名称至少需要4个字符' },
    { maxLength: 32, message: '用户名称最多只能32个字符' }
  ],
  name: [
    { required: true, message: '用户姓名为必填项' },
    { minLength: 2, message: '用户姓名至少需要2个字符' },
    { maxLength: 32, message: '用户姓名最多只能32个字符' }
  ],
  email: [
    { type: 'email', message: '请填写正确的邮件格式' },
    { required: true, message: '电子邮件为必填项' },
    { maxLength: 32, message: '用户名称最多只能64个字符' }
  ],
  mobile: [
    { required: true, message: '手机号码为必填项' },
    { length: 11, message: '手机号码最多只能11个字符' }
  ],
  gender: [{ required: true, message: '性别为必选项' }],
  status: [{ required: true, message: '状态为必选项' }],
  sort: [
    { required: true, message: '排序为必填项' },
    { positive: true, message: '排序为正整数' }
  ],
  organization_id: [{ required: true, message: '归属部门为必选项' }],
  position_id: [{ required: true, message: '岗位为必选项' }],
  role_ids: [{ required: true, message: '角色为必选项' }]
};

export default Rules;
