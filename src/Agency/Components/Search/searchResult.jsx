import { React } from "react";
import { ProductTrackingHistory } from "../../Pages/Tracking/Components/ProductTrackingHistory/productTrackingHistory";

export const SearchResult = ({ selectedProductDetails, setSearch }) => {
	return (
		<div className="relative w-full  h-auto">
			<div className="relative bg-white rounded-lg mt-10 dark:bg-gray-700">
				{selectedProductDetails ? (
					<div className="bg-gray-50 p-4 rounded-lg py-10">
						<div className="">
							<div className="flex justify-end">
								<button
									onClick={() => setSearch(undefined)}
									type="button"
									className="inline-flex items-center p-0.5 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
									data-dismiss-target="#badge-dismiss-dark"
									aria-label="Remove"
								>
									<svg
										aria-hidden="true"
										className="w-3.5 h-3.5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										></path>
									</svg>
									<span className="sr-only">Remove badge</span>
								</button>
							</div>
							<div className="flex items-center text-sm gap-6 ">
								<div className="flex flex-row items-center  gap-2">
									<span className="font-semibold"> Factura:</span>
									<p className="rounded p-1  text-blue-600  border bg-blue-200">
										<a
											target="_blank"
											href={`https://systemcaribetravel.com/ordenes/factura_print.php?id=${selectedProductDetails?.invoiceId}`}
										>
											{selectedProductDetails?.invoiceId}
										</a>
									</p>
								</div>
								<div className="flex flex-row items-center gap-2">
									<span className="font-semibold"> Etiquetas:</span>
									<p className="rounded p-1  text-yellow-600  border bg-yellow-200">
										<a
											target="_blank"
											href={`https://systemcaribetravel.com/ordenes/etiqueta_print_transcargo.php?id=${selectedProductDetails?.invoiceId}`}
										>
											{selectedProductDetails?.invoiceId}
										</a>
									</p>
								</div>
							</div>
							<div className="flex flex-col  mt-4 text-xs p-2 gap-2">
								<p>
									<span className="font-semibold">Provincia:</span>{" "}
									{selectedProductDetails?.reciever?.province}
								</p>
								<p>
									<span className="font-semibold">Municipio:</span>{" "}
									{selectedProductDetails?.reciever?.municipality}
								</p>
								<p>
									<span className="font-semibold">Direccion:</span>{" "}
									{selectedProductDetails?.reciever?.address}
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 border-t py-3 gap-10 justify-between text-xs">
							<div className="flex flex-col gap-2">
								<span className="font-semibold">Cliente:</span>
								<div className="flex gap-2 ">
									<p>Nombre:</p>
									{selectedProductDetails?.customer?.name +
										" " +
										selectedProductDetails?.customer?.lastName}
								</div>
								<div className="flex gap-2 ">
									<p>Movil:</p>
									{selectedProductDetails?.customer?.mobile}
								</div>
							</div>

							<div className="flex flex-col gap-2 ">
								<span className="font-semibold">Recibe:</span>
								<div className="flex gap-2 ">
									<p>Nombre:</p>
									{selectedProductDetails?.reciever?.name +
										" " +
										selectedProductDetails?.reciever?.lastName}
								</div>
								<div className="flex gap-2 ">
									<p>Movil:</p>
									{selectedProductDetails?.reciever?.mobile}
								</div>
							</div>
						</div>
						<div className="px-6">
							<div className="  flex flex-col text-sm gap-2 mb-4 overflow-x-auto ">
								{selectedProductDetails?.packages ? (
									<div>
										{selectedProductDetails?.packages.map((product, index) => (
											<ProductTrackingHistory key={index} product={product} />
										))}
									</div>
								) : (
									<ProductTrackingHistory product={selectedProductDetails} />
								)}
							</div>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};
