import { configureStore } from "@reduxjs/toolkit";
import { CustomersSlice } from "./Slices/Customers/CustomersSlices";
import { OrdersSlice } from "./Slices/Orders/OrdersSlice";
import { ProductsSlice } from "./Slices/Products/ProductsSlice";

export const store = configureStore({
	reducer: {
		OrdersSlice: OrdersSlice.reducer,
		ProductsSlice:ProductsSlice.reducer,
		CustomersSlice: CustomersSlice.reducer
	},
});
