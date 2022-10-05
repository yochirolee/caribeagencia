import {
	dbCustomersPaginatedList,
	db_Get_Customer_By_Mobile,
} from "../../../../Supabase/Customers_db/Customers_db";
import { getCustomers, isLoading, setCurrentCustomer } from "./CustomersSlices";

export const thunks_getCustomerByMobile = (mobile) => {
	return async (dispatch) => {
		try {
			const customer = await db_Get_Customer_By_Mobile(mobile);
			if (customer) dispatch(setCurrentCustomer(customer));
		} catch (error) {
			console.log(error);
		}
	};
};

export const thunks_getCustomersPaginated = () => {
	return async (dispatch) => {
		try {
			dispatch(isLoading);
			const customers = await dbCustomersPaginatedList();
			
			if (customers) {
				dispatch(getCustomers(customers));
			}
			dispatch(isLoading);
		} catch (error) {
			console.log(error);
		}
	};
};
