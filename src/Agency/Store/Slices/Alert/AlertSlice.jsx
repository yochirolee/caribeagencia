import { createSlice } from "@reduxjs/toolkit";
export const AlertSlice = createSlice({
	name: "Alert",
	initialState: {
		text: "",
		type: "",
	},
	reducers: {
		setAlert: (state, action) => {
			state.text = action.payload.text;
			state.type = action.payload.type;
		
		},
	},
});

export const { setAlert } = AlertSlice.actions;
