import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { React, useState } from "react";
import SlideOver from "../SlideOvers/SlideOver";
import ServicePriceForm from "./ServicePriceForm";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { queryKeys } from "../../Hooks/QueryKeys/queryKeys";

const deletePriceService = async (id) => {
	if (!id) throw new Error({ message: "Por Favor ingrese los datos" });
	const { data } = await axios.delete(`http://localhost:3001/api/v1/servicesPrices/${id}`);
	return data;
};

export const ServicePriceList = ({ servicesPrices, selectedAgency, selectedService }) => {
	if (!servicesPrices) return "No hay precios de servicios";
	const [isOpenServicePriceForm, setIsOpenServicePriceForm] = useState(false);
	const [selectedServicePrice, setSelectedServicePrice] = useState(null);

	const queryClient = useQueryClient();
	const deleteServicePriceMutation = useMutation({
		mutationFn: (id) => deletePriceService(id),
		onSuccess: () => {
			queryClient.invalidateQueries(queryKeys.fetchServicesByAgency);
		},
	});

	const handleEditServicePrice = (servicePrice) => {
		setSelectedServicePrice(servicePrice);
		setIsOpenServicePriceForm(true);
	};

	return (
		<div>
			<table className=" text-left w-full mb-8 shadow-lg ">
				<thead className="bg-gray-700   ">
					<tr>
						<th scope="col" className=" gap-4 text-xs font-medium text-white px-6 py-1">
							Nombre
						</th>
						<th scope="col" className="text-xs font-medium text-white px-6 py-1">
							Precio Compra
						</th>

						<th scope="col" className="text-xs font-medium text-white px-6 py-1">
							Precio Venta
						</th>
						<th scope="col" className="text-xs font-medium text-white px-6 py-1">
							Margen
						</th>

						<th scope="col" className="text-xs font-medium text-white px-6 py-1">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{servicesPrices?.map((price) => (
						<tr key={price.id} className="   border-b bg-white ">
							<td className="text-xs text-gray-900   px-6   py-4 whitespace-nowrap">
								{price.name}
							</td>
							<td className="text-xs  text-gray-900  px-6   py-4 whitespace-nowrap">
								{parseFloat(price.buyPrice).toFixed(2)} usd
							</td>
							<td className="text-xs  text-gray-900  px-6   py-4 whitespace-nowrap">
								{parseFloat(price.sellPrice).toFixed(2)} usd
							</td>
							<td className="text-xs  text-gray-900  px-6   py-4 whitespace-nowrap">
								{parseFloat(price.sellPrice - price.buyPrice).toFixed(2)}
								{price.isSellByPounds ? " usd/lb" : "usd/unit"}
							</td>
							<td className="flex  text-gray-900  px-6 py-4 whitespace-nowrap">
								<div className="flex border-l border-dotted pl-4">
									<span className=" rounded-lg cursor-pointer  p-2 ">
										<PencilSquareIcon
											onClick={() => handleEditServicePrice(price)}
											className="h-5 w-5 text-gray-500 hover:text-green-400"
											aria-hidden="true"
										/>
									</span>
									<span className=" rounded-lg cursor-pointer  p-2 ">
										<TrashIcon
											onClick={() => deleteServicePriceMutation.mutate(price.id)}
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
			<SlideOver isOpen={isOpenServicePriceForm}>
				<ServicePriceForm
					servicePrice={selectedServicePrice}
					isOpen={isOpenServicePriceForm}
					setIsOpen={setIsOpenServicePriceForm}
					selectedAgency={selectedAgency}
					selectedService={selectedService}
					isEditing={true}
				/>
			</SlideOver>
		</div>
	);
};
