import { React, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { supabase } from "../../../Supabase/SupabaseClient";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { useFetchContainerByContainerId } from "../../hooks/useContainers/useFetchContainerByContainerId";
import { useFetchContainersInPort } from "../../hooks/useContainers/useFetchContainersInPort";
import { useSetProductListLocation } from "../../hooks/useSetProductListLocation";

const createContainerData = (containerData) => {
	const newContainer = {
		ContainerId: containerData.ContainerId,
		ProductsQuantity: containerData.ProductsQuantity,
		Master: containerData.Master,
		StartLoadingDate: containerData.StartLoadingDate,
		EndLoadingDate: containerData.EndLoadingDate,
		Weight: containerData.Weight,
		SealedNumber: containerData.SealedNumber,
		ContainerNumber: containerData.ContainerNumber,
	};
	return newContainer;
};

const insertContainer = async (newContainer) => {
	const { data, error } = await supabase
		.from("containers")
		.upsert([newContainer], { onConflict: "ContainerId" });
};

export const ContainerInPort = () => {
	const [startDate, setStartDate] = useState(new Date());
	const { user } = useSelector((state) => state.Auth);
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const { data: ContainersInPort } = useFetchContainersInPort();
	const { isLoading, data: container } = useFetchContainerByContainerId(selectedContainer);
	const mutationProductList = useSetProductListLocation();

	const handleContainerToPort = async () => {
		const newContainer = createContainerData(container?.data);
		await insertContainer(newContainer);
		mutationProductList.mutateAsync({
			products: container?.products,
			locationId: 1,
			user: user,
			StatusId: 1,
			CreatedAt: startDate,
		});
	};

	return (
		<div className="flex flex-col  lg:h-[calc(100vh-60px)] md:flex-row relative   overflow-y-auto ">
			<aside className="min-w-[300px] lg:w-2/6  overflow-x-hidden flex flex-col  border-r p-4  text-sm overflow-y-auto bg-gray-50">
				<ContainerSelect
					selectedContainer={selectedContainer}
					setSelectedContainer={setSelectedContainer}
				/>
				<div className="py-2 ">
					<ReactDatePicker
						className="rounded-lg w-full text-sm border-gray-400"
						selected={startDate}
						onChange={(date) => setStartDate(date)}
					/>
				</div>
				{isLoading ? (
					<div>Loading....</div>
				) : (
					selectedContainer && (
						<div
							id="container_stats"
							className="flex flex-col gap-4 mt-4 bg-white rouded-white p-2 border rounded-lg text-xs"
						>
							<h3>Container: {container?.data?.ContainerNumber}</h3>
							<h3>Sello: {container?.data?.SealedNumber}</h3>
							<h3>Peso en Lbs: {container?.data?.Weight} Lbs</h3>
							<h3>Total de HBL: {container?.products?.length} </h3>
						</div>
					)
				)}
				<div className="flex items-center mt-4 justify-center">
					<button
						disabled={isLoading && !selectedContainer}
						onClick={() => handleContainerToPort()}
						className="p-2 border bg-blue-500 text-white text-xs rounded-lg"
					>
						Trasladar a Puerto
					</button>
				</div>
			</aside>
			<div className=" p-8  container ">
				<div>
					<h3>Contenedores en Puerto del Mariel</h3>
					<div className="container  mt-4">
						{ContainersInPort?.map((container) => (
							<div key={container?.ContainerId} className="flex gap-4 p-4 my-1 border rounded-lg">
								<span>Contenedor: {container?.ContainerNumber}</span>
								<span>ContainerId: {container?.ContainerId}</span>
								<span>Productos: {container?.ProductsQuantity}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
