import { createSlice } from "@reduxjs/toolkit";
export const RecieversSlice = createSlice({
	name: "RecieversSlice",
	initialState: {
		isLoading: false,
		recievers: [],
		recieversByCustomer: [],
		currentReciever: {},
	},
	reducers: {
		isLoading: (state /*action*/) => {
			state.isLoading = !state.isLoading;
		},

		getRecievers: (state, action) => {
			state.recievers = action.payload;
		},
		setCurrentReciever: (state, action) => {
			state.currentReciever = action.payload;
		},

		setRecieversByCustomer: (state, action) => {
			state.recieversByCustomer = action.payload;
		},
	},
});

export const { isLoading, getRecievers, setCurrentReciever, setRecieversByCustomer } =
	RecieversSlice.actions;
