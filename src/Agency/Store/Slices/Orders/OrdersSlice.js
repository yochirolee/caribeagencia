import { createSlice } from "@reduxjs/toolkit";

export const OrdersSlice = createSlice({
	name: "Orders",

	initialState: {
		isLoading: false,
		orders: [],
		selectedProduct: {},
		currentOrder: {
			type: "",
			customer: {},
			reciever: {},
			recieversList: [],
			products: [],
			service: "",
			weight: 0,
			count: 0,
		},
	},

	reducers: {
		setIsLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		createOrder: (state, action) => {
			state.orders.push(action.payload);
		},
		editOrder: (state, action) => {},
		deleteOrder: (state, action) => {},
		setOrders: (state, action) => {
			state.orders = action.payload;
		},

		setCustomerInOrder: (state, action) => {
			state.currentOrder.customer = { ...action.payload };
		},
		setRecieverInOrder: (state, action) => {
			state.currentOrder.reciever = { ...action.payload };
		},

		setRecieversList: (state, action) => {
			console.log(action.payload, "RECIEVERS LIST,SET RECIE");
			state.currentOrder.recieversList = action.payload;
		},
		addOrderTypeToCurrentOrder: (state, action) => {
			state.currentOrder.order_type = action.payload;
		},

		addServiceToCurrentOrder: (state, action) => {
			state.currentOrder.service = action.payload;
		},
		addProductToCurrentOrder: (state, action) => {
			state.currentOrder.products.push(action.payload);
		},

		changeSelectedProdcut: (state, action) => {
			state.selectedProduct = action.payload;
		},

		resetOrder: (state) => {
			(state.orders = []),
				(state.selectedProduct = {}),
				(state.currentOrder = {
					type: "",
					customer: {},
					reciever: {},
					products: [],
					recieversList: [],
					service: "",
					weight: 0,
					count: 0,
				});
		},
	},
});

export const {
	createOrder,
	setIsLoading,
	setOrders,
	editOrder,
	deleteOrder,
	setCustomerInOrder,
	setRecieverInOrder,
	setRecieversList,
	addServiceToCurrentOrder,
	addOrderTypeToCurrentOrder,
	addProductToCurrentOrder,
	changeSelectedProduct,
	resetOrder,
} = OrdersSlice.actions;
