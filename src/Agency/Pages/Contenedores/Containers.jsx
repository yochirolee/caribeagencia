import { useEffect } from "react";
import { React, useState } from "react";
import { useQuery } from "react-query";
import { fetchContainerById } from "../../Helpers/Containers/fetchContainerById";
import { fetchContainers } from "../../Helpers/Containers/fetchContainers";
import ContainerSelect from "./Components/ContainerSelect";
import { ContainerUngroup } from "./Components/ContanierUnGroup";
import { ProductsInContainer } from "./Components/ProductsInContainer";

export const Containers = () => {
	const [productsRecieved, setProductsRecieved] = useState([]);
	const [productToUnGroup, setProductToUnGroup] = useState(undefined);

	const {
		isLoading,
		isError,
		data: Containers,
		error,
	} = useQuery("containers", () => fetchContainers());

	const [selectedContainer, setSelectedContainer] = useState([]);

	const {
		isLoading: isLoadingProducts,
		isError: isErrorProducts,
		data: productsInContainer,
		error: errorProducts,
	} = useQuery(
		["ProductsInContainer", selectedContainer.ContainerId],
		() => fetchContainerById(selectedContainer.ContainerId),
		{ enabled: !!selectedContainer },
	);


	useEffect(() => {
		setProductsRecieved([]);
	}, [selectedContainer.ContainerId]);

	

	const handleUnGroup = ({ HBL }) => {
		console.log("HANDLE UNGOU", HBL);
		console.log(productsInContainer.products);

		const findProductInContainer = productsInContainer.products.find(
			(product) => product.HBL === HBL,
		);

		if (findProductInContainer) setProductsRecieved([...productsRecieved, findProductInContainer]);
	};

	if (isLoading) return <p>Loading</p>;

	return (
		<div className="grid lg:grid-cols-8 xl:grid-cols-10 gap-10 ">
			<div className="col-span-2  flex flex-col  border-r p-4 lg:h-screen overflow-y-auto bg-gray-50">
				<ContainerSelect
					containers={Containers?.data}
					setSelectedContainer={setSelectedContainer}
					selectedContainer={selectedContainer}
				/>
				{selectedContainer.ContainerId ? (
					<div className=" my-4 text-xs  flex flex-col gap-2 bg-white p-2 rounded-lg border">
						<div className="flex">
							<p>Total de Productos: </p>{" "}
							<span className="ml-2">{selectedContainer.ProductsQuantity} </span>
						</div>
						<div className="flex">
							<p>Master: </p> <span className="ml-2">{selectedContainer.Master} </span>
						</div>
						<div className="flex">
							<p>Peso: </p> <span className="ml-2">{selectedContainer.Weight} Lbs </span>
						</div>
						<div className="flex">
							<p>Sello: </p> <span className="ml-2">{selectedContainer.SealedNumber} </span>
						</div>
					</div>
				) : (
					""
				)}
				<div>
					{selectedContainer.ContainerId ? (
						<ProductsInContainer
							productsInContainer={productsInContainer}
							isLoadingProducts={isLoadingProducts}
						/>
					) : (
						""
					)}
				</div>
			</div>

			<div >
				<ContainerUngroup 
					productsRecieved={productsRecieved}
					handleUnGroup={handleUnGroup}
					productsFails={productsInContainer?.products?.length}
				/>
			</div>
		</div>
	);
};
