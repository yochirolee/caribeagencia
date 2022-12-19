import { React } from "react";
import { HistoryTimeLine } from "./HistoryTimeLine";
export const ItemsDetailsModal = ({
	itemDetails,
	showModalDetails,
	setShowModalDetails,
	isLoadingDetails,
}) => {
	return (
		<div className="absolute w-full z-30    grid items-center   bg-gray-200/80 justify-center mx-auto">
			<div
				id="defaultModal"
				tabindex="-1"
				aria-hidden="true"
				className={`${
					showModalDetails
						? " top-0 left-0 right-0  w-full mx-auto p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full "
						: "hidden"
				} `}
			>
				<div className="relative w-full h-full max-w-2xl md:h-auto">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
							<h3 className="text-base font-semibold text-gray-900 dark:text-white">
								Detalles de Orden
							</h3>
							<button
								type="button"
								onClick={() => setShowModalDetails(false)}
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="defaultModal"
							>
								<svg
									aria-hidden="true"
									class="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>
						{isLoadingDetails ? (
							<div className="p-6 space-y-4 flex flex-col items-center">
								<div role="status">
									<svg
										aria-hidden="true"
										class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
									<span class="sr-only">Loading...</span>
								</div>
								<p>Loading Please Wait</p>
							</div>
						) : (
							<div className="p-6 space-y-">
								<div className="">
									<div className=" p-4  flex flex-col text-sm gap-2 ">
										<div className="flex items-center gap-4">
											<span className="font-semibold">HBL:</span>
											<p className="rounded my-6 p-2 bg-blue-600 text-white">{itemDetails?.HBL}</p>
											<p className="rounded my-6 p-2 border border-green-500 text-green-700 ">
												{itemDetails?.Location}
											</p>
										</div>

										<HistoryTimeLine history={itemDetails.trackingHistory} />
									</div>
									{itemDetails?.Details ? (
										<div>
											<div>
												<div className="flex items-center gap-6 my-4">
													<div className="flex flex-row items-center gap-2">
														<span className="font-semibold"> Factura:</span>
														<p className="rounded p-2  text-blue-600 underline border bg-blue-200">
															<a
																target="_blank"
																href={`https://systemcaribetravel.com/ordenes/factura_print.php?id=${itemDetails?.Details?.InvoiceId}`}
															>
																{itemDetails?.Details?.InvoiceId}
															</a>
														</p>
													</div>
													<div className="flex flex-row items-center gap-2">
														<span className="font-semibold"> Etiquetas:</span>
														<p className="rounded p-2  text-yellow-600 underline border bg-yellow-200">
															<a
																target="_blank"
																href={`https://systemcaribetravel.com/ordenes/etiqueta_print_transcargo.php?id=${itemDetails?.Details?.InvoiceId}`}
															>
																{itemDetails?.Details?.InvoiceId}
															</a>
														</p>
													</div>
												</div>
												<div className="flex flex-col text-xs p-2 gap-2">
													<p>
														<span className="font-semibold">Descripcion:</span>{" "}
														{itemDetails?.Details?.Description}
													</p>
													<p>
														<span className="font-semibold">Contenedor:</span>{" "}
														{itemDetails?.Details?.ContainerNumber}
													</p>
													<p>
														<span className="font-semibold">Provincia:</span>{" "}
														{itemDetails?.Details?.Reciever?.Province}
													</p>
													<p>
														<span className="font-semibold">Municipio:</span>{" "}
														{itemDetails?.Details?.Reciever?.Municipality}
													</p>
													<p>
														<span className="font-semibold">Direccion:</span>{" "}
														{itemDetails?.Details?.Reciever?.Address}
													</p>
												</div>
											</div>
											<div className="grid grid-cols-2 border-t pt-3 gap-10 justify-between text-xs">
												<div className="flex flex-col gap-2">
													<span className="font-semibold">Cliente:</span>
													<div className="flex gap-2 ">
														<p>Nombre:</p>
														{itemDetails?.Details?.Customer?.Name +
															" " +
															itemDetails?.Details?.Customer?.LastName}
													</div>
													<div className="flex gap-2 ">
														<p>Movil:</p>
														{itemDetails?.Details?.Customer?.Mobile}
													</div>
												</div>

												<div className="flex flex-col gap-2 ">
													<span className="font-semibold">Recibe:</span>
													<div className="flex gap-2 ">
														<p>Nombre:</p>
														{itemDetails?.Details?.Reciever?.Name +
															" " +
															itemDetails?.Details?.Reciever?.LastName}
													</div>
													<div className="flex gap-2 ">
														<p>Movil:</p>
														{itemDetails?.Details?.Reciever?.Mobile}
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
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
