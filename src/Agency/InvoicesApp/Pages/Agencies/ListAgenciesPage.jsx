import { React, useEffect, useState } from "react";
import { useFetchAgencies } from "../../Hooks/Agencies/useAgencies";
import Modal from "../../Components/Customers/Modals/Modal";
import { AgencyDetails } from "../../Components/Agencies/AgencyDetails";
import AgenciesSearchSelect from "../../Components/Agencies/AgenciesSearchSelect";
import AgencyForm from "../../Components/Agencies/AgencyForm";
import { AgenciesTable } from "../../Components/Agencies/AgenciesTable";
import SlideOver from "../../Components/SlideOvers/SlideOver";
import { Card } from "@tremor/react";

export const ListAgenciesPage = () => {
	const { data: agencies, isError, isLoading } = useFetchAgencies();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedAgency, setSelectedAgency] = useState(null);

	if (isError) return <div className="text-center text-red-500">Error al cargar los datos</div>;
	if (isLoading)
		return <div className="text-center text-blue-500">Cargando por favor espere...</div>;

	return (
		<div className="p-2 my-8 md:p-4 lg:px-10 ">
			<div className="flex flex-col">
				<h1 className="text-lg font-bold">Listado de Agencias</h1>
				<div className=" inline-flex items-center  gap-4">
					{agencies ? (
						<AgenciesSearchSelect
							agencies={agencies}
							selectedAgency={selectedAgency}
							setSelectedAgency={setSelectedAgency}
						/>
					) : (
						""
					)}

					<button
						onClick={() => setIsOpen(true)}
						className="flex h-10 rounded-md bg-blue-600 px-3.5 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						<span className="flex ">
							Crear <span className=" sm:inline">Agencia</span>{" "}
							<span aria-hidden="true" className="ml-4 text-slate-100 sm:inline">
								→
							</span>
						</span>
					</button>
				</div>

				<AgencyDetails selectedAgency={selectedAgency} setSelectedAgency={setSelectedAgency} />
				{/* 
				<AgenciesTable agencies={agencies} />
				 */}
			</div>

			<SlideOver isOpen={isOpen} setIsOpen={setIsOpen}>
				<AgencyForm setIsOpen={setIsOpen} setSelectedAgency={setSelectedAgency} />
			</SlideOver>
		</div>
	);
};
