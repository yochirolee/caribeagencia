import { React } from "react";
export const UnGroupContainerStats = ({ productList, selectedContainer,productsInContainer }) => {
	if (!productList) return;
	const undeclared = productList?.filter((product) => product?.StatusId == 3);

	return (
		<div className="flex border-b py-2 items-center md:gap-6   ">
			<div className="p-2 text-xs flex flex-col md:flex-row items-center text-center  ">
				Total Desagrupado:
				<span className="mx-2 px-2 py-1  text-violet-700 bg-violet-100  rounded-lg ">
					{productList?.length + undeclared.length}
				</span>
			</div>
			<div className=" p-2 text-xs flex flex-col md:flex-row items-center text-center  ">
				Correctos:
				<span className="mx-2 px-2 py-1  text-green-700 bg-green-100  rounded-lg ">
					{productList?.length}
				</span>
			</div>
			<div className=" p-2 text-xs flex flex-col md:flex-row items-center text-center  ">
				No Manifestados:
				<span className=" mx-2 py-1 px-2 text-orange-700 bg-orange-100 rounded-lg">
					{undeclared?.length}
				</span>
			</div>

			<div className="p-2 text-xs flex flex-col md:flex-row items-center text-center">
				Faltantes:
				<span className="mx-2 px-2 py-1 text-red-700 bg-red-100 rounded-lg ">
					{productsInContainer ? productsInContainer.length :0 }
				</span>
			</div>
		</div>
	);
};
