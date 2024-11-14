<template>
  <div class="flex h-screen">
    <SideBar v-if="showSideBar" class="w-1/5" /> <!-- Ajusta el ancho de la SideBar -->
    <div :class="showSideBar ? 'flex-1' : 'w-full'">
      <NuxtPage />
      <UNotifications />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SideBar from './pages/SideBar.vue';

const route = useRoute();
const showSideBar = route.path !== '/login' && route.path !== '/register';
</script>