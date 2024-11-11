import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const { username, userID } = await readBody(event);

  const { data, error } = await supabase.from("usuarios").select().eq("nombre", username ).eq("id", userID);

  if (data) {
    return new Response(JSON.stringify(data), { status: 200 });
  }

  if (error) {
    return new Response(error.message, { status: 500 });
  }

})
