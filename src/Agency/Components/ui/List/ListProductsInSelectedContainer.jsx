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
					className="flex justify-between bg-white items-center  text-xs py-4 rounded-lg shadow-sm m-2  hover:bg-gray-100  hover:ring-1"
				>
					<div
						onClick={() => handleOnSelectedProduct(product)}
						className="flex flex-col  items-center px-2 text-center"
					>
						<p className="  rounded-md  text-blue-500/90  font-semibold ">{product?.InvoiceId}</p>
						<span>Factura</span>
					</div>
					<div class="hidden mx-2 md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
					<div className="flex flex-col mx-2 ">
						<p className="font-bold  ">{product?.HBL}</p>

						<p className="text-[11px]">{product?.Description}</p>
					</div>
					<i
						className="fa fa-plus mx-2 pr-4"
						onClick={() => handleUngroupContainer(product?.HBL)}
					></i>
				</div>
			))}
		</div>
	);
};
