import { React } from "react";
import { useForm } from "react-hook-form";

export const ContainerUngroup = ({ productsRecieved, productsFails, handleUnGroup }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (HBL) => {
		handleUnGroup(HBL);
		reset();
	};

	console.log(productsRecieved, productsFails);
	return (
		<>
			<div className="mt-5 border rounded-lg p-4">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col lg:flex-row gap-2 items-center"
				>
					<label className="text-xs">Ingrese HBL</label>
					<input {...register("HBL")} type="text" className="rounded-lg "></input>

					<div className="flex  gap-2">
						<button
							type="submit"
							className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Adicionar
						</button>
						<button className="border rounded-lg">
							<i className="fa fa-camera text-blue-500 text-lg p-1.5 px-2"></i>
						</button>
					</div>
				</form>
			</div>
			<div className="border rounded-lg my-4">
				<div>
					<div className="my-4 p-4 flex gap-4">
						<button
							type="button"
							className="inline-flex gap-2 relative items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							<i className="fa fa-check"></i>
							<span className="">Correctos</span>
							<div className="inline-flex  justify-center items-center p-1 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
								{productsRecieved ? productsRecieved.length : 0}
							</div>
						</button>
						<button
							type="button"
							className="inline-flex gap-2 relative items-center p-3 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							<i className="fa fa-close"></i>
							<span className="">Faltantes</span>
							<div className="inline-flex  justify-center items-center p-1 text-xs font-bold text-white bg- rounded-full border-2 border-white dark:border-gray-900">
								{productsFails ? productsFails : 0}
							</div>
						</button>
					</div>
					{productsRecieved?.map((product) => (
						<div className="p-2 text-xs">
							{product?.HBL} {product?.Description}
						</div>
					))}
				</div>
			</div>
		</>
	);
};
