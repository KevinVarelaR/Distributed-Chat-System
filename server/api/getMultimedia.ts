import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_MULTIMEDIA || "";

const supabase = createClient(supabaseUrl, supabaseKey);


async function testing() {

  const { data, error } = await supabase.from("mensajes").select("*");

  console.log("multimedia", data);
}


export default defineEventHandler(async (event) => {


  //testing();

  const { data, error } = await supabase.storage.from("multimedia").list();
  
  //const {data, error} = await supabase.storage.from("multimedia").upload("test.jpg", new Blob(["test"]));

  console.log("multimedia", data);
  console.log("error", error);

  return data;
});
