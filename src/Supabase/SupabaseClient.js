import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dopbreaqhfyubszhcnts.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzM3NDk2NywiZXhwIjoxOTMyOTUwOTY3fQ.CoSTaiKBObCbZMLhFIQDtFwlPz-zwvxUOJjHt5TcrRQ";
export const supabase = createClient(supabaseUrl, supabaseKey);
