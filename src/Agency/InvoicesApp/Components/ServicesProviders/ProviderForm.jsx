import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../../Hooks/QueryKeys/queryKeys";

const postServiceProvider = async (service) => {
	const { data } = await axios.post("http://localhost:3001/api/v1/servicesProviders/", service);
	return data;
};

const updateService = async (service) => {
	if (!service) throw new Error({ message: "Por Favor ingrese los datos" });
	const res = await fetch(
		"https://caribeagencia-backend.vercel.app/api/v1/services/" + service.id,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(service),
		},
	);

	if (!res.ok) {
		const error = await res.json();
		console.log(error, "error");
		const message = error.meta ? error?.meta?.target[0] : error.message;
		return message;
	}
	return await res.json();
};

export default function ProviderForm({ setIsOpen, isEditing = false }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const queryClient = useQueryClient();
	const createServiceMutation = useMutation({
		mutationFn: (newServiceProvider) => postServiceProvider(newServiceProvider),
		onSuccess: () => {
			queryClient.invalidateQueries(queryKeys.fetchServicesProvidersByAgencyId);
			setIsOpen(false);
		},
	});

	const updateServiceMutation = useMutation({
		mutationFn: (service) => updateService(service),
		onSuccess: () => {
			queryClient.invalidateQueries(queryKeys.fetchServices);
			if (!updateServiceMutation.isError) setIsOpen(false);
		},
	});

	const onSubmit = async (data) => {
		isEditing ? updateServiceMutation.mutate(data) : createServiceMutation.mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{createServiceMutation.isError ? (
				<div className="text-bold text-red-500">{createServiceMutation.error.message}</div>
			) : (
				""
			)}
			<div className=" ">
				<div className="border-b border-gray-900/10 pb-12">
					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
								Nombre del Proveedor
							</label>
							<div className="mt-2">
								<input
									{...register("providerName", { required: "El Nombre es Requerido" })}
									type="text"
									name="providerName"
									id="providerName"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.providerName && (
									<p className="text-xs text-red-500 ">{errors.providerName?.message}</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="description"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Telefono de Contacto
							</label>
							<div className="mt-2">
								<input
									{...register("providerPhone", { required: "EL Telefono  es Requerido" })}
									type="number"
									name="providerPhone"
									id="providerPhone"
									autoComplete="given-phone"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.providerPhone && (
									<p className="text-xs text-red-500 ">{errors.providerPhone?.message}</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="providerAddress"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Direccion
							</label>
							<div className="mt-2">
								<input
									{...register("providerAddress", { required: "La direccion es Requerida" })}
									type="text"
									name="providerAddress"
									id="providerAddress"
									autoComplete="given-providerAddress"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.providerAddress && (
									<p className="text-xs text-red-500 ">{errors.providerAddress?.message}</p>
								)}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="providerEmail"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Correo de Contacto
							</label>
							<div className="mt-2">
								<input
									{...register("providerEmail", { required: "El Email es Requerido" })}
									type="tel"
									name="providerEmail"
									id="providerEmail"
									placeholder="provider@example.com"
									autoComplete="given-providerEmail"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
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
					disabled={createServiceMutation.isLoading || updateServiceMutation.isLoading}
					className="rounded-md bg-blue-600 w-32 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					{createServiceMutation.isLoading || updateService.isLoading ? (
						<EllipsisHorizontalIcon className="animate-pulse mx-auto h-5 w-5 text-white " />
					) : (
						"Guardar"
					)}
				</button>
			</div>
		</form>
	);
}
