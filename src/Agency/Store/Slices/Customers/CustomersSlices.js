import { createSlice } from "@reduxjs/toolkit";
export const CustomersSlice = createSlice({
	name: "CustomersSlice",
	initialState: {
		isLoading: false,
		customers: [],
		currentCustomer: {},
	},
	reducers: {
		isLoading: (state /*action*/) => {
			state.isLoading = !state.isLoading;
		},

		getCustomers: (state, action) => {
			state.customers = action.payload;
		},
		setCurrentCustomer: (state, action) => {
			
			state.currentCustomer = action.payload;
		},
	},
});

export const { isLoading, getCustomers, setCurrentCustomer } = CustomersSlice.actions;
