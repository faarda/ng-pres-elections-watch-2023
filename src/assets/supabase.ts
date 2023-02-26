import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_DB_URL as string, process.env.REACT_APP_DB_KEY as string);

export default supabase;
