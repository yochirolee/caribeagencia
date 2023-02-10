import { React, useMemo } from "react";
import { Spinner } from "flowbite-react";

export const ListProductsInSelectedContainer = ({
	isLoading,
	productsInContainer,
	handleOnSelectedProduct,
	handleUngroupContainer,
}) => {
	if (isLoading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<div className="md:h-screen h-20 overflow-y-auto">
			{productsInContainer?.map((product) => (
				<div
					key={product?.HBL}
					className="grid grid-flow-col grid-cols-4 justify-between bg-white items-center  text-xs py-4 rounded-lg shadow-sm m-2   hover:ring-1"
				>
					<div
						onClick={() => handleOnSelectedProduct(product)}
						className="flex   flex-col cursor-pointer   items-center   border-r"
					>
						<p className="  rounded-md  text-blue-500/90  font-semibold ">{product?.InvoiceId}</p>
						<span className="hover:font-bold hover:text-blue-500">Factura</span>
					</div>
					<div className="flex flex-col mx-2 col-span-3 ">
						<p className="font-bold  ">{product?.HBL}</p>

						<p className="text-[11px]">{product?.Description}</p>
					</div>
					<i
						className="fa fa-chevron-right hover:border text-center border-green-500 p-2 rounded-full mx-2 w-6 h-6 p text-green-500 cursor-pointer"
						onClick={() => handleUngroupContainer(product?.HBL)}
					></i>
				</div>
			))}
		</div>
	);
};
