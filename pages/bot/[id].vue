<template>
  <div class="p-4 h-screen flex flex-col">
    <h1 class="text-2xl font-bold mb-4">{{ botRemitente }}</h1>
    <UButton flat size="lg" @click="getChatInfo" class=" mb-8 w-full text-left justify-center" color="cyan"> Refresh(Para que la base no pete)
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
      <UButton :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-paper-airplane" size="xl" class="flex-shrink-0"color="indigo" @click="sendMessage"></UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useRoute } from 'vue-router';
import { createClient } from '@supabase/supabase-js'

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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_MULTIMEDIA || '';
const supabase = createClient(supabaseUrl, supabaseKey)
supabase
  .channel('todos')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes' }, getChatInfo)
  .subscribe()


const currentUserId = ref(0);
const botRemitente = ref<string | null>(null);
let chatId = ref(0);
const route = useRoute();
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
        texto: message.value,
        fecha_envio: null,
        temporal: false,
        fecha_expiracion: null
      })
    });
    await getChatInfo();
    await botResponse(message.value);
    message.value = '';
  }
  catch (e) {
    console.log("Error:", e)
  }

}

async function getChats() {
  try {
    console.log(currentUserId.value, botRemitente.value)
    const response = await fetch('/api/getChats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: currentUserId.value,
        bot_id: botRemitente.value,
      })
    });

    return response.json();
  } catch (e) {
    console.log(e)
  }
}

async function botResponse(mensaje: string) {
  try{
    const responde =await fetch('/api/chatbot/remindersBot',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bot_id:  route.params.id,
        mensaje: mensaje,
        chat_id: chatId,
        remitente_id: botRemitente.value
    })
  });
  }catch(e){
    console.log("Error:", e)
  }
}

onMounted(async () => {
  botRemitente.value = localStorage.getItem('selectedBot');
  currentUserId.value = parseInt(localStorage.getItem('selectedContactId') || '0', 0);
  chatId = await getChats();
  getChatInfo();
});

</script>

<style></style>