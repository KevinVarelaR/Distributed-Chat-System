import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const { username, userID } = await readBody(event);

  const { data, error } = await supabase.from("usuarios").insert([{ nombre: username }]);

  if (error) {
    console.error("Error creating user", error);
    return { error: "Error creating user" };
  }

  return { data: "User created successfully" };

})
