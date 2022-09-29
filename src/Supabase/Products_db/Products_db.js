import { supabase } from "../../Supabase/SupabaseClient";

//Get All Products
export const db_getProducts = async () => {
	const { data: products, error } = await supabase.from("Products");
	if (error) {
		console.log(error.message, "eeror");
	}
	console.log(products, "FROM DATABASE");
	return products;
};

//Create a new product
export const db_CreateProduct = async (product) => {
	const { data, error } = await supabase.from("Products").insert([product]);
	if (error) {
		console.log(error.message, "eeror");
	}
	return data;
};
//Create a new product
export const db_getProductsByType = async (type) => {
	const { data, error } = await supabase.from("Products").select("*").eq("product_type", type);
	console.log(data,type,"FROM DB")
	if (error) {
		console.log(error.message, "eeror");
	}
	return data;
};
