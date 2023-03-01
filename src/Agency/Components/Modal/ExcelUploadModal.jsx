import { Fragment, React, useState } from "react";
import { useFetchProductsList } from "../../hooks/useFetchTrackingByHBL";
import { useImportHblsFromExcel } from "../../hooks/useExcel/useImportHblsFromExcel";
import { useSetProductListLocation } from "../../hooks/useSetProductListLocation";
import { InputFiles } from "../ui/Inputs/InputFiles";
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import { TableImportProducts } from "../Tables/TableProductsToImport";
import { InputHBL } from "../ui/Forms/InputHBL";

export const ExcelUploadModal = ({ showModal, setShowModal, Location, setIsLoading }) => {
	const [files, setFiles] = useState("");
	const importedHBLSFromExcel = useImportHblsFromExcel(files);
	const { data: productList, isLoading, isError } = useFetchProductsList(importedHBLSFromExcel);
	const mutationProductList = useSetProductListLocation();
	const { user } = useSelector((state) => state.Auth);
	const [startDate, setStartDate] = useState(new Date());

	const handleImport = async (event) => {
		setFiles(event.target.files);
	};
/* 	const handleHbl = (hbl) => {
		console.log(hbl);
		productList.push(hbl);
	}; */
	const handleOnSave = () => {
		mutationProductList.mutateAsync({
			products: productList,
			locationId: Location.LocationId,
			UserId: user,
			CreatedAt: startDate,
		});
		setShowModal(false);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<Transition.Root show={showModal} as={Fragment}>
				<Dialog as="div" className="relative z-20" initialFocus={""} onClose={setShowModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
									<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
											Cambiar a {Location.LocationName}
										</h3>
										<button
											onClick={() => handleCloseModal()}
											type="button"
											className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
											data-modal-toggle="staticModal"
										>
											<i className="fas fa-close text-md text-red-400"></i>
										</button>
									</div>
									<div className="flex flex-col  justify-between gap-2 items-center p-4 lg:p-10">
{/* 										<InputHBL handleHBL={handleHbl} />
 */}										<InputFiles handleImport={handleImport} />
										<ReactDatePicker
											className="rounded-lg w-full text-sm border-gray-400"
											selected={startDate}
											onChange={(date) => setStartDate(date)}
										/>
										<TableImportProducts
											productList={productList}
											isLoading={isLoading}
											isError={isError}
										/>
										<div>
											<button
												type="button"
												onClick={() => handleOnSave()}
												className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
											>
												Adicionar
											</button>
											<button
												onClick={() => handleCloseModal()}
												type="button"
												className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
											>
												Cancel
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};
