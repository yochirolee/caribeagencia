import { db_CreateProduct, db_getProducts } from "../../../../Supabase/Products_db/Products_db";
import { createProduct, setProducts } from "../../Slices/Products/ProductsSlice";
//CREATE NEW PRODUCT

export const productThunks_createProduct = (product) => {
	return async (dispatch) => {
		try {
			const result = await db_CreateProduct(product);
			dispatch(createProduct(product));
		} catch (error) {
			console.log(error);
		}
	};
};

//GET ALLPRODCUTS
export const productThunks_getProducts = () => {
	return async (dispatch) => {
		try {
			const products = await db_getProducts();
			dispatch(setProducts(products))
		} catch (error) {
			console.log(error);
		}
	};
};
