import { createSlice } from "@reduxjs/toolkit";
export const OrdersSlice = createSlice({
	name: "Orders",

	initialState: {
		isLoadingOrders: false,
		allOrders: [],
		currentOrder: {
			order_type: "",
			customer: {},
			reciever: {},
			products: [],
			service: "",
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
			state.currentOrder.customer = { ...action.payload };
		},
		editRecieverCurrentOrder: (state, action) => {
			state.currentOrder.reciever = { ...action.payload };
		},
		addOrderTypeToCurrentOrder: (state, action) => {
			state.currentOrder.order_type = action.payload;
		},
		addProductsToCurrentOrder: (state, action) => {
			state.currentOrder.products = action.payload;
		},
		addServiceToCurrentOrder: (state, action) => {
			state.currentOrder.service = action.payload;
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
	addServiceToCurrentOrder,
	addOrderTypeToCurrentOrder
} = OrdersSlice.actions;
