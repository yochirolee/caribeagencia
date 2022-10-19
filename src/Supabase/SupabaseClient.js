import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xwdaqnzkckvnekcbtyra.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZGFxbnprY2t2bmVrY2J0eXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwNTEyMDQsImV4cCI6MTk4MTYyNzIwNH0.eq-_nhxoF9yNtRR77S8YUoegw8QItpn9Js0SVPYTCoc";
export const supabase = createClient(supabaseUrl, supabaseKey);
