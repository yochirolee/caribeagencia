import { createSlice } from "@reduxjs/toolkit";
export const CategoriesSlice = createSlice({
	name: "Categories",
	initialState: {
		categories: [],
		selectedCategory: "",
		isLoading: false,
	},
	reducers: {
		createCategory: (state, action) => {
			state.categories.push(action.payload);
		},
		setIsLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		setCategories: (state, action) => {
			state.categories = action.payload;
		},
		setSelectedCategory: (state, action) => {
			state.selectedCategory = action.payload;
		},
		deleteCategory: (state, action) => {
			state.categories = state.categories.filter(
				(category) => category.CategoryId !== action.payload,
			);
		},
	},
});

export const { createCategory, setIsLoading, setCategories, deleteCategory, setSelectedCategory } =
	CategoriesSlice.actions;
