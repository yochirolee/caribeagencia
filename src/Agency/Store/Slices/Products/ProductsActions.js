import { supabase } from "../../../../Supabase/SupabaseClient";
import {
	createProduct,
	deleteProduct,
	setIsLoading,
	setProducts,
} from "../../Slices/Products/ProductsSlice";

//CREATE NEW PRODUCT

export const action_createProduct = (product) => {
	console.log(product, "from actions");
	return async (dispatch) => {
		try {
			const { data: newProduct, error } = await supabase.from("products").insert(product).single();

			dispatch(createProduct(newProduct));
		} catch (error) {
			console.log(error);
		}
	};
};

//GET PRODUCTS FILTER BY CATEGORY
export const action_getProductsByCategory = (categoryId) => {
	console.log(categoryId);
	return async (dispatch) => {
		try {
			if (categoryId) {
				dispatch(setIsLoading());
				const { data: products } = await supabase
					.from("products")
					.select("*")
					.eq("CategoryId", categoryId);
				dispatch(setProducts(products));
				dispatch(setIsLoading());
			}
		} catch (error) {
			console.log(error);
		}
	};
};
//GET ALLPRODCUTS
export const action_getProducts = () => {
	return async (dispatch) => {
		try {
			dispatch(setIsLoading());
			const { data: products } = await supabase.from("products").select("*");
			dispatch(setProducts(products));
			dispatch(setIsLoading());
		} catch (error) {
			console.log(error);
		}
	};
};

//EDIT PRODUCT TSTINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGgg
export const action_updateProduct = (id, productUpdate) => {
	return async (dispatch) => {
		try {
			const { data: product } = await supabase
				.from("products")
				.update(productUpdate)
				.eq("ProductId", id);
			dispatch(updateProduct(product));
		} catch (error) {}
	};
};

//DELETE PRODUCT
export const action_deleteProduct = (id) => {
	return async (dispatch) => {
		try {
			await supabase.from("products").delete().eq("ProductId", id);
			dispatch(deleteProduct(id));
		} catch (error) {}
	};
};
