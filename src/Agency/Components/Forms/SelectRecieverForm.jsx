import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentReciever } from "../../Store/Slices/Recievers/RecieversSlices";

export const SelectRecieverForm = () => {
	const { recieversByCustomer, isLoading } = useSelector((state) => state.RecieversSlice);

	const dispatch = useDispatch();

	const handleOnSelect = (e) => {
		console.log(recieversByCustomer);
		const selectedReciever = recieversByCustomer.find(
			(reciever) => reciever.RecieverId == e.target.value,
		);
		dispatch(setCurrentReciever(selectedReciever));
	};
	return (
		<>
			<select
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				onChange={(e) => handleOnSelect(e)}
			>
				<option>Seleccione un Destinatario</option>
				{recieversByCustomer.map((reciever) => (
					<option key={reciever.RecieverId} value={reciever.RecieverId}>
						{reciever.FirstName + " " + reciever.LastName}
					</option>
				))}
			</select>
		</>
	);
};
