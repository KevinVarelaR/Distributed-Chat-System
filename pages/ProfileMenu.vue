<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="mb-4">
      <UAvatar :src='profileImage' size="3xl" @click="handleAvatarClick" class="cursor-pointer hover:opacity-75 transition-opacity duration-300"/>
    </div>

    <UModal v-model="isOpen">
      <div class="p-4">

      </div>
    </UModal>


    <div class="mb-4 w-full max-w-xs flex flex-row items-center">
      <h1 class="sub-menu-title mr-4">Name</h1>
      <div class="relative flex-1">
        <UInput id="username" :disabled="editProfile"  v-model="username" size="md" />
      </div>
      <div v-if="editProfile">
        <UButton size="md" icon="i-heroicons-pencil" class="ml-4" color="white" @click="changeEditProfile" </UButton>
      </div>
      <div v-else>
        <UButton size="md" icon="i-heroicons-check" class="ml-4" color="green"</UButton>
        <UButton size="md" icon="i-heroicons-x-mark" class="ml-4" color="red" @click="changeEditProfile" </UButton>
      </div>

    </div>

    <div class="w-full max-w-xs flex flex-row items-center">
      <h1 class="mr-4">User ID</h1>
      <UInput disabled v-model="userId" size="md" class="w-full flex-1" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const profileImage = 'https://avatars.githubusercontent.com/u/102042795?v=4'
const username = 'John Doe'
const userId = '1'
const isOpen = ref(false)

const editProfile = ref(true)


function handleAvatarClick() {
  console.log('Avatar clicked')
  isOpen.value = true
}

function changeEditProfile() {
  editProfile.value = !editProfile.value
}


</script>

<style></style>