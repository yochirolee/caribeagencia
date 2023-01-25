import { React } from "react";
export const UnGroupContainerStats = ({ productList, selectedContainer }) => {
	if (!productList) return;
	const filterResult = productList?.filter((product) => product?.IsSpare == true);

	return (
		<div className="flex border-b py-2 items-center md:gap-6   ">
			<div className="p-2 text-xs flex flex-col md:flex-row items-center text-center  ">
				En Contenedor:
				<span className="mx-2 px-2 py-1  text-violet-700 bg-violet-100  rounded-lg ">
					{selectedContainer?.ProductsQuantity
						? selectedContainer?.ProductsQuantity - (productList?.length - filterResult?.length)
						: "0"}{" "}
				</span>
			</div>
			<div className=" p-2 text-xs flex flex-col md:flex-row items-center text-center  ">
				Desagrupados:
				<span className="mx-2 px-2 py-1  text-blue-700 bg-blue-100  rounded-lg ">
					{productList?.length ? productList?.length : "0"}{" "}
				</span>
			</div>
			<div className="p-2 text-xs flex flex-col md:flex-row items-center text-center">
				Correctos:
				<span className="mx-2 px-2 py-1 text-green-700 bg-green-100 rounded-lg ">
					{productList?.length ? productList?.length - filterResult?.length : "0"} de{" "}
					{selectedContainer?.ProductsQuantity}
				</span>
			</div>
			<div className=" p-2 text-xs flex flex-col md:flex-row items-center text-center  ">
				No Manifestados:
				<span className=" mx-2 py-1 px-2 text-red-700 bg-red-100 rounded-lg">
					{filterResult?.length}
				</span>
			</div>
		</div>
	);
};
