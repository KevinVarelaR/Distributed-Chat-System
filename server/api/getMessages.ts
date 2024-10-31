
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)


export default defineEventHandler(async (event) => {
  
  console.log('Refreshing messages')
  const userid = 2

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .or(`usuario1_id.eq.${userid},usuario2_id.eq.${userid}`);

  console.log(data)
  
  
  return 'Hello Nitro'
})
