import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateAgency, useUpdateAgency } from "../../Hooks/Agencies/useAgencies";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

export default function AgencyForm({
	setIsOpen,
	selectedAgency,
	setSelectedAgency,
	isEditing = false,
}) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const createAgencyMutation = useCreateAgency(setIsOpen);

	const updateAgencyMutation = useUpdateAgency(setIsOpen, setSelectedAgency);

	const onSubmit = (data) => {
		if (isEditing) {
			updateAgencyMutation.mutate(data);
			setSelectedAgency(data);
		} else {
			createAgencyMutation.mutate(data);
			setSelectedAgency(null);
		}
	};

	useEffect(() => {
		if (selectedAgency) {
			reset(selectedAgency);
		}
	}, [isEditing, selectedAgency]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{createAgencyMutation.isError ? (
				<div className="text-bold text-red-500">Error Creando Agencia</div>
			) : (
				""
			)}
			<div className=" ">
				<div className="border-b border-gray-900/10 pb-12">
					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
								Nombre de la Agencia
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
								htmlFor="lastName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Owner
							</label>
							<div className="mt-2">
								<input
									{...register("owner", { required: "El Apellido es Requerido" })}
									type="text"
									name="owner"
									id="owner"
									autoComplete="family-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.owner && <p className="text-xs text-red-500 ">{errors.owner?.message}</p>}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
								Telefono
							</label>
							<div className="mt-2">
								<input
									{...register("phone", { required: "El Telefono es Requerido" })}
									type="number"
									name="phone"
									id="phone"
									placeholder="999-999-9999"
									autoComplete="given-phone"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.phone && <p className="text-xs text-red-500 ">{errors.phone?.message}</p>}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="description"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email
							</label>
							<div className="mt-2">
								<input
									{...register("email", { required: "El Email es Requerido" })}
									type="text"
									name="email"
									id="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.email && <p className="text-xs text-red-500 ">{errors.email?.message}</p>}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="description"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Description
							</label>
							<div className="mt-2">
								<div className="mt-2">
									<textarea
										name="description"
										rows="3"
										{...register("description")}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									></textarea>
								</div>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="address"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Direccion
							</label>
							<div className="mt-2">
								<input
									{...register("address", { required: "La Direccion es Requerida" })}
									type="text"
									name="address"
									id="address"
									autoComplete="given-address"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.address && (
									<p className="text-xs text-red-500 ">{errors.address?.message}</p>
								)}
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
					disabled={createAgencyMutation.isLoading}
					className="rounded-md w-32  bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					{createAgencyMutation.isLoading ? (
						<EllipsisHorizontalIcon className="animate-pulse mx-auto h-5 w-5 text-white " />
					) : (
						"Guardar"
					)}
				</button>
			</div>
		</form>
	);
}
