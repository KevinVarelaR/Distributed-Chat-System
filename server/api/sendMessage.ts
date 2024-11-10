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


export default defineEventHandler(async (event) => {
  const message: Message = await readBody(event);

  if (message.multimedia) {
    message.texto = getURL(message.texto);
  }
  
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

  return data || [];
});
