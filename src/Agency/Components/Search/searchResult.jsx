import { React } from "react";
import { ProductTrackingHistory } from "../../Pages/Tracking/Components/ProductTrackingHistory/productTrackingHistory";

export const SearchResult = ({ selectedProductDetails }) => {
	console.log(selectedProductDetails, "PRDOCUTS DETAULS");
	return (
		<div className="relative w-full h-screen  md:h-auto">
			<div className="relative bg-white rounded-lg  dark:bg-gray-700">
				{selectedProductDetails ? (
					<div className="bg-gray-50 p-4 rounded-lg">
						<div className="">
							<div className="flex items-center text-sm gap-6 ">
								<div className="flex flex-row items-center  gap-2">
									<span className="font-semibold"> Factura:</span>
									<p className="rounded p-1  text-blue-600  border bg-blue-200">
										<a
											target="_blank"
											href={`https://systemcaribetravel.com/ordenes/factura_print.php?id=${selectedProductDetails?.InvoiceId}`}
										>
											{selectedProductDetails?.InvoiceId}
										</a>
									</p>
								</div>
								<div className="flex flex-row items-center gap-2">
									<span className="font-semibold"> Etiquetas:</span>
									<p className="rounded p-1  text-yellow-600  border bg-yellow-200">
										<a
											target="_blank"
											href={`https://systemcaribetravel.com/ordenes/etiqueta_print_transcargo.php?id=${selectedProductDetails?.InvoiceId}`}
										>
											{selectedProductDetails?.InvoiceId}
										</a>
									</p>
								</div>
							</div>
							<div className="flex flex-col  mt-4 text-xs p-2 gap-2">
								<p>
									<span className="font-semibold">Provincia:</span>{" "}
									{selectedProductDetails?.Reciever?.Province}
								</p>
								<p>
									<span className="font-semibold">Municipio:</span>{" "}
									{selectedProductDetails?.Reciever?.Municipality}
								</p>
								<p>
									<span className="font-semibold">Direccion:</span>{" "}
									{selectedProductDetails?.Reciever?.Address}
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 border-t py-3 gap-10 justify-between text-xs">
							<div className="flex flex-col gap-2">
								<span className="font-semibold">Cliente:</span>
								<div className="flex gap-2 ">
									<p>Nombre:</p>
									{selectedProductDetails?.Customer?.Name +
										" " +
										selectedProductDetails?.Customer?.LastName}
								</div>
								<div className="flex gap-2 ">
									<p>Movil:</p>
									{selectedProductDetails?.Customer?.Mobile}
								</div>
							</div>

							<div className="flex flex-col gap-2 ">
								<span className="font-semibold">Recibe:</span>
								<div className="flex gap-2 ">
									<p>Nombre:</p>
									{selectedProductDetails?.Reciever?.Name +
										" " +
										selectedProductDetails?.Reciever?.LastName}
								</div>
								<div className="flex gap-2 ">
									<p>Movil:</p>
									{selectedProductDetails?.Reciever?.Mobile}
								</div>
							</div>
						</div>
					</div>
				) : (
					""
				)}
				<div className="px-6">
					<div className="  flex flex-col text-sm gap-2 mb-4 overflow-x-auto ">
						{selectedProductDetails?.Products ? (
							<div>
								{selectedProductDetails?.Products.map((product, index) => (
									<ProductTrackingHistory key={index} product={product} />
								))}
							</div>
						) : (
							<ProductTrackingHistory product={selectedProductDetails} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
