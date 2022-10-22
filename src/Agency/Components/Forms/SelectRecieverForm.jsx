import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecieverInOrder } from "../../Store/Slices/Orders/OrdersSlice";
import { action_findRecieverByCustomerId } from "../../Store/Slices/Recievers/RecieversActions";
import { setCurrentReciever } from "../../Store/Slices/Recievers/RecieversSlices";

export const SelectRecieverForm = () => {
	const { currentOrder, isLoading } = useSelector((state) => state.OrdersSlice);
	const { customer, recieversList } = currentOrder;

	const dispatch = useDispatch();

	const handleOnSelect = (e) => {
		const selectedReciever = recieversList.find(
			(reciever) => reciever.RecieverId == e.target.value,
		);
		dispatch(setRecieverInOrder(selectedReciever));
	};
	return (
		<>
			<select
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				onChange={(e) => handleOnSelect(e)}
			>
				<option>Seleccione un Destinatario</option>
				{recieversList.map((reciever) => (
					<option key={reciever.RecieverId} value={reciever.RecieverId}>
						{reciever.FirstName + " " + reciever.LastName}
					</option>
				))}
			</select>
		</>
	);
};
