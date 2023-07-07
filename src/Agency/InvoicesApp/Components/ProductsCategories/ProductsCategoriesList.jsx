import { useState } from "react";
import {
	ArchiveBoxArrowDownIcon,
	PencilSquareIcon,
	TrashIcon,
	
} from "@heroicons/react/24/outline";
import { Card } from "@tremor/react";
import SlideOver from "../SlideOvers/SlideOver";
import { useFetchProductsCategoriesByAgencyId } from "../../Hooks/Agencies/useAgencies";
import ProductCategoryForm from "./ProductCategoryForm";

const updateEmployee = async (employee) => {
	if (!employee) throw new Error({ message: "Por Favor ingrese los datos" });
	const res = await fetch(
		"https://caribeagencia-backend.vercel.app/api/v1/employees/update/" + employee.id,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(employee),
		},
	);
};

export default function ProductsCategoriesList({ selectedAgency }) {
	if (!selectedAgency) return <div>Seleccione una agencia</div>;
	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const {
		data: categories,
		isLoading,
		isError,
	} = useFetchProductsCategoriesByAgencyId(selectedAgency.id);

	console.log(categories, "categories");

	const [selectedCategoy, setSelectedCategory] = useState(null);
	const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

	const handleCreateCategory = (category) => {
		setIsEditing(false);
		setOpen(true);
	};

	const handleEditCategory = (category) => {
		setSelectedCategory(category);
		setIsEditing(true);
		setOpen(true);
	};

	const handleDeleteCategory = (category) => {
		setSelectedEmployee(category);
		setShowDeleteConfirmModal(true);
	};

	if (isLoading) return <div>Cargando...</div>;
	return (
		<>
			<Card>
				<div className="flex  justify-between border-b pb-2">
					<h1>Listado de Categorias de Productos</h1>
					<span
						onClick={() => handleCreateCategory()}
						className=" p-1 rounded-full text-gray-500 border hover:bg-gray-300"
					>
						<ArchiveBoxArrowDownIcon className="h-6 w-6" />
					</span>
				</div>
				<ul role="list" className="divide-y divide-gray-100">
					{categories?.map((category) => (
						<li key={category.name} className="flex justify-between gap-x-6 py-5">
							<div className="flex gap-x-4">
								<div className="min-w-0 flex-auto">
									<p className="text-sm font-semibold leading-6 text-gray-900">{category.name}</p>
									{category?.isSellByPounds ? (
										<span className="rounded-full px-2 p-1 border text-xs text-green-600 border-green-400">
											Venta por Lbs
										</span>
									) : (
										<span className="rounded-full px-2 p-1 border text-xs text-green-600 border-green-400">
											Venta por Precio Unitario
										</span>
									)}
								</div>
							</div>
							<div className="flex  sm:items-end">
								<div className="flex flex-col items-center border-r border-l px-2">
									<span className="text-xs text-gray-700">Precio Compra</span>
									<span className="flex text-sm text-gray-500">
										$ {category?.pricePeerPound} usd x Lb
									</span>
								</div>

								<div className="flex flex-col items-center border-r px-2">
									<span className="text-xs text-gray-700">Precio Venta</span>
									<span className="text-sm text-gray-500">
										$ {category?.pricePeerPoundForSale} usd x Lb
									</span>
								</div>
								<div className="flex flex-col items-center  pl-2">
									<span className="text-xs text-gray-700">Utilidad</span>
									<span className="text-sm text-gray-500">
										$ {category?.pricePeerPoundForSale - category?.pricePeerPound} usd x Lb
									</span>
								</div>
							</div>
							<div className="flex border-l border-dotted pl-4">
								<span
									onClick={() => handleEditCategory(category)}
									className=" rounded-lg cursor-pointer  p-2 "
								>
									<PencilSquareIcon
										className="h-5 w-5 text-gray-500 hover:text-green-400"
										aria-hidden="true"
									/>
								</span>
								<span
									onClick={() => handleDeleteCategory(category)}
									className=" rounded-lg cursor-pointer  p-2 "
								>
									<TrashIcon
										className="h-5 w-5 text-gray-500 hover:text-red-400"
										aria-hidden="true"
									/>
								</span>
							</div>
						</li>
					))}
				</ul>
			</Card>
			<SlideOver isOpen={open} setIsOpen={setOpen} title="Crear Categoria">
				<ProductCategoryForm selectedAgency={selectedAgency} selectedProductCategory={selectedCategoy} setIsOpen={setOpen} isEditing={isEditing} />
			</SlideOver>
		</>
	);
}
