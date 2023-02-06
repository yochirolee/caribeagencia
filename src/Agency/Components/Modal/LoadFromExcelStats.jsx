import { React, useMemo } from "react";
export const LoadFromExcelStats = ({ selectedContainer, productList }) => {
	if (!productList) return;

	
	return (
		<div className="flex">
			<div className="p-2 text-xs flex flex-col md:flex-row items-center text-center  ">
				HBL Cargados:
				<span className="mx-2 px-2 py-1  text-blue-700 bg-blue-100  rounded-lg ">
					{productList?.length}
				</span>
			</div>

		
		</div>
	);
};
