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
        <UButton flat size="lg" class="w-full text-left" color="red">
          <UIcon name="i-heroicons-arrow-right-start-on-rectangle-solid" size="23" />
          Logout
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
        <!-- Aquí puedes agregar la lista de contactos -->
        <ul>
          <li v-for="contact in contacts" :key="contact.id" class="py-2">
            <UCard
              class="text-black shadow-xl min-h-[40px] max-h-[40px] hover:scale-105 hover:bg-slate-100 w-full h-fit flex items-center justify-center">
              <template #header>
                <div class="flex items-center justify-center w-full font-semibold">
                  <Placeholder class="h-6" />
                  {{ contact.name }}
                </div>
              </template>

            </UCard>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentView = ref('main');
const contacts = ref([
  { id: 1, name: 'Contact 1' },
  { id: 2, name: 'Contact 2' },
  { id: 3, name: 'Contact 3' },
]);

const currentUserId = ref(1);

function showContacts() {
  currentView.value = 'contacts';
}

function showMain() {
  currentView.value = 'main';
}

getChats()
async function getChats() {

  const data = await $fetch('/api/getMessages')


  console.log(data)

}


</script>