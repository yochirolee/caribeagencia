import { supabase } from "../../../../Supabase/SupabaseClient";
import { setRecieverInOrder, setRecieversList } from "../Orders/OrdersSlice";

export const action_createReciever = (reciever) => {
	return async (dispatch) => {
		try {
			console.log(reciever,'ACTION CREATE RECIEEVER')
			let { data: newReciever, error } = await supabase.from("recievers").upsert(reciever).single();
			dispatch(setRecieverInOrder(newReciever));
			if (error) throw error;
		} catch (error) {
			console.error(error);
		}
	};
};

export const action_findRecieverByCustomerId = (customerId) => {
	console.log(customerId, "CUSTOMER ID FOR FIND");
	return async (dispatch) => {
		try {
			let { data: recieversList, error } = await supabase
				.from("recievers")
				.select("*")
				.eq('CustomerId', customerId);
             console.log(recieversList,"RECOEVER LIST")
			dispatch(setRecieversList(recieversList));
			if (error) throw error;
		} catch (error) {
			console.error(error);
		}
	};
};
