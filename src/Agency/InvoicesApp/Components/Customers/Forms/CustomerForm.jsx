import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { InvoiceStore } from "../../../Store/InvoiceStore";

const postClient = async (customer) => {
	if (!customer) throw new Error({ message: "Por Favor ingrese los datos" });
	const res = await fetch("http://localhost:3001/api/v1/customers/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(customer),
	});

	if (!res.ok) {
		const error = await res.json();
		const message = error?.meta?.target[0];

		throw new Error(
			`Es posible que exista un cliente con este: ` + message || "Error al crear el cliente",
		);
	}
	return await res.json();
};

export default function CustomerForm({ setIsOpen }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const queryClient = useQueryClient();
	const clientMutation = useMutation({
		mutationFn: (newCustomer) => postClient(newCustomer),
		onSuccess: () => {
			queryClient.invalidateQueries("getCustomers");
			if (!clientMutation.isError) setIsOpen(false);
		},
	});

	const onSubmit = async (data) => {
		data.agencyId = 1;
		data.countryId = 1;
		data.stateId = 1;
		data.cityId = 1;

		const createdCustomer = await clientMutation.mutateAsync(data);
		InvoiceStore.setState({ invoice: { customer: createdCustomer } });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{clientMutation.isError ? (
				<div className="text-bold text-red-500">{clientMutation.error.message}</div>
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
								Nombre - Segundo Nombre
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
									{...register("lastName", { required: "El Apellido es Requerido" })}
									type="text"
									name="lastName"
									id="lastName"
									autoComplete="family-name"
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

						<div className="sm:col-span-3">
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Pais
							</label>
							<div className="mt-2">
								<select
									id="country"
									name="country"
									autoComplete="country-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
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
					disabled={clientMutation.isLoading}
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					{clientMutation.isLoading ? "Guardando" : "Save"}
				</button>
			</div>
		</form>
	);
}
