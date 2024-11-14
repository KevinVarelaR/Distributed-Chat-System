import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

async function getContactName(userid: number) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("nombre")
    .eq("id", userid);
  return data && data[0] ? data[0].nombre : "Desconocido";
}

interface Chat {
  id: number;
  username: string;
}

export default defineEventHandler(async (event) => {
  console.log("Refreshing messages");

  const currentUser: Chat = await readBody(event);





  const messages: Chat[] = [];

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .or(`usuario1_id.eq.${currentUser.id},usuario2_id.eq.${currentUser.id}`);

  for (const chat of data || []) {
    const otherUser = chat.usuario1_id === currentUser.id ? chat.usuario2_id : chat.usuario1_id;
    const username = await getContactName(otherUser);
    messages.push({ id: chat.id, username });
  }



  return messages;


});
