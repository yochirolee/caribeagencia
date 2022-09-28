import { configureStore } from "@reduxjs/toolkit";
import { OrdersSlice } from "./Slices/Orders/OrdersSlice";
import { ProductSlice } from "./Slices/ProductSlice";

export const store = configureStore({
	reducer: {
		OrdersSlice: OrdersSlice.reducer,
		ProductSlice:ProductSlice.reducer
	},
});
