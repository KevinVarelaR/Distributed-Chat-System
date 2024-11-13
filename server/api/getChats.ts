import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

interface chat {
    user_id: number;
    bot_id: number;
}



export default defineEventHandler(async (event) => {
    const chat: chat = await readBody(event);
    console.log("ids",chat.user_id, chat.bot_id);
    const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("usuario1_id", chat.user_id)
        .eq("usuario2_id", chat.bot_id);

    console.log("Chats", data);
    if (data?.length == 0) {
        const id = Math.floor(Math.random() * 1000);
        {
            const { data, error } = await supabase.from("chats").insert([
                {
                    //como hacer que el id sea autoincremental
                    id:  id,
                    usuario1_id: chat.user_id,
                    usuario2_id: chat.bot_id,
                },
            ]);
            console.log("Chat id creado ", id);
            return id || [];
        }
    }else{
        //Quiero retornar el id del chat que se encontro
        if (data) {
            console.log("Chat id encontrado ", data[0].id);
            return data[0].id;
        } else {
            return [];
        }
    }
});