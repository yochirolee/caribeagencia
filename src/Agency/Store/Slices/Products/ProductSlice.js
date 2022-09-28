import { createSlice } from "@reduxjs/toolkit";
export const ProductSlice = createSlice({
	name: "Product",
	initialState: {
		productList: [],
		totalWeight: 0,
		totalProducts: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			console.log("Adicionando Producto", action.payload);
			state.productList.push(action.payload);
			let weight = 0;
			let total = 0;

			state.productList.map((product) => {
				weight += parseFloat(product.product_weight * product.product_quantity);
				total += parseInt(product.product_quantity);
			}),
				(state.totalWeight = weight);
			state.totalProducts = total;
		},
	},
});

export const { addProduct } = ProductSlice.actions;
