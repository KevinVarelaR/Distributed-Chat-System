<template>
  <div class="h-full bg-gray-800 text-white p-4">
    <div class="space-y-4">
      <h1 class="text-2xl font-bold">Twixt</h1>
      <template v-if="currentView === 'main'">
        <UButton flat size="lg" to="/ProfileMenu" class="w-full text-left" color="cyan">
          <UIcon name="i-el-user" /> Profile
        </UButton>
        <UButton flat size="lg" @click="showMessages" class="w-full text-left" color="green">
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
      <template v-else-if="currentView === 'messages'">
        <h2 class="text-xl font-bold">Messages</h2>
        <UButton flat size="lg" @click="showMain" class="w-full text-left" color="cyan">
          <UIcon name="i-el-arrow-left" /> Back
        </UButton>
        <ul class="space-y-2">
          <li v-for="message in messages" :key="message.id" @click="selectContact(message.id)">
            <a :href="'/chat/' + message.id">
              <UCard :class="{
              'text-black shadow-xl min-h-[40px] max-h-[40px] cursor-pointer hover:scale-105 hover:bg-slate-100 w-full h-fit flex items-center justify-center': true 
            }">
                <template #header>
                  <div class="flex items-center justify-center w-full font-semibold cursor-pointer">
                    {{ message.username }}
                  </div>
                </template>
              </UCard>
            </a>
          </li>
        </ul>
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
                    {{ contact.nombre }}
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




interface Contact {
  id: number;
  username: string;   //Sh*t code
  nombre : string;
}

const currentView = ref('main');
let messages = ref<Contact[]>([]);
let contacts = ref<Contact[]>([]);

const currentUserId = ref(2);    ///Este usuario hay que cambiarlo por el que inicia sesion

const selectContact = (id:number) => {
  console.log('Selected contact', id);
  localStorage.setItem('selectedContact', messages.value.find(c => c.id === id)?.username || '');
  localStorage.setItem('selectedContactId', currentUserId.value.toString());
}



function showMessages() {
  currentView.value = 'messages';
}

function showMain() {
  currentView.value = 'main';
}

function showContacts() {
  currentView.value = 'contacts';
}

try {

  const response = await $fetch('/api/getMessages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: currentUserId.value
    })
  });

  const data:Contact[] = response as Contact[];

  messages.value = data;

}
catch (e) {
  console.log(e)
}

try {
  
    const response = await $fetch('/api/getContacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: currentUserId.value
      })
    });
  
    const data:Contact[] = response as Contact[];
  
    contacts.value = data;
  
  }
  catch (e) {
    console.log(e)
}


</script>