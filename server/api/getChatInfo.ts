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


function decrypt(text: string): string {
  const [iv, encrypted] = text.split(":").map((x) => Buffer.from(x, "hex"));
  const decipher = crypto.createDecipheriv("aes-256-ctr", encryptionKey, iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString();
}

export default defineEventHandler(async (event) => {
  const chat_id = await readBody(event);
  console.log("Chat ID", chat_id.id);

  const { data, error } = await supabase
    .from("mensajes")
    .select("*")
    .eq("chat_id", chat_id.id)
    .order("fecha_envio", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  
  const decryptedData = data.map((message: Message) => ({
    ...message,
    texto: message.multimedia ? message.texto : decrypt(message.texto),
  }));

  return decryptedData || [];
});
