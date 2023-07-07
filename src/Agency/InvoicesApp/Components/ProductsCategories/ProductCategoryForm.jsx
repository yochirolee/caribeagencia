import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

const plans = [
	{
		id: 1,
		name: "Vender  por Lbs",
		description: "Todos los productos de esta categoria se venderan por Lbs",
	},
	{
		id: 2,
		name: "Vender por Precio Unitario",
		description: "Todos los productos de esta categoria se venderan por Precio Unitario",
	},
];

const postProductCategory = async (category) => {
	if (!category) throw new Error({ message: "Por Favor ingrese los datos" });
	const res = await fetch(
		"https://caribeagencia-backend.vercel.app/api/v1/productsCategories/create",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(category),
		},
	);

	if (!res.ok) {
		const error = await res.json();
		console.log(error, "error");
		const message = error.meta ? error?.meta?.target[0] : error.message;

		throw new Error(message);
	}
	return await res.json();
};

const updateProductCategory = async (category) => {
	if (!category) throw new Error({ message: "Por Favor ingrese los datos" });
	const res = await fetch(
		"https://caribeagencia-backend.vercel.app/api/v1/productsCategories/update/" + employee.id,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(category),
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

export default function ProductCategoryForm({
	setIsOpen,
	selectedAgency,
	selectedProductCategory,
	isEditing = false,
}) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [selected, setSelected] = useState(plans[0]);
	const queryClient = useQueryClient();
	const createProductCategoryMutation = useMutation({
		mutationFn: (newCategory) => postProductCategory(newCategory),
		onSuccess: () => {
			queryClient.invalidateQueries("fetchProductsCategoriesByAgencyId");
			if (!createProductCategoryMutation.isError) setIsOpen(false);
		},
	});

	const updateProductCategoryMutation = useMutation({
		mutationFn: (category) => updateProductCategoryMutation(category),
		onSuccess: () => {
			queryClient.invalidateQueries("fetchCategoriesByAgencyId");
			if (!updateProductCategoryMutation.isError) setIsOpen(false);
		},
	});

	const onSubmit = async (data) => {
		console.log(data, "data to insert");

		data.poundBuyPrice = parseFloat(data.poundBuyPrice);
		data.poundSalePrice = parseFloat(data.poundSalePrice);	
		data.unitBuyPrice = parseFloat(data.unitBuyPrice);
		data.unitSalePrice = parseFloat(data.unitSalePrice);

		data.agencyId = selectedAgency.id;
		isEditing
			? updateProductCategoryMutation.mutate(data)
			: createProductCategoryMutation.mutate(data);
	};

	const handleTypeOfCategory = (plan) => {
		setSelected(plan);
	};

	useEffect(() => {
		if (isEditing && selectedProductCategory) {
			reset(selectedProductCategory);
		}
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{createProductCategoryMutation.isError ? (
				<div className="text-bold text-red-500">{createProductCategoryMutation.error.message}</div>
			) : (
				""
			)}
			<div className=" ">
				<div className="border-b border-gray-900/10 pb-12">
					<div className="mt-6 grid grid-cols-3 col-span-3  justify-center gap-x-6 gap-y-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Nombre de Categoria
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
								{errors.firstName && (
									<p className="text-xs text-red-500 ">{errors.name?.message}</p>
								)}
							</div>
						</div>
					</div>
					<div className="mt-8">
						<fieldset>
							<legend>Tipo de Categoria</legend>
							<div>
								{plans.map((plan) => (
									<div key={plan.id} className="flex gap-4 items-center my-4">
										<div className="">
											<input
												id="medium"
												aria-describedby="medium-description"
												name="plan"
												type="radio"
												className="nr rs afq ayc bnm"
												{...register("isSellByPounds", { required: true })}
												value={plan.id == 1 ? true : false}
											/>
										</div>
										<div>
											<label for="medium">{plan.name}</label>
											<p id="medium-description" className="text-gray-500 text-sm">
												{plan.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</fieldset>
					</div>
					<div className="mt-6 grid grid-cols-3 col-span-3  justify-center gap-x-6 gap-y-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="unitBuyPrice"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Precio de Compra
							</label>
							<div className="mt-2">
								<input
									{...register("unitBuyPrice", { required: "El Precio de Compra es Requerido" })}
									type="number"
									name="unitBuyPrice"
									id="unitBuyPrice"
									step="any"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.unitBuyPrice && (
									<p className="text-xs text-red-500 ">{errors.unitBuyPrice?.message}</p>
								)}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="unitSalePrice"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Precio de Venta
							</label>
							<div className="mt-2">
								<input
									{...register("unitSalePrice", { required: "El Precio de Venta es Requerido" })}
									type="number"
									name="unitSalePrice"
									id="unitSalePrice"
									step="any"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.unitBuyPrice && (
									<p className="text-xs text-red-500 ">{errors.unitSalePrice?.message}</p>
								)}
							</div>
						</div>
					</div>
					<div className="mt-6 grid grid-cols-3 col-span-3  justify-center gap-x-6 gap-y-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="unitBuyPrice"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Precio de Compra x Lbs
							</label>
							<div className="mt-2">
								<input
									{...register("poundBuyPrice", {
										required: "El Precio de Compra por Lbs es Requerido",
									})}
									type="number"
									name="poundBuyPrice"
									id="poundBuyPrice"
									step="any"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.poundBuyPrice && (
									<p className="text-xs text-red-500 ">{errors.poundBuyPrice?.message}</p>
								)}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="poundSalePrice"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Precio de Venta x Lbs
							</label>
							<div className="mt-2">
								<input
									{...register("poundSalePrice", { required: "El Precio de Venta es Requerido" })}
									step="any"
									autoComplete="given-name"
									name="poundSalePrice"
									id="poundSalePrice"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.poundSalePrice && (
									<p className="text-xs text-red-500 ">{errors.poundSalePrice?.message}</p>
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
					disabled={
						createProductCategoryMutation.isLoading || updateProductCategoryMutation.isLoading
					}
					className="rounded-md bg-blue-600 w-32 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					{createProductCategoryMutation.isLoading || updateProductCategoryMutation.isLoading ? (
						<EllipsisHorizontalIcon className="animate-pulse mx-auto h-5 w-5 text-white " />
					) : (
						"Guardar"
					)}
				</button>
			</div>
		</form>
	);
}
