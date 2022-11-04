import { configureStore } from "@reduxjs/toolkit";
import { CategoriesSlice } from "./Slices/Categories/CategoriesSlice";
import { CustomersSlice } from "./Slices/Customers/CustomersSlices";
import { OrdersSlice } from "./Slices/Orders/OrdersSlice";
import { ProductsSlice } from "./Slices/Products/ProductsSlice";
import { RecieversSlice } from "./Slices/Recievers/RecieversSlices";
import { uiSlice } from "./Slices/Ui/uiSlice";
import { UserSlice } from "./Slices/Users/UserSlice";

export const store = configureStore({
	reducer: {
		OrdersSlice: OrdersSlice.reducer,
		ProductsSlice: ProductsSlice.reducer,
		CustomersSlice: CustomersSlice.reducer,
		RecieversSlice: RecieversSlice.reducer,
		CategoriesSlice: CategoriesSlice.reducer,
		uiSlice: uiSlice.reducer,
		UserSlice: UserSlice.reducer,
	},
});
