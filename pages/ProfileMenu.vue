<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="mb-4 relative">
      <UAvatar :src="profileImage" size="3xl" @click="isOpen = true" class="cursor-pointer hover:opacity-75 transition-opacity duration-300" />
    </div>

    <UModal v-model="isOpen" title="Change Profile Picture">
      <div class="p-4 flex flex-col items-center">
        <p class="mb-4 text-center">Select a new profile picture</p>
        <input type="file" accept="image/*" @change="onFileChange" />
        <div class="flex mt-4">
          <UButton color="green" @click="confirmProfileImageChange">Confirm</UButton>
          <UButton color="red" class="ml-2" @click="cancelProfileImageChange">Cancel</UButton>
        </div>
      </div>
    </UModal>

    <div class="mb-4 w-full max-w-xs flex flex-row items-center">
      <h1 class="sub-menu-title mr-4">Name</h1>
      <div class="relative flex-1">
        <UInput id="username" :disabled="editProfile" v-model="tempUsername" size="md" />
      </div>
      <div v-if="editProfile">
        <UButton size="md" icon="i-heroicons-pencil" class="ml-4" color="white" @click="enableEditProfile" />
      </div>
      <div v-else>
        <UButton size="md" icon="i-heroicons-check" class="ml-4" color="green" @click="confirmEditProfile" />
        <UButton size="md" icon="i-heroicons-x-mark" class="ml-4" color="red" @click="cancelEditProfile" />
      </div>
    </div>

    <div class="w-full max-w-xs flex flex-row items-center">
      <h1 class="mr-4">User ID</h1>
      <UInput disabled v-model="userId" size="md" class="w-full flex-1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const profileImage = ref("https://via.placeholder.com/150");
const tempProfileImage = ref("");
const username = ref(localStorage.getItem("username") || "");
const userId = ref(localStorage.getItem("userID") || "");
const isOpen = ref(false);
const editProfile = ref(true);
const tempUsername = ref(username.value);

function onFileChange(event:any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        tempProfileImage.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
}

function confirmProfileImageChange() {
  if (tempProfileImage.value) {
    profileImage.value = tempProfileImage.value;
  }
  isOpen.value = false;
}

function cancelProfileImageChange() {
  tempProfileImage.value = "";
  isOpen.value = false;
}

function enableEditProfile() {
  tempUsername.value = username.value;
  editProfile.value = false;
}

function confirmEditProfile() {
  username.value = tempUsername.value;
  editProfile.value = true;
}

function cancelEditProfile() {
  tempUsername.value = username.value;
  editProfile.value = true;
}
</script>

<style scoped></style>
