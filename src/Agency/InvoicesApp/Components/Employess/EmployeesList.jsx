import { useState } from "react";
import { PencilSquareIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Card } from "@tremor/react";
import SlideOver from "../SlideOvers/SlideOver";
import { useFetchEmployeesByAgencyId } from "../../Hooks/Agencies/useAgencies";
import EmployeeForm from "./EmployeeForm";
import DeleteEmployeeConfirmModal from "./EmployeeDeleteConfirmModal";

export default function EmployeeList({ selectedAgency }) {
	if (!selectedAgency) return <div>Seleccione una agencia</div>;
	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const { data: employees, isLoading, isError } = useFetchEmployeesByAgencyId(selectedAgency.id);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

	const handleCreateEmployee = () => {
		setIsEditing(false);
		setOpen(true);
	};

	const handleEditEmployee = (employee) => {
		setSelectedEmployee(employee);
		setIsEditing(true);
		setOpen(true);
	};

	const handleDeleteEmployee = (employee) => {
		setSelectedEmployee(employee);
		setShowDeleteConfirmModal(true);
	};

	if (isLoading) return <div>Cargando...</div>;
	return (
		<>
			<Card>
				<div className="flex  justify-between border-b pb-2">
					<h1>Listado de Empleados</h1>
					<span
						onClick={() => handleCreateEmployee()}
						className=" p-1 rounded-full text-gray-500 border hover:bg-gray-300"
					>
						<UserPlusIcon className="h-6 w-6" />
					</span>
				</div>
				<ul role="list" className="divide-y divide-gray-100">
					{employees?.map((employee) => (
						<li key={employee.id} className="flex justify-between gap-x-6 py-5">
							<div className="flex gap-x-4">
								<img
									className="h-12 w-12 flex-none rounded-full bg-gray-50"
									src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
								<div className="min-w-0 flex-auto">
									<p className="text-sm font-semibold leading-6 text-gray-900">
										{employee.firstName + " " + employee.lastName}
									</p>
									<p className="mt-1 truncate text-xs leading-5 text-gray-500">{employee.email}</p>
								</div>
							</div>
							<div className="hidden sm:flex sm:flex-col sm:items-end">
								<p className="text-sm leading-6 text-gray-900">Sales</p>
								{true ? (
									<p className="mt-1 text-xs leading-5 text-gray-500">
										Last seen <time>123</time>
									</p>
								) : (
									<div className="mt-1 flex items-center gap-x-1.5">
										<div className="flex-none rounded-full bg-emerald-500/20 p-1">
											<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
										</div>
										<p className="text-xs leading-5 text-gray-500">Online</p>
									</div>
								)}
							</div>
							<div className="flex border-l border-dotted pl-4">
								<span
									onClick={() => handleEditEmployee(employee)}
									className=" rounded-lg cursor-pointer  p-2 "
								>
									<PencilSquareIcon
										className="h-5 w-5 text-gray-500 hover:text-green-400"
										aria-hidden="true"
									/>
								</span>
								<span
									onClick={() => handleDeleteEmployee(employee)}
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
			<SlideOver isOpen={open} setIsOpen={setOpen} title="Empleado">
				<EmployeeForm
					setIsOpen={setOpen}
					selectedAgency={selectedAgency}
					isEditing={isEditing}
					selectedEmployee={selectedEmployee}
				/>
			</SlideOver>
			<DeleteEmployeeConfirmModal
				isOpen={showDeleteConfirmModal}
				setIsOpen={setShowDeleteConfirmModal}
				employee={selectedEmployee}
			/>
		</>
	);
}
