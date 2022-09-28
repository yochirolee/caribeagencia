import { supabase } from "../../Supabase/SupabaseClient";

export const getCustomers = async () => {
	const { data, error } = await supabase.from("Customers").select("*");
	console.log(data,error,"SUPABASE")
	return { data, error };
};
