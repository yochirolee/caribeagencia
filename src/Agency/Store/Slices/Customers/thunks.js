import { db_Get_Customer_By_Mobile } from "../../../../Supabase/Customers_db/Customers_db";
import { setCurrentCustomer } from "./CustomersSlices";

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
