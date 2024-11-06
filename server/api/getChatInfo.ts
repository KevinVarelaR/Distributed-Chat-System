
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


  const chat_id = await readBody(event);
  console.log("Chat ID", chat_id.id);

  const { data, error } = await supabase
    .from("mensajes")
    .select("*")
    .eq("chat_id", chat_id.id)
    .order("fecha_envio", { ascending: true });


  console.log("Messages", data);
  return data || [];


});
