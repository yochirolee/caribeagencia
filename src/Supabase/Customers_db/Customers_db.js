import { supabase } from "../../Supabase/SupabaseClient";

//GET ALL CUSTOMERS

export const db_GetCustomers = async () => {
	const { data, error } = await supabase.from("Customers_duplicate").select("*");
	console.log(data, error, "SUPABASE");
	if (error) {
		console.log(error.message);
	}
	return { data, error };
};

//CREATE NEW CUSTOMER

export const db_CreateCustomer = async (customer) => {
	const { data, error } = await supabase.from("Customers_duplicate").insert([customer]);
	if (error) {
		console.log(error.message);
	}
	return data;
};
