import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_MULTIMEDIA || "";

const supabase = createClient(supabaseUrl, supabaseKey);




export default defineEventHandler(async (event) => {


  //testing();

  //const { data, error } = await supabase.storage.from("multimedia").list("1");
  
  

  const { data } =  supabase.storage
    .from("multimedia")
    .getPublicUrl("1/AmongUs.png");



  //console.log("error", error);

  return data;
});
