import { PencilSquareIcon, TrashIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DeleteAgencyConfirmModal from "../Customers/Modals/DeleteAgencyConfirmModal";
import { Checkbox } from "flowbite-react";
import SlideOver from "../SlideOvers/SlideOver";
import { useMutation } from "react-query";
import { useDeleteAgency } from "../../Hooks/Agencies/useAgencies";

export const AgenciesTable = ({ agencies }) => {
	const [showModal, setShowModal] = useState(false);
	const [showSlideOver, setShowSlideOver] = useState(false);
	const [selectedAgency, setSelectedAgency] = useState(null);

	const [agencyId, setAgencyId] = useState(null);

	const deleteAgencyMutation = useDeleteAgency();

	const handleEditAgency = (agency) => {
		setSelectedAgency(agency);
		setShowSlideOver(true);
		console.log(agency, "edit");
	};
	const handleDeleteAgency = (id) => {
		console.log(id, "delete");
		setAgencyId(id);
		deleteAgencyMutation.mutate(id);
		setShowModal(true);
	};
	return (
		<div className=" grid  mt-20 min-w-full ">
			<div className="overflow-y-auto max-h-screen ">
				<table className=" text-left min-w-full ">
					<thead className="border-b bg-gray-50">
						<tr>
							<th scope="col" className="flex gap-4 text-xs font-medium text-gray-900 px-6 py-4">
								<Checkbox />
								Agencia
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Owner
							</th>

							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Telefono
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Direccion
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{agencies?.map((agency) => (
							<tr key={agency.id} className="  bg-white border-b ">
								<td className="  text-xs gap-4  text-gray-900  px-6 py-4  whitespace-nowrap">
									<Checkbox />
									<span className="pl-4">{agency.name}</span>
								</td>
								<td className="text-xs text-gray-900   px-6   py-4 whitespace-nowrap">
									{agency.owner}
								</td>
								<td className="text-xs  text-gray-900  px-6   py-4 whitespace-nowrap">
									{agency.phone}
								</td>
								<td className="text-xs  text-gray-900  px-6   py-4 whitespace-nowrap">
									{agency.address}
								</td>
								<td className="flex  text-gray-900  px-6 py-4 whitespace-nowrap">
									<div className="flex border-l border-dotted pl-4">
										<span
											onClick={() => handleEditAgency(agency)}
											className=" rounded-lg cursor-pointer  p-2 "
										>
											<UsersIcon
												className="h-5 w-5 text-gray-500 hover:text-blue-400"
												aria-hidden="true"
											/>
										</span>
										<span
											onClick={() => handleEditAgency(agency)}
											className=" rounded-lg cursor-pointer  p-2 "
										>
											<PencilSquareIcon
												className="h-5 w-5 text-gray-500 hover:text-green-400"
												aria-hidden="true"
											/>
										</span>
										<span
											onClick={() => handleDeleteAgency(agency.id)}
											className=" rounded-lg cursor-pointer  p-2 "
										>
											<TrashIcon
												className="h-5 w-5 text-gray-500 hover:text-red-400"
												aria-hidden="true"
											/>
										</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
