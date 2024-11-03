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
    <UTextarea class="mt-4" autoresize :maxrows="3" placeholder="Message" color="indigo" model-value="" />
  </div>
</template>

<script lang="ts" setup>


interface Message {
  id: number;
  chat_id: number;
  remitente_id: number;
  texto: string;
  fecha_envio: string;
  temporal: boolean;
  fecha_expiracion: string;
}


//const messages = ref<Message[]>([]);


const currentUserId = 101;
const usuarioRemitente = "Kevin Varela";


const messages = ref<Message[]>([
  {
    id: 1,
    chat_id: 1,
    remitente_id: 101,
    texto: "Hola, ¿cómo estás?",
    fecha_envio: "2024-11-03T10:00:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 2,
    chat_id: 1,
    remitente_id: 102,
    texto: "¡Hola! Muy bien, ¿y tú?",
    fecha_envio: "2024-11-03T10:05:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 3,
    chat_id: 1,
    remitente_id: 101,
    texto: "Todo bien, gracias. ¿Qué tal tu día?",
    fecha_envio: "2024-11-03T10:10:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 4,
    chat_id: 1,
    remitente_id: 102,
    texto: "Bastante ocupado, pero bien. ¿Tienes algún plan para hoy?",
    fecha_envio: "2024-11-03T10:15:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 5,
    chat_id: 1,
    remitente_id: 101,
    texto: "Sí, planeo ir al cine más tarde. ¿Quieres venir?",
    fecha_envio: "2024-11-03T10:20:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 6,
    chat_id: 1,
    remitente_id: 101,
    texto: "¡Claro! Me encantaría. ¿A qué hora?",
    fecha_envio: "2024-11-03T10:25:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 7,
    chat_id: 1,
    remitente_id: 101,
    texto: "A las 7 p.m. Nos vemos en la entrada.",
    fecha_envio: "2024-11-04T10:30:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 9,
    chat_id: 1,
    remitente_id: 102,
    texto: "Perfecto, allí estaré. ¡Nos vemos!",
    fecha_envio: "2024-11-04T10:35:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 10,
    chat_id: 1,
    remitente_id: 102,
    texto: "Perfecto, allí estaré. ¡Nos vemos!",
    fecha_envio: "2024-11-04T10:35:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 11,
    chat_id: 1,
    remitente_id: 102,
    texto: "Perfecto, allí estaré. ¡Nos vemos!",
    fecha_envio: "2024-11-05T10:35:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 12,
    chat_id: 1,
    remitente_id: 102,
    texto: "Perfecto, allí estaré. ¡Nos vemos!",
    fecha_envio: "2024-11-05T10:35:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 13,
    chat_id: 1,
    remitente_id: 102,
    texto: "Perfecto, allí estaré. ¡Nos vemos!",
    fecha_envio: "2024-11-06T10:35:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
  {
    id: 14,
    chat_id: 1,
    remitente_id: 101,
    texto: "Perfecto, allí estaré. ¡Nos vemos!",
    fecha_envio: "2024-11-07T10:35:00Z",
    temporal: false,
    fecha_expiracion: "",
  },
]);
</script>

<style>

</style>