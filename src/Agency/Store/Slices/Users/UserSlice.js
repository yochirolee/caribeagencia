import { createSlice } from "@reduxjs/toolkit";
export const UserSlice = createSlice({
	name: "user",
	initialState: {
		user: {},
	},
	reducers: {
		setUser: (state, action) => {
			console.log(action.payload);
			state.user = action.payload;
		},
	},
});

export const { setUser } = UserSlice.actions;
