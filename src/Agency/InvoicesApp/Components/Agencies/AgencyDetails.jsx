import { useEffect, useState } from "react";
import EmployeeList from "../Employess/EmployeesList";
import {
	BuildingOffice2Icon,
	EnvelopeIcon,
	PhoneIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import AgencyStats from "./AgencyStats";
import SlideOver from "../SlideOvers/SlideOver";
import AgencyForm from "./AgencyForm";
import ServicesProviderList from "../ServicesProviders/ServicesProvidersList";
import { Card } from "@tremor/react";

export const AgencyDetails = ({ selectedAgency, setSelectedAgency }) => {
	if (!selectedAgency) return null;
	const [showSlideOver, setShowSlideOver] = useState(false);

	return (
		<div className="flex flex-col">
			<Card
				className="my-8 .
			 "
			>
				<div className="grid  lg:grid-cols-3 ">
					<div className="flex flex-col  place-content-center lg:border-r  px-8">
						<h2 className="text-3xl font-bold">{selectedAgency?.name}</h2>
						<p className="lg:m-8  text-gray-500">{selectedAgency.description} </p>
					</div>
					<dl className="flex flex-col my-auto  px-8 lg:border-r ">
						<div className="py-4 flex items-center space-x-4">
							<dt className=" text-gray-500">
								<span className="sr-only">owner</span>
								<UserCircleIcon className="w-6 h-6" />
							</dt>
							<dd>{selectedAgency?.owner}</dd>
						</div>
						<div className="py-4 flex items-center space-x-4">
							<dt className=" text-gray-500">
								<span className="sr-only">address</span>
								<BuildingOffice2Icon className="h-6 w-6" />
							</dt>
							<dd>{selectedAgency?.address}</dd>
						</div>
						<div className="py-4 flex items-center space-x-4">
							<dt className=" text-gray-500">
								<span className="sr-only">Email</span>
								<EnvelopeIcon className="w-6 h-6" />
							</dt>
							<dd>{selectedAgency?.email}</dd>
						</div>
						<div className="py-4 flex items-center space-x-4">
							<dt className=" text-gray-500">
								<span className="sr-only">Phone</span>
								<PhoneIcon className="w-6 h-6" />
							</dt>
							<dd>{selectedAgency?.phone}</dd>
						</div>
						<div className="mt-2">
							<button
								onClick={() => setShowSlideOver(true)}
								className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
							>
								Editar Agencia
							</button>
						</div>
					</dl>
					<div className="px-8">
						<AgencyStats />
					</div>
				</div>
			</Card>

			<div className="flex flex-col xl:flex-row gap-6 ">
				<ServicesProviderList selectedAgency={selectedAgency} />
				<EmployeeList selectedAgency={selectedAgency} />
			</div>

			<SlideOver isOpen={showSlideOver} setIsOpen={setShowSlideOver} title="Agencia">
				<AgencyForm
					selectedAgency={selectedAgency}
					setSelectedAgency={setSelectedAgency}
					setIsOpen={setShowSlideOver}
					isEditing={true}
				/>
			</SlideOver>
		</div>
	);
};
