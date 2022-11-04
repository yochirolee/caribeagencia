import { supabase } from "../../../../Supabase/SupabaseClient";
import { setIsLoading, setOrders } from "./OrdersSlice";

//GET ALL Orders
export const action_getOrders = () => {
	return async (dispatch) => {
		try {
			dispatch(setIsLoading());
			//const { data:orders } = await supabase.from("orders").select('*');

			let { data: orders, error } = await supabase.from("orders").select(`
            OrderId,CreatedAt,
            customers:CustomerId(*),
            recievers:RecieverId (*),
            productsInOrders(*)
           
          `).limit(2);
			dispatch(setOrders(orders));
			dispatch(setIsLoading());
		} catch (error) {
			console.log(error, "SUPABASE");
		}
	};
};

export const action_createOrder = (newOrder) => {
	return async () => {
		try {
			const { customer, reciever, products } = newOrder;
			console.log(newOrder, "DATA ON ACATIONS");

			const { data: order, error } = await supabase
				.from("orders")
				.insert({
					CustomerId: customer.CustomerId,
					RecieverId: reciever.RecieverId,
				})
				.single();

			const dataInsert = await products.map((product) => {
				return {
					OrderId: order.OrderId,
					ProductName: product.ProductName,
				};
			});

			const { data, error: E } = await supabase.from("productsInOrders").insert([...dataInsert]);
		} catch (error) {
			console.log(error, "ERROR");
		}
	};
};
