import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_MULTIMEDIA || "";

const supabase = createClient(supabaseUrl, supabaseKey);

interface Message {
  id: number;
  chat_id: number;
  remitente_id: number;
  texto: string;
  fecha_envio: string;
  temporal: boolean;
  fecha_expiracion: string;
  multimedia : boolean;
}

function getURL(texto: string) {

  const { data } = supabase.storage
    .from("multimedia")
    .getPublicUrl(`${texto}`);
  return data.publicUrl;

}

async function createChatId(chat_id: number, remitente_id: number) {

  
  const { data, error } = await supabase.from("chats").insert([
    {
      usuario1_id: chat_id,
      usuario2_id: remitente_id,
    },
  ]);


  return {data, error};
}

async function sendMessage(message: Message) {
  const { data, error } = await supabase.from("mensajes").insert([
    {
      chat_id: message.chat_id,
      remitente_id: message.remitente_id,
      texto: message.texto,
      temporal: message.temporal,
      fecha_expiracion: message.fecha_expiracion,
      multimedia: message.multimedia,
    },
  ]);

  return {data, error};
}


export default defineEventHandler(async (event) => {
  const message: Message = await readBody(event);

  if (message.multimedia) {
    message.texto = getURL(message.texto);
  }
  
  const response = await sendMessage(message);
  if (response.error) {
    createChatId(message.chat_id, message.remitente_id);
    
    sendMessage(message);
  }
  return response.data || [];
});
