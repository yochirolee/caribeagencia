import { Spinner } from "flowbite-react";
import { React } from "react";

export const ProductsInContainer = ({ productsInContainer, isLoadingProducts }) => {
	if (isLoadingProducts)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<div className="h-96 overflow-y-auto">
			<h1 className="text-center">
				Productos en Contenedor {productsInContainer?.products?.length}
			</h1>
			{productsInContainer
				? productsInContainer?.products?.map((product, index) => (
						<div key={index} className="flex flex-col gap-2 text-xs border p-2 m-2 rounded-lg ">
							<div className="flex justify-between  items-center">
								<span className="text-white bg-blue-500 p-1 rounded-lg">{product.HBL}</span>
								<div className="flex gap-2 items-center">
									<p>Factura:</p>
									<span className="p-1 bg-green-200 text-green-700 rounded-lg ">
										{product.InvoiceId}
									</span>
								</div>
							</div>
							<div className="flex justify-between">
								<div className=" grow-0 gap-2 p-2  lowercase">
									<span>{product.Description}</span>
								</div>
							</div>
						</div>
				  ))
				: ""}
		</div>
	);
};
