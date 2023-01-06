import { Spinner } from "flowbite-react";
import { React } from "react";
import { useFetchProductsInContainerByContainerId } from "../../../hooks/useFetchProductsInContainerByContainerId";

export const ListProductsInSelectedContainer = ({ isLoading,productsInContainer }) => {
	
	if (isLoading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);
	return (
		<div className="h-screen overflow-y-auto">
			{productsInContainer?.map((product) => (
				<div
					key={product?.HBL}
					className="flex bg-white items-center text-xs py-4 rounded-lg shadow-sm m-2 "
				>
					<div className="flex flex-col gap-1 items-center px-2 text-center">
						<span>Factura</span>
						<p className="text-green-600  rounded-md bg-green-300/20 font-semibold p-2">
							{product?.InvoiceId}
						</p>
					</div>
					<div class="hidden mx-2 md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
					<div className="flex flex-col mx-2 ">
						<p className="font-bold text-zinc-700 ">{product?.HBL}</p>

						<p className="text-[11px]">{product?.Description}</p>
					</div>
				</div>
			))}
		</div>
	);
};
