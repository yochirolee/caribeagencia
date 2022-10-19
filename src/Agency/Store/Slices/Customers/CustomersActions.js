import { getCustomers, isLoading, setCurrentCustomer } from "./CustomersSlices";
import { supabase } from "../../../../Supabase/SupabaseClient";
import { setRecieversByCustomer } from "../Recievers/RecieversSlices";

export const action_getCustomers = () => {
	return async (dispatch) => {
		try {
			dispatch(isLoading);
			let { data: customers, error } = await supabase.from("customers").select("*");

			if (customers) {
				dispatch(getCustomers(customers));
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
			dispatch(isLoading);
			const { data: customers, error } = await supabase
				.from("customers")
				.select("*")
				.eq("Mobile", search);

			if (customers.length > 0) {
				dispatch(setCurrentCustomer(customers[0]));
				const { data: recievers, error } = await supabase
					.from("recievers")
					.select("*")
					.eq("CustomerId", customers[0].CustomerId);
				dispatch(setRecieversByCustomer(recievers));
			}
			dispatch(isLoading);
		} catch (error) {
			console.log(error);
		}
	};
};
