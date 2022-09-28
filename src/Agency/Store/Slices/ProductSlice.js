import { createSlice } from "@reduxjs/toolkit";
export const ProductSlice = createSlice({
	name: "Product",
	initialState: {
		productList: [],
	},
	reducers: {
		addProduct: (state, action) => {
			console.log("Adicionando Producto", action.payload);
			state.productList.push(action.payload);
		},
	},
});

export const { addProduct } = ProductSlice.actions;
