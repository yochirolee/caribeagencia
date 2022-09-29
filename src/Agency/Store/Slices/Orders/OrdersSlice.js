import { createSlice } from "@reduxjs/toolkit";
export const OrdersSlice = createSlice({
	name: "Orders",

	initialState: {
		isLoadingOrders: false,
		allOrders: [],
		selectedProduct: {},
		currentOrder: {
			order_type: "",
			customer: {},
			reciever: {},
			products: [],
			service: "",
			weight: 0,
			count: 0,
		},
	},

	reducers: {
		createOrder: (state /*action*/) => {},
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

		addServiceToCurrentOrder: (state, action) => {
			state.currentOrder.service = action.payload;
		},
		addProductToCurrentOrder: (state, action) => {
			state.currentOrder.products.push(action.payload);

			let weight = 0;
			let count = 0;
			state.currentOrder.products.map((product) => {
				weight += parseFloat(product.product_weight * product.product_quantity);
				count += parseInt(product.product_quantity);
			}),
				(state.currentOrder.weight = weight);
			state.currentOrder.count = count;
		},

		changeSelectedProdcut: (state, action) => {
			state.selectedProduct = action.payload;
		},
	},
});

export const {
	createOrder,
	editOrder,
	deleteOrder,
	editCustomerCurrentOrder,
	editRecieverCurrentOrder,
	addServiceToCurrentOrder,
	addOrderTypeToCurrentOrder,
	addProductToCurrentOrder,
	changeSelectedProduct,
} = OrdersSlice.actions;
