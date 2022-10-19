import { supabase } from "../../../../Supabase/SupabaseClient";
import {
	createCategory,
	deleteCategory,
	setCategories,
	setSelectedCategory,
} from "./CategoriesSlice";

export const action_createCategory = (category) => {
	return async (dispatch) => {
		try {
			const { data: newCategory, error } = await supabase.from("categories").insert(category);
			dispatch(createCategory(newCategory[0]));
		} catch (error) {
			console.log(error);
		}
	};
};

export const action_getCategories = () => {
	return async (dispatch) => {
		try {
			let { data: categories, error } = await supabase.from("categories").select("*");
			if (categories) {
				dispatch(setCategories(categories));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const action_DeleteCategory = (id) => {
	return async (dispatch) => {
		try {
			const { data: categoryDeleted, error } = await supabase
				.from("categories")
				.delete()
				.eq("CategoryId", id);
			dispatch(deleteCategory(id));

			return categoryDeleted;
		} catch (error) {
			console.log(error);
		}
	};
};
