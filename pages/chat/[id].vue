<template>
  <div class="p-4 h-screen flex flex-col">
    <h1 class="text-2xl font-bold mb-4">{{ usuarioRemitente }}</h1>

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
      <UButton @click="isOpen=true" color="teal" icon="i-heroicons-paper-clip" size="xl" :ui="{rounded: 'rounded-full'}"
        class="mr-2" />
      <UModal v-model="isOpen" :overlay="false">
        <div class="p-4">
          <Input type="file" @change="handleFileChange" icon="i-heroicons-folder" color="cyan"  class="mb-4" />
          <UButton flat size="lg" @click="uploadImage" class=" mb-8 w-full text-left justify-center" color="cyan">
            Subir archivo
          </UButton>
          <img v-if="imageUrl" :src="imageUrl" alt="Selected Image" class="h-48 w-auto" />
          
        </div>
      </UModal>
      <UTextarea class="flex-1 mr-2" autoresize :maxrows="3" placeholder="Message" color="teal" @keyup.enter="sendMessage" v-model="message" />
      <UButton :ui="{rounded:'rounded-full'}" icon="i-heroicons-paper-airplane" size="xl" class="flex-shrink-0"
        color="teal" @click="sendMessage"></UButton>
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
const usuarioRemitente = ref<string | null>(null);
const route = useRoute();
const chatId = route.params.id;
const message = ref('');
const isOpen = ref(false);
const imageUrl = ref<string | null>(null);

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

    if (message.value.trim() === '') {
      return;
    }

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


const selectedFile = ref<File | null>(null);
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
}

async function uploadImage() {
  if (!selectedFile.value) {
    alert('Please select a file first.');
    return;
  }

  const { data, error } = await supabase.storage
    .from('multimedia')
    .upload(`uploads/${selectedFile.value.name}`, selectedFile.value);

  if (error) {
    console.error('Error uploading file:', error);
  } else {
    console.log('File uploaded successfully:', data);
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