import { supabase } from "../../Supabase/SupabaseClient";

//GET ALL CUSTOMERS

export const db_GetCustomers = async () => {
	const { data, error } = await supabase.from("Customers").select("*");
	console.log(data, error, "SUPABASE");
	if (error) {
		console.log(error.message);
		console.log(asdf);
	}
	return { data, error };
};

//SEARCH CUSTOMER BY MOBILE

export const db_Get_Customer_By_Mobile = async (mobile) => {
	let { data: Customer, error } = await supabase
		.from("Customers")
		.select("*")
		.eq("customer_mobile", mobile);
	return Customer[0];
};

export const dbCustomersPaginatedList = async () => {
	let { data: customers, error } = await supabase.from("Customers").select("*").range(0, 20);
	return customers;
};

//CREATE NEW CUSTOMER

export const db_CreateCustomer = async (customer) => {
	const { data, error } = await supabase.from("Customers").insert([customer]);
	if (error) {
		console.log(error.message);
	}
	return data;
};
