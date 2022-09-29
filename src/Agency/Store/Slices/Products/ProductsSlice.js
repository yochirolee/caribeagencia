import { createSlice } from "@reduxjs/toolkit";
export const ProductsSlice = createSlice({
	name: "Product",
	initialState: {
		products: [],
	},
	reducers: {
		createProduct: (state, action) => {
			state.products.push(action.payload);
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const { createProduct, setProducts } = ProductsSlice.actions;
