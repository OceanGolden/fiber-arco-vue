<template>
  <div class="bg-arco-bg-2 flex justify-center items-center min-h-screen">
    <div
      class="flex justify-between items-center w-screen-lg overflow-hidden m-0 shadow-2xl rounded-2xl border-1"
    >
      <div class="min-h-full">
        <img class="w-full" :src="loginBanner1" alt="Login" />
      </div>
      <div class="w-full p-8 max-w-1/2">
        <p class="text-shadow-sm text-5xl font-bold mb-16 text-arco-text-1"
          >欢迎回来</p
        >
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import loginBanner1 from '@/assets/images/login-banner-1.png';
  import LoginForm from './components/login-form.vue';
</script>
