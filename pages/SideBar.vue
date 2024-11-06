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
        <ul class="space-y-2">
          <li v-for="contact in contacts" :key="contact.id" @click="selectContact(contact.id)">
            <a :href="'/chat/' + contact.id">
              <UCard :class="{
              'text-black shadow-xl min-h-[40px] max-h-[40px] cursor-pointer hover:scale-105 hover:bg-slate-100 w-full h-fit flex items-center justify-center': true 
            }">
                <template #header>
                  <div class="flex items-center justify-center w-full font-semibold cursor-pointer">
                    {{ contact.username }}
                  </div>
                </template>

              </UCard>
            </a>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

//import { useRoute } from 'vue-router';

//const route = useRoute();


interface Contact {
  id: number;
  username: string;
}

const currentView = ref('main');
let contacts = ref<Contact[]>([]);

const currentUserId = ref(2);

const selectContact = (id:number) => {
  console.log('Selected contact', id);
  localStorage.setItem('selectedContact', contacts.value.find(c => c.id === id)?.username || '');

}



function showContacts() {
  currentView.value = 'contacts';
}

function showMain() {
  currentView.value = 'main';
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

}
catch (e) {
  console.log(e)
}

</script>