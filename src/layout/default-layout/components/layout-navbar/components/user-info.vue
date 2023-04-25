<template>
  <a-dropdown trigger="hover">
    <a-avatar :size="32" class="mr-4">
      <img v-if="userState.avatar" alt="avatar" :src="userState.avatar" />
      <span v-else>{{ userState.name }}</span>
    </a-avatar>
    <template #content>
      <a-doption>
        <a-space>
          <icon-user />
          <span>个人中心</span>
        </a-space>
      </a-doption>
      <a-doption>
        <a-space>
          <icon-settings />
          <span>用户设置</span>
        </a-space>
      </a-doption>
      <a-doption @click="logout">
        <a-space>
          <icon-export />
          <span>安全退出</span>
        </a-space>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
  import { useLogoutMutation } from '@/api/auth/query';
  import { useUserStore } from '@/stores';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const { userState } = storeToRefs(userStore);
  const { confirmLogout } = useLogoutMutation();
  const router = useRouter();
  const logout = () => {
    confirmLogout(() => {
      userState.value = {};
      router.push({
        name: 'login'
      });
    });
  };
</script>
