import { createSlice } from "@reduxjs/toolkit";
export const OrdersSlice = createSlice({
	name: "Orders",

	initialState: {
		isLoading: false,
		allOrders: [],
		currentOrder: {
			customer: {},
			reciever: {},
			products: [],
		},
	},

	reducers: {
		createOrder: (state /*action*/) => {
			state.value += 1;
		},
		editOrder: (state, action) => {},
		deleteOrder: (state, action) => {},
		getAllOrders: (state, action) => {},

		editCustomerCurrentOrder: (state, action) => {
			console.log(action, "FROM REDUCER");
			state.currentOrder.customer = { ...action.payload };
		},
		editRecieverCurrentOrder: (state, action) => {
			console.log(action, "FROM REDUCER");
			state.currentOrder.reciever = { ...action.payload };
		},
		addProductsToCurrentOrder: (state, action) => {
			console.log(action.payload);
			state.currentOrder.products = action.payload;
		},
	},
});

export const {
	createOrder,
	editOrder,
	deleteOrder,
	editCustomerCurrentOrder,
	editRecieverCurrentOrder,
	addProductsToCurrentOrder,
} = OrdersSlice.actions;
