import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const postEmployee = async (employee) => {
	if (!employee) throw new Error({ message: "Por Favor ingrese los datos" });
	const res = await fetch("https://caribeagencia-backend.vercel.app/api/v1/employees", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(employee),
	});

	if (!res.ok) {
		if (res.status === 404) {
			throw new Error("No se pudo crear el empleado, por favor intente de nuevo");
		}
		const error = await res.json();
		const message = error.meta ? error?.meta?.target[0] : error.message;
		throw new Error(message);
	}
	return await res.json();
};

const updateEmployee = async (employee) => {
	if (!employee) throw new Error({ message: "Por Favor ingrese los datos" });
	const res = await fetch(
		"https://caribeagencia-backend.vercel.app/api/v1/employees/" + employee.id,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(employee),
		},
	);

	if (!res.ok) {
		if (res.status === 404) {
			throw new Error("No se pudo actualizar el empleado, por favor intente de nuevo");
		}
		const error = await res.json();
		const message = error.meta ? error?.meta?.target[0] : error.message;
		throw new Error(message);
	}
	return await res.json();
};

export default function EmployeeForm({
	setIsOpen,
	selectedAgency,
	selectedEmployee,
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
	const createEmployeeMutation = useMutation({
		mutationFn: (newEmployee) => postEmployee(newEmployee),
		onSuccess: () => {
			queryClient.invalidateQueries("fetchEmployeesByAgencyId");
			if (!createEmployeeMutation.isError) setIsOpen(false);
		},
	});

	const updateEmployeeMutation = useMutation({
		mutationFn: (employee) => updateEmployee(employee),
		onSuccess: () => {
			queryClient.invalidateQueries("fetchEmployeesByAgencyId");
			if (!updateEmployeeMutation.isError) setIsOpen(false);
		},
	});

	const onSubmit = async (data) => {
		data.agencyId = selectedAgency.id;
		isEditing ? updateEmployeeMutation.mutate(data) : createEmployeeMutation.mutate(data);
	};

	useEffect(() => {
		if (isEditing && selectedEmployee) {
			reset(selectedEmployee);
		}
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{createEmployeeMutation.isError ? (
				<div className="text-bold text-red-500">{createEmployeeMutation.error.message}</div>
			) : (
				""
			)}
			<div className=" ">
				<div className="border-b border-gray-900/10 pb-12">
					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Nombre
							</label>
							<div className="mt-2">
								<input
									{...register("firstName", { required: "El Nombre es Requerido" })}
									type="text"
									name="firstName"
									id="firstName"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.firstName && (
									<p className="text-xs text-red-500 ">{errors.firstName?.message}</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="lastName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Apellidos
							</label>
							<div className="mt-2">
								<input
									{...register("lastName", { required: "Los apellidos son Requeridos" })}
									type="text"
									name="lastName"
									id="lastName"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.lastName && (
									<p className="text-xs text-red-500 ">{errors.lastName?.message}</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Telefono Movil
							</label>
							<div className="mt-2">
								<input
									{...register("mobile", { required: "El Movil es Requerido" })}
									type="tel"
									name="mobile"
									id="mobile"
									placeholder="999-999-9999"
									autoComplete="given-mobile"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.mobile && <p className="text-xs text-red-500 ">{errors.mobile?.message}</p>}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Telefono Fijo
							</label>
							<div className="mt-2">
								<input
									{...register("phone")}
									type="tel"
									name="phone"
									id="phone"
									placeholder="999-999-9999"
									autoComplete="given-phone"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:col-span-4">
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Correo Electronico
							</label>
							<div className="mt-2">
								<input
									{...register("email", { required: "El Email es Requerido" })}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.email && <p className="text-xs text-red-500 ">{errors.email?.message}</p>}
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="street-address"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Direccion Actual
							</label>
							<div className="mt-2">
								<input
									{...register("address", { required: "La Direccion es Requerida" })}
									type="text"
									name="address"
									id="address"
									autoComplete="address"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								<div className="mt-2">
									{errors.address && (
										<p className="text-xs text-red-500 ">{errors.address?.message}</p>
									)}
								</div>
							</div>
						</div>
						<div className="sm:col-span-2 sm:col-start-1">
							<label
								htmlFor="postal-code"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								ZIP / Postal code
							</label>
							<div className="mt-2">
								<input
									{...register("postalCode", { required: "El Codigo Postal es Requerido" })}
									type="text"
									name="postalCode"
									id="postalCode"
									autoComplete="postalCode"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.postalCode && (
									<p className="text-xs text-red-500 ">{errors.postalCode?.message}</p>
								)}
							</div>
						</div>
						<div className="sm:col-span-2 ">
							<label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
								City
							</label>
							<div className="mt-2">
								<input
									{...register("city")}
									type="text"
									name="city"
									id="city"
									autoComplete="address-level2"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
								State / Province
							</label>
							<div className="mt-2">
								<input
									{...register("state")}
									type="text"
									name="state"
									id="state"
									autoComplete="address-level1"
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
					disabled={createEmployeeMutation.isLoading || updateEmployeeMutation.isLoading}
					className="rounded-md bg-blue-600 w-32 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					{createEmployeeMutation.isLoading || updateEmployeeMutation.isLoading ? (
						<EllipsisHorizontalIcon className="animate-pulse mx-auto h-5 w-5 text-white " />
					) : (
						"Guardar"
					)}
				</button>
			</div>
		</form>
	);
}
