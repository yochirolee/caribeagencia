import { React } from "react";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addServiceToCurrentOrder } from "../../Store/Slices/Orders/OrdersSlice";

export const ServiceForm = ({handleNextStep}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		console.log(data.service, "DATA");
		dispatch(addServiceToCurrentOrder(data.service));
		handleNextStep();
	};
	return (
		<div>
			<div>
				<h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
					Seleccione el Servicio:
				</h3>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ul className="grid gap-6 w-full md:grid-cols-2">
					<li>
						<input
							type="radio"
							id="hosting-small"
							name="hosting"
							value="Palco Duradero"
							className="hidden peer"
							{...register("service", { required: true })}
						/>
						<label
							htmlFor="hosting-small"
							className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
						>
							<div className="block">
								<div className="w-full">Palco Duradero</div>
							</div>
							<svg
								aria-hidden="true"
								className="ml-3 w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</label>
					</li>
					<li>
						<input
							type="radio"
							id="hosting-big"
							name="hosting"
							className="hidden peer"
							value="Transcargo"
							{...register("service", { required: true })}
						/>
						<label
							htmlFor="hosting-big"
							className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
						>
							<div className="block">
								<div className="w-full">Transcargo</div>
							</div>
							<svg
								aria-hidden="true"
								className="ml-3 w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</label>
					</li>
				</ul>
				<div className="flex justify-end border-t my-2 p-2 border-dashed">
					<Button type="submit" color="warning">
						Facturar
					</Button>
				</div>
			</form>
		</div>
	);
};
