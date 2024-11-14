import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

interface Message {
  id: number;
  chat_id: number;
  remitente_id: number;
  texto: string;
  fecha_envio: string;
  temporal: boolean;
  fecha_expiracion: string;
}

export default defineEventHandler(async (event) => {
  const message: Message = await readBody(event);


  const { data, error } = await supabase.from("mensajes").insert([
    {
      chat_id: message.chat_id,
      remitente_id: message.remitente_id,
      texto: message.texto,
      temporal: message.temporal,
      fecha_expiracion: message.fecha_expiracion,
    },
  ]);
  console.log("Messages", data);
  return data || [];
});