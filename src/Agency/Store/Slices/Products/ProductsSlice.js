import { createSlice } from "@reduxjs/toolkit";
export const ProductsSlice = createSlice({
	name: "Product",
	initialState: {
		products: [],
		isLoading: false,
	},
	reducers: {
		createProduct: (state, action) => {
			state.products.push(action.payload);
		},
		setIsLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const { createProduct, setIsLoading, setProducts } = ProductsSlice.actions;
