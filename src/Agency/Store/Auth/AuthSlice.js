import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
	name: "Auth",
	initialState: {
		user: {},
		errorMessage: null,
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
			state.errorMessage = "null";
		},
		logout: (state, action) => {
			state.user = {};
			state.errorMessage = "";
		},

		checkingCredentials: (state) => {
			state.status = "checking";
		},
	},
});

export const { login, logout, checkingCredentials } = AuthSlice.actions;
