import { React, useState } from "react";
import { useFetchProductsList } from "../../../hooks/useFetchTrackingByHBL";
import { useImportHblsFromExcel } from "../../../hooks/useExcel/useImportHblsFromExcel";
import { useSetProductListLocation } from "../../../hooks/useSetProductListLocation";
import { ListProducts } from "../../../Components/ui/List/ListProducts";
import { InputFiles } from "../../../Components/ui/Inputs/InputFiles";
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const UploadModal = ({ showModal, setShowModal, Location, setIsLoading }) => {
	const [files, setFiles] = useState("");
	const importedHBLSFromExcel = useImportHblsFromExcel(files);
	const { data: productList, isLoading, isError } = useFetchProductsList(importedHBLSFromExcel);
	const mutationProductList = useSetProductListLocation();
	const { user } = useSelector((state) => state.Auth);
	const [startDate, setStartDate] = useState(new Date());

	const handleImport = async (event) => {
		setFiles(event.target.files);
	};
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
		<div
			className={`${
				showModal
					? "absolute  w-full z-10 lg:grid h-screen  justify-center    bg-gray-200/80  mx-auto"
					: "hidden"
			}  `}
		>
			<div
				id="staticModal"
				data-modal-backdrop="static"
				tabIndex="-1"
				aria-hidden="true"
				className="top-0 left-0 right-0  w-full p-4   md:inset-0 h-modal md:h-full"
			>
				<div className="relative flex flex-col gap-2 bg-white text-center  shadow dark:bg-gray-700">
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
							<i className="fas fa-close text-md"></i>
						</button>
					</div>
					<div className="relative w-full   max-w-3xl  md:h-auto">
						<div className="relative  flex flex-col gap-2 bg-white text-center rounded-lg shadow dark:bg-gray-700">
							<div className="flex flex-col justify-between gap-2 items-center px-4">
								<InputFiles handleImport={handleImport} />
								<ReactDatePicker
									className="rounded-lg w-full text-sm border-gray-400"
									selected={startDate}
									onChange={(date) => setStartDate(date)}
								/>
								{isLoading ? (
									<div>Cargando</div>
								) : (
									<div>
										<div className="h-1/2 w-full lg:h-[calc(100vh-250px)]">
											<ListProducts
												productList={productList}
												isLoading={isLoading}
												isError={isError}
											/>
											<div className="inline-flex gap-4 mx-auto text-xs p-4">
												<button
													onClick={() => handleOnSave()}
													className="border p-2 rounded-lg bg-blue-600 text-white"
												>
													Adicionar
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	);
};
