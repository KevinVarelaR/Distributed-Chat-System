<template>
  <div class="p-4 h-screen flex flex-col">
    <h1 class="text-2xl font-bold mb-4">{{ usuarioRemitente }}</h1>
    <UButton flat size="lg" @click="getChatInfo" class=" mb-8 w-full text-left justify-center" color="cyan"> Refresh (Para que la base no pete)
    </UButton>
    <div class="flex-1 overflow-y-auto">
      <ul class="space-y-2 flex flex-col">
        <template v-for="(message, index) in messages" :key="message.id">
          <UDivider
            v-if="index === 0 || new Date(message.fecha_envio).toLocaleDateString() !== new Date(messages[index - 1].fecha_envio).toLocaleDateString()"
            :label="new Date(message.fecha_envio).toLocaleDateString()" />
          <li :class="{
            'p-2 rounded bg-blue-200 self-end max-w-[50%]': message.remitente_id === currentUserId,
            'p-2 rounded bg-gray-200 self-start max-w-[50%]': message.remitente_id !== currentUserId
          }">
            <div class="flex justify-between items-center">
              <strong>{{ message.remitente_id }}</strong>
              <span class="text-sm text-gray-500">{{ new Date(message.fecha_envio).toLocaleTimeString() }}</span>
            </div>
            <p>{{ message.texto }}</p>
          </li>
        </template>
      </ul>
    </div>

    <div class="flex items-center mt-4">
      <UTextarea class="flex-1 mr-2" autoresize :maxrows="3" placeholder="Message" color="indigo" v-model="message" />
      <UButton :ui="{rounded:'rounded-full'}" icon="i-heroicons-paper-airplane"  size="xl" class="flex-shrink-0" color="indigo" @click="sendMessage"></UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useRoute } from 'vue-router';

interface Message {
  id: number;
  chat_id: number;
  remitente_id: number;
  texto: string;
  fecha_envio: string;
  temporal: boolean;
  fecha_expiracion: string;
}

const messages = ref<Message[]>([]);




const currentUserId = ref(0);
const usuarioRemitente = ref<string | null>(null);
const route = useRoute();
const chatId = route.params.id;
const message = ref('');


async function getChatInfo() {
  try {

    const response = await fetch('/api/getChatInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: chatId
      })
    });

    const data: Message[] = await response.json();

    messages.value = data;

    console.log(data);

  }
  catch (e) {
    console.log(e)
  }

}


async function sendMessage() {
  try {

    const response = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        remitente_id: currentUserId.value,
        texto : message.value,
        fecha_envio: null,
        temporal: false,
        fecha_expiracion: null
      })
    });

    await getChatInfo();
    message.value = '';

  }
  catch (e) {
    console.log(e)
  }

}

async function getMultimedia() {
  try {
    const response = await fetch('/api/getMultimedia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        remitente_id: currentUserId.value,
        texto: message.value,
        fecha_envio: null,
        temporal: false,
        fecha_expiracion: null
      })
    });


  }
  catch (e) {
    console.log(e)
  }

}



onMounted(() => {
  usuarioRemitente.value = localStorage.getItem('selectedContact');
  currentUserId.value = parseInt(localStorage.getItem('selectedContactId') || '0', 0);
  getChatInfo();
});



</script>

<style>

</style>