<template>
  <div>
    <img :src="profileImage" :alt="username" />
    <UButton flat size="sm" >
      Change image
    </UButton>
    <input type="file" ref="fileInput" accept="image/*"  style="display: none" />
  </div>

  <div >
    <h1 class="sub-menu-title-">Name</h1>
    <div style="position: relative; width: fit-content">
      <UInput id="username" v-model="username" placeholder="Enter your name" class="custom-input-width" size="md"
        style="padding-right: 35px" />
      <UIcon name="i-heroicons-pencil-solid" class="input-icon" />
    </div>
  </div>

  <div>
    <h1 class="sub-menu-title">User ID</h1>
    <UInput disabled v-model="userId" size="md" class="custom-input-width" style="padding-right: 35px" />
  </div>
</template>

<script lang="ts" setup>

const profileImage = 'https://randomuser.me/api/port'
const username = 'John Doe'
const userId = '1234567890'


</script>

<style>

</style>