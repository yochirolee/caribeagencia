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
			state.value += 1;
		},
		getCustomers: (state, action) => {
			state.value += action.payload;
		},
		setCurrentCustomer: (state, action) => {
			state.currentCustomer = action.payload;
		},
	},
});

export const { isLoading, getCustomers, setCurrentCustomer } = CustomersSlice.actions;
