<template>
  <a-form
    ref="formRef"
    :model="formModel"
    size="large"
    layout="vertical"
    @submit.enter="onSubmit"
    :rules="Rules"
  >
    <a-form-item field="username" tooltip="请输入用户名称" hide-label>
      <a-input v-model.trim="formModel.username" placeholder="Username">
        <template #prefix><icon-user /></template>
      </a-input>
    </a-form-item>
    <a-form-item field="password" tooltip="请输入用户密码" hide-label>
      <a-input-password
        v-model.trim="formModel.password"
        placeholder="Password"
      >
        <template #prefix><icon-lock /></template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button
        html-type="submit"
        long
        type="primary"
        :loading="loginMutation.isLoading.value"
      >
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { useLoginMutation } from '@/api/auth/query';
  import type { LoginRequest } from '@/api/auth/type';
  import { DEFAULT_ROUTE } from '@/router/constants';
  import type { FormInstance } from '@arco-design/web-vue';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Rules from './rules';

  const formRef = ref<FormInstance | null>(null);
  const formModel = reactive<Partial<LoginRequest>>({
    username: '',
    password: ''
  });
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const onSubmit = () => {
    formRef.value?.validate((err) => {
      if (!err) {
        loginMutation.mutate(formModel, {
          onSuccess: () => {
            const { redirect, ...othersQuery } =
              router.currentRoute.value.query;
            router.push({
              name: DEFAULT_ROUTE.name,
              query: {
                ...othersQuery
              }
            });
          }
        });
      }
    });
  };
</script>
<style lang="less"></style>
