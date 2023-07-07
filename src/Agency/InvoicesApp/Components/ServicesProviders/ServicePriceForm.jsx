import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../../Hooks/QueryKeys/queryKeys";

const postServicePrice = async (servicePrice) => {
	console.log(servicePrice, "servicePrice");
	const { data } = await axios.post("http://localhost:3001/api/v1/servicesPrices", servicePrice);
	return data;
};

const updateServicePrice = async (servicePrice) => {
	console.log(servicePrice, "servicePrice");
	if (!servicePrice) throw new Error({ message: "Por Favor ingrese los datos" });
	const { data } = await axios.put(
		`http://localhost:3001/api/v1/servicesPrices/${servicePrice.id}`,
		servicePrice,
	);
	return data;
};

export default function ServicePriceForm({
	setIsOpen,
	selectedAgency,
	selectedService,
	servicePrice,
	isEditing = false,
}) {
	if (!selectedAgency) return null;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const queryClient = useQueryClient();
	const createServicePriceMutation = useMutation({
		mutationFn: (servicePrice) => postServicePrice(servicePrice),
		onSuccess: () => {
			queryClient.invalidateQueries(queryKeys.fetchServicesByAgency);
			setIsOpen(false);
		},
	});

	const updateServicePriceMutation = useMutation({
		mutationFn: (servicePrice) => updateServicePrice(servicePrice),
		onSuccess: () => {
			queryClient.invalidateQueries(queryKeys.fetchServicesByAgency);
			if (!updateServicePriceMutation.isError) setIsOpen(false);
		},
	});

	const onSubmit = (data) => {
		data.serviceId = selectedService.id;
		data.agencyId = selectedAgency.id;
		data.buyPrice = parseFloat(data.buyPrice);
		data.sellPrice = parseFloat(data.sellPrice);

		isEditing ? updateServicePriceMutation.mutate(data) : createServicePriceMutation.mutate(data);
	};

	useEffect(() => {
		if (isEditing) {
			reset({
				id: servicePrice.id,
				name: servicePrice.name,
				description: servicePrice.description,
				buyPrice: servicePrice.buyPrice,
				sellPrice: servicePrice.sellPrice,
				isSellByPounds: servicePrice.isSellByPounds,
			});
		}
	}, [isEditing, reset, selectedService]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{createServicePriceMutation.isError ? (
				<div className="text-bold text-red-500">{createServicePriceMutation.error.message}</div>
			) : (
				""
			)}
			<div className=" ">
				<div className="border-b border-gray-900/10 pb-12">
					<h1 className="bg-gray-800 text-white rounded p-2">
						Crear Tarifa para: {selectedService.name}
						<b className="px-4">{selectedAgency.name}</b>
					</h1>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
								Nombre de Tarifa
							</label>
							<div className="mt-2">
								<input
									{...register("name", { required: "El Nombre es Requerido" })}
									type="text"
									name="name"
									id="name"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.name && <p className="text-xs text-red-500 ">{errors.name?.message}</p>}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="description"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Descripcion de la Tarifa
							</label>
							<div className="mt-2">
								<input
									{...register("description", { required: "La description es Requeridos" })}
									type="text"
									name="description"
									id="description"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.description && (
									<p className="text-xs text-red-500 ">{errors.description?.message}</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="providerName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Precio de Compra
							</label>
							<div className="mt-2">
								<input
									{...register("buyPrice", { required: "El Precio de Compra es Requerido" })}
									type="number"
									name="buyPrice"
									id="buyPrice"
									step="any"
									autoComplete="given-buyPrice"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.buyPrice && (
									<p className="text-xs text-red-500 ">{errors.buyPrice?.message}</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="providerName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Precio de Venta
							</label>
							<div className="mt-2">
								<input
									{...register("sellPrice", { required: "El Precio de Venta es Requerido" })}
									type="number"
									name="sellPrice"
									id="sellPrice"
									step="any"
									autoComplete="given-sellPrice"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.buyPrice && (
									<p className="text-xs text-red-500 ">{errors.sellPrice?.message}</p>
								)}
							</div>
						</div>
						<div className="sm:col-span-3">
							
							<div class="flex items-center">
								<input
									{...register("isSellByPounds")}
									
									id="checked-checkbox"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label
									for="checked-checkbox"
									className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Seleccione si quiere aplicar la tarifa por libras
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					onClick={() => setIsOpen(false)}
					type="button"
					className="text-sm font-semibold leading-6 text-gray-900"
				>
					Cancel
				</button>

				<button
					type="submit"
					disabled={createServicePriceMutation.isLoading || updateServicePriceMutation.isLoading}
					className="rounded-md bg-blue-600 w-32 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					{createServicePriceMutation.isLoading || updateServicePriceMutation.isLoading ? (
						<EllipsisHorizontalIcon className="animate-pulse mx-auto h-5 w-5 text-white " />
					) : (
						"Guardar"
					)}
				</button>
			</div>
		</form>
	);
}
