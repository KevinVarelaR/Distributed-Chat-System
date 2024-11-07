import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);


async function testing() {

  const { data, error } = await supabase.from("mensajes").select("*");

  console.log("multimedia", data);
}


export default defineEventHandler(async (event) => {


  //testing();

  const { data, error } = await supabase.storage.from("multimedia").list();



  console.log("multimedia", data);
  console.log("error", error);

  return data;
});
