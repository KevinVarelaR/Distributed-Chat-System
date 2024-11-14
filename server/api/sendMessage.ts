import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY || "", "hex"); 

const supabase = createClient(supabaseUrl, supabaseKey);

interface Message {
  id: number;
  chat_id: number;
  remitente_id: number;
  texto: string;
  fecha_envio: string;
  temporal: boolean;
  fecha_expiracion: string;
  multimedia: boolean;
}


function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-ctr", encryptionKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

function getURL(chat_id: number, texto: string) {
  const { data } = supabase.storage.from("multimedia").getPublicUrl(`${texto}`);
  return data.publicUrl;
}

export default defineEventHandler(async (event) => {
  const message: Message = await readBody(event);

  if (message.multimedia) {
    message.texto = getURL(message.chat_id, message.texto);
  } else {
    message.texto = encrypt(message.texto); 
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

  if (error) {
    console.error("Error inserting message:", error);
    return { error: error.message };
  }

  return data || [];
});
