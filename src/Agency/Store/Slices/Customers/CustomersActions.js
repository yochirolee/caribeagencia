import { setCustomers } from "./CustomersSlices";
import { supabase } from "../../../../Supabase/SupabaseClient";
import { setCustomerInOrder, setIsLoading } from "../Orders/OrdersSlice";

export const action_getCustomers = () => {
	return async (dispatch) => {
		try {
			dispatch(isLoading);
			let { data: customers, error } = await supabase.from("customers").select("*");

			if (customers) {
				dispatch(setCustomers(customers));
			}
			dispatch(isLoading);
		} catch (error) {
			console.log(error);
		}
	};
};
export const action_SearchCustomer = (search) => {
	return async (dispatch) => {
		try {
			if (search.length < 8) return;
			dispatch(setIsLoading(true));
			const { data, error } = await supabase.from("customers").select("*").eq("Mobile", search);
			let customer = {};
			if (data?.length > 0) {
				customer = data[0];
			} else {
				customer = {
					FirstName: "",
					LastName: "",
					Email: "",
					Document: null,
					DocumentType: "",
					Phone: null,
					Mobile: null,
					Address: "",
				};
			}
			dispatch(setIsLoading(false));
			dispatch(setCustomerInOrder(customer));

			if (error) throw error;
		} catch (error) {
			console.error(error);
		}
	};
};

export const action_createCustomer = (customer) => {
	return async (dispatch) => {
		try {
			dispatch(setIsLoading(true));
			const { data: newCustomer, error } = await supabase
				.from("customers")
				.upsert(customer)
				.single();
			dispatch(setCustomerInOrder(newCustomer));
			dispatch(setIsLoading(false));
			throw error;
		} catch (error) {
			console.log(error);
		}
	};
};
