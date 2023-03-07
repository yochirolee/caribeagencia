import { createSlice } from "@reduxjs/toolkit";

const adminList = ["yleecruz@gmail.com", "barroso@ctenvios.com"];

export const AuthSlice = createSlice({
	name: "Auth",
	initialState: {
		user: {},
		errorMessage: null,
	},
	reducers: {
		login: (state, action) => {
			console.log(action.payload, "USERS");
			state.user = action.payload;
			adminList.find((email) => email == state.user.email)
				? (state.user.isAdmin = true)
				: (state.user.isAdmin = false);
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
