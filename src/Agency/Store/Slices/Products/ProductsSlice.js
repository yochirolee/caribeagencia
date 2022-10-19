import { createSlice } from "@reduxjs/toolkit";
export const ProductsSlice = createSlice({
	name: "Product",
	initialState: {
		products: [],
		isLoading: false,
	},
	reducers: {
		createProduct: (state, action) => {
			console.log(action.payload, "payload");
			state.products.push(action.payload);
		},
		setIsLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		//TESTINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGggg
		updateProduct: (state, action) => {
			console.log(action.payload, "slices product update");
			state.products.map((product) => {
				if (product.ProductId == action.payload.ProductId) {
					return action.payload;
				}
				return product;
			});
		},

		deleteProduct: (state, action) => {
			state.products = state.products.filter((product) => product.ProductId !== action.payload);
		},
	},
});

export const { createProduct, setIsLoading, setProducts, updateProduct, deleteProduct } =
	ProductsSlice.actions;
