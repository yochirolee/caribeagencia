import { React } from "react";
import { ProductTrackingHistory } from "./ProductTrackingHistory/productTrackingHistory";
import { useFetchProductByHBL } from "../../../hooks/useFetchProductByHBL";
import { Spinner } from "flowbite-react";

export const ProductModalDetails = ({
	selectedProduct = null,
	showModalDetails,
	setShowModalDetails,
}) => {
	const {
		isLoading: isLoading,
		isError: isError,
		data: selectedProductDetails,
		error: error,
	} = useFetchProductByHBL(selectedProduct?.HBL);

	if (isError) console.log(error, "ERROR FETCHING DETAILS");

	return (
		
			<div className="absolute w-full z-30    grid items-center   bg-gray-200/80 justify-center mx-auto">
				<div
					id="defaultModal"
					tabIndex="-1"
					aria-hidden="true"
					className={`${
						showModalDetails
							? " top-0 left-0 right-0  w-full mx-auto p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full "
							: "hidden"
					} `}
				>
					<div className="relative w-full h-full max-w-2xl md:h-auto">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<div className="flex  items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
								<h3 className="text-base font-semibold text-gray-900 dark:text-white">
									Detalles del Producto
								</h3>
								<button
									type="button"
									onClick={() => setShowModalDetails(false)}
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="defaultModal"
								>
									<i className="fa fa-close text-lg"></i>
									<span className="sr-only">Close modal</span>
								</button>
							</div>
							{isLoading ? (
								<div className="flex justify-center m-4">
									<Spinner />
								</div>
							) : (
								<div className="px-6">
									<div className="">
										<div className=" p-4  flex flex-col text-sm gap-2 overflow-x-auto ">
											<ProductTrackingHistory product={selectedProductDetails} />
										</div>
										{selectedProductDetails ? (
											<div>
												<div>
													<div className="flex items-center gap-6 my-4">
														<div className="flex flex-row items-center gap-2">
															<span className="font-semibold"> Factura:</span>
															<p className="rounded p-2  text-blue-600 underline border bg-blue-200">
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
															<p className="rounded p-2  text-yellow-600 underline border bg-yellow-200">
																<a
																	target="_blank"
																	href={`https://systemcaribetravel.com/ordenes/etiqueta_print_transcargo.php?id=${selectedProductDetails?.InvoiceId}`}
																>
																	{selectedProductDetails?.InvoiceId}
																</a>
															</p>
														</div>
													</div>
													<div className="flex flex-col text-xs p-2 gap-2">
														<p>
															<span className="font-semibold">Descripcion:</span>{" "}
															{selectedProductDetails?.Description}
														</p>
														<p>
															<span className="font-semibold">Contenedor:</span>{" "}
															{selectedProductDetails?.ContainerNumber}
														</p>
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
												<div className="grid grid-cols-2 border-t pt-3 gap-10 justify-between text-xs">
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
									</div>
								</div>
							)}

							<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
								<button
									onClick={() => setShowModalDetails(false)}
									data-modal-toggle="defaultModal"
									type="button"
									className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
								>
									Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>
			
		</div>
	);
};
