import { React } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { action_SearchCustomer } from "../../Store/Slices/Customers/CustomersActions";

export const CustomerSearchForm = () => {
	const dispatch = useDispatch();
	let { isLoading } = useSelector((state) => state.OrdersSlice);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data, e) => {
		e.preventDefault();
		dispatch(action_SearchCustomer(data.search));
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="my-2 md:w-1/2 mx-auto">
			<label
				htmlFor="default-search"
				className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
			>
				Buscar Cliente
			</label>
			<div className="relative">
				<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
					<i className="fas fa-search text-gray-500/60" />
				</div>
				<input
					type="search"
					id="search"
					className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Buscar Cliente "
					{...register("search")}
				></input>
				<button
					disabled={isLoading}
					type="submit"
					className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					{isLoading ? "Buscando" : "Buscar"}
				</button>
			</div>
		</form>
	);
};
