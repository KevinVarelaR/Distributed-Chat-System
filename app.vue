<template>
  <div class="flex h-screen">
    <SideBar class="w-1/5" /> <!-- Ajusta el ancho de la SideBar -->
    <div class="flex-1">
      <NuxtPage />
      <UNotifications />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideBar from './pages/SideBar.vue';
</script>