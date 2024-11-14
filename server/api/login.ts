import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

interface User {
  nombre: string;
}


export default defineEventHandler(async (event) => {
  

  const user: User = await readBody(event);

  console.log("SERERERERE",user);



  const { data, error } = await supabase.from("usuarios").select("*").eq("nombre", user.nombre);

  console.log("DATA",data);
  
  if ((data ?? []).length > 0) {
    return {
      statusCode:200,
      body: data
    };
  }
  return {
    statusCode: 400,
    body: data
    };
});
