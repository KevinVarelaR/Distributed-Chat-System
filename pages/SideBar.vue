<template>
  <div class="h-full bg-gray-800 text-white p-4">
    <div class="space-y-4">
      <h1 class="text-2xl font-bold">Twixt</h1>
      <template v-if="currentView === 'main'">
        <UButton flat size="lg" to="/ProfileMenu" class="w-full text-left" color="cyan">
          <UIcon name="i-el-user" /> Profile
        </UButton>
        <UButton flat size="lg" @click="showContacts" class="w-full text-left" color="green">
          <UIcon name="i-el-envelope" /> Messages
        </UButton>
        <UButton flat size="lg" @click="showContacts" class="w-full text-left" color="blue">
          <UIcon name="i-el-address-book" /> Contacts
        </UButton>
        <UButton flat size="lg" to="/SettingsMenu" class="w-full text-left" color="purple">
          <UIcon name="i-heroicons-wrench-screwdriver-20-solid" /> Settings
        </UButton>
        <UButton flat size="lg" @click="confirmLogout" class="w-full text-left" color="red">
          <UIcon name="i-heroicons-arrow-right-start-on-rectangle-solid" size="23" /> Logout
        </UButton>
        <UButton flat size="lg" to="/HelpMenu" class="w-full text-left" color="white">
          <UIcon name="i-el-question-sign" /> Help
        </UButton>
      </template>
      <template v-else-if="currentView === 'contacts'">
        <h2 class="text-xl font-bold">Contacts</h2>
        <UButton flat size="lg" @click="showMain" class="w-full text-left" color="cyan">
          <UIcon name="i-el-arrow-left" /> Back
        </UButton>
        <ul>
          <li v-for="contact in contacts" :key="contact.id" class="py-2">
            <UCard
              class="text-black shadow-xl min-h-[40px] max-h-[40px] hover:scale-105 hover:bg-slate-100 w-full h-fit flex items-center justify-center">
              <template #header>
                <div class="flex items-center justify-center w-full font-semibold">
                  {{ contact.username }}
                </div>
              </template>
            </UCard>
          </li>
        </ul>
      </template>
    </div>
    <div v-if="showLogoutDialog">
      <UDialog v-model="showLogoutDialog" class="center-dialog-overlay">
        <UCard style="background-color: #1f2836; color: white" class="max-w-md">
          <template #header>
            <h2 class="text-xl font-bold">Confirm Logout</h2>
          </template>
          <p>Are you sure you want to logout?</p>
          <div class="flex items-center justify-center space-x-2 mt-4">
            <UButton color="gray" @click="showLogoutDialog = false"
              >Cancel</UButton
            >
            <UButton color="red" @click="logout">Logout</UButton>
          </div>
        </UCard>
      </UDialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";

interface Contact {
  id: number;
  username: string;
}

const currentView = ref('main');
let contacts = ref<Contact[]>([]);
const currentUserId = ref(1);
const emit = defineEmits();
const showLogoutDialog = ref(false);

function showContacts() {
  currentView.value = 'contacts';
}

function showMain() {
  currentView.value = 'main';
}

function confirmLogout() {
  showLogoutDialog.value = true;
}

function logout() {
  showLogoutDialog.value = false;
  emit("logout");
}

try {

  const response = await fetch('/api/getMessages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: currentUserId.value
    })
  });

  const data:Contact[] = await response.json();

  contacts.value = data;
} catch (e) {
  console.log(e);
}
</script>

<style scoped>
.center-dialog-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.max-w-md {
  margin: auto;
}
</style>
