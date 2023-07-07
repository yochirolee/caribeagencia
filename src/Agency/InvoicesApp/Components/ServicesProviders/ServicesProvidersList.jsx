import { useState } from "react";
import { ArchiveBoxArrowDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Card } from "@tremor/react";
import { useFetchServicesProvidersByAgencyId } from "../../Hooks/Agencies/useAgencies";
import SlideOver from "../SlideOvers/SlideOver";
import { Disclosure } from "@headlessui/react";
import { ServicesList } from "./ServicesList";
import ProviderForm from "./ProviderForm";
import ServiceForm from "./ServiceForm";

export default function ServicesProvidersList({ selectedAgency }) {
	if (!selectedAgency) return <div>Seleccione una agencia</div>;
	const [isOpenProviderForm, setIsOpenProviderForm] = useState(false);
	const [isOpenServiceForm, setIsOpenServiceForm] = useState(false);
	const { data: servicesProviders, isLoading } = useFetchServicesProvidersByAgencyId(
		selectedAgency.id,
	);

	const [selectedProvider, setSelectedProvider] = useState(null);

	if (isLoading) return <div>Cargando...</div>;

	const handleCreateService = (provider) => {
		setSelectedProvider(provider);
		setIsOpenServiceForm(true);
	};

	return (
		<>
			<Card>
				<div className="flex  justify-between border-b pb-2">
					<h1>
						Servicios y Precios para <b>{selectedAgency.name}</b>{" "}
					</h1>
					<span
						onClick={() => setIsOpenProviderForm(true)}
						className=" p-1 cursor-pointer border rounded-full text-gray-500  "
					>
						<ArchiveBoxArrowDownIcon className="h-6 w-6" />
					</span>
				</div>

				<div>
					{servicesProviders?.map((serviceProvider) => (
						<div key={serviceProvider.id}>
							<Disclosure>
								{({ open }) => (
									<Card className="my-4">
										<div className={`flex justify-between py-4 ${open ? " border-b" : ""}`}>
											<h2 className=" font-semibold leading-6 text-gray-900/80">
												{serviceProvider.providerName}
											</h2>
											<div className="flex space-x-6">
												<button
													onClick={() => handleCreateService(serviceProvider)}
													className="flex items-center bg-gray-800 hover:bg-gray-700 text-white text-xs  p-2 rounded-lg gap-2 "
												>
													Crear Servicio
												</button>
												<Disclosure.Button>
													<div className="inline-flex  items-center gap-2 text-xs">
														Ver Servicios
														<ChevronRightIcon
															className={
																open ? "rotate-90 transform h-4 w-4 text-blue-500" : "h-4 w-4"
															}
														/>
													</div>
												</Disclosure.Button>
											</div>
										</div>

										<Disclosure.Panel>
											<ServicesList selectedAgency={selectedAgency} services={serviceProvider.services} />
										</Disclosure.Panel>
									</Card>
								)}
							</Disclosure>
						</div>
					))}
				</div>
			</Card>
			<SlideOver
				setIsOpen={setIsOpenProviderForm}
				isOpen={isOpenProviderForm}
				title="Crear Proveedor de Servicios"
			>
				<ProviderForm setIsOpen={setIsOpenProviderForm} />
			</SlideOver>

			<SlideOver setIsOpen={setIsOpenServiceForm} isOpen={isOpenServiceForm} title="Crear Servicio">
				<ServiceForm
					setIsOpen={setIsOpenServiceForm}
					selectedAgency={selectedAgency}
					selectedProvider={selectedProvider}
				/>
			</SlideOver>
		</>
	);
}
