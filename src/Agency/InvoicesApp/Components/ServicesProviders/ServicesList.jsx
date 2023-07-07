import { Disclosure } from "@headlessui/react";
import { React } from "react";
import { ServiceToggle } from "./ServiceToggle";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ServicePriceList } from "./ServicesPriceList";
import SlideOver from "../SlideOvers/SlideOver";
import { useState } from "react";
import ServicePriceForm from "./ServicePriceForm";

export const ServicesList = ({ services, selectedAgency }) => {
	const [isOpenServicePriceForm, setIsOpenServicePriceForm] = useState(false);
	const [selectedService, setSelectedService] = useState(null);
	const handleCreateServicePrice = (service) => {
		setSelectedService(service);
		setIsOpenServicePriceForm(true);
	};

	return (
		<div>
			<ul role="list" className=" pl-6">
				{services?.map((service) => (
					<div key={service.id}>
						<li className="flex  items-center  justify-between  pt-4">
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-600">{service.name}</p>
								<b className="flex  mt-1 truncate text-xs leading-5  text-blue-500">
									{service.serviceType}
								</b>
							</div>
							<div className="inline-flex gap-2 bg-gray-50 mx-10 p-2 rounded-xl border text-xs items-center">
								<span className="text-slate-500 ">{service.servicesPrices?.length}</span>
								<p>Tarifas Activas</p>
							</div>

							<div className="flex border-l space-x-4 border-dotted pl-4">
								<ServiceToggle isActive={service.isActive} />
								<span
									onClick={() => handleCreateServicePrice(service)}
									className="flex  px-4 gap-2 text-xs text-gray-700 font-bold items-center space-x-3 hover:border rounded-lg cursor-pointer  "
								>
									<PlusIcon className="h-5 w-5 text-gray-500 " aria-hidden="true" />
									Crear Tarifa
								</span>
							</div>
						</li>
						<Disclosure>
							{({ open }) => (
								<>
									<div className="flex   border-b  justify-end ">
										{service?.servicesPrices?.length > 0 && (
											<Disclosure.Button>
												<div className="flex  gap-2 p-1.5 rounded-lg text-gray-700   justify-end items-center  text-xs">
													Ver tarifas
													<ChevronRightIcon
														className={open ? "rotate-90 transform h-4 w-4" : "h-4 w-4"}
													/>
												</div>
											</Disclosure.Button>
										)}
									</div>

									<Disclosure.Panel>
										<ServicePriceList
											selectedAgency={selectedAgency}
											servicesPrices={service.servicesPrices}
											selectedService={service}
										/>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					</div>
				))}
			</ul>
			<SlideOver
				isOpen={isOpenServicePriceForm}
				setIsOpen={setIsOpenServicePriceForm}
				title={"Tarifas"}
			>
				<ServicePriceForm
					selectedService={selectedService}
					selectedAgency={selectedAgency}
					setIsOpen={setIsOpenServicePriceForm}
				/>
			</SlideOver>
		</div>
	);
};
