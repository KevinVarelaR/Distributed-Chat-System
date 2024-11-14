import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_MULTIMEDIA || "";

const supabase = createClient(supabaseUrl, supabaseKey);


interface Contactos {
  id: number;
  nombre: string;
}


export default defineEventHandler(async (event) => {
  

  const currentUser = await readBody(event);

  const { data, error } = await supabase
    .from("usuarios")
    .select("*");

  return data || [];

});
