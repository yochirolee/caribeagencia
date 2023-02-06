import { React, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useImportHblsFromExcel } from "../../hooks/useExcel/useImportHblsFromExcel";
import { useFetchProductsList } from "../../hooks/useFetchTrackingByHBL";
import { useSetProductListLocation } from "../../hooks/useSetProductListLocation";
import { InputFiles } from "../ui/Inputs/InputFiles";
import { ListProducts } from "../ui/List/ListProducts";
import { LoadFromExcelStats } from "./LoadFromExcelStats";

export const LoadFromExcelModal = ({ showModal, setShowModal, selectedContainer }) => {
	const [files, setFiles] = useState("");
	const { user } = useSelector((state) => state.Auth);

	const importedHBLSFromExcel = useImportHblsFromExcel(files);

	const { data: productList, isLoading, isError } = useFetchProductsList(importedHBLSFromExcel);

	const mutationProductList = useSetProductListLocation();

	const handleImport = (event) => {
		setFiles(event.target.files);
	};

	const handleUnGroupList = () => {
		mutationProductList.mutateAsync({
			products: productList,
			locationId: 2,
			user: user,
			StatusId: 2,
		});
	};

	return (
		<div
			className={`${
				showModal
					? "absolute  w-full z-10 lg:grid h-full  lg:h-[calc(100vh-60px)]   justify-center    bg-gray-200/80  mx-auto"
					: "hidden"
			}  `}
		>
			<div
				id="staticModal"
				data-modal-backdrop="static"
				tabIndex="-1"
				aria-hidden="true"
				className="top-0 left-0 right-0   p-4   md:inset-0 h-modal md:h-full"
			>
				<div className="relative w-full   max-w-3xl  md:h-auto">
					<div className="relative  flex flex-col gap-2 bg-white text-center rounded-lg shadow dark:bg-gray-700">
						<div className="flex items-center   justify-between p-4 border-b rounded-t dark:border-gray-600">
							<h3 className="text-sm font-semibold text-gray-900 dark:text-white">
								Cambiar a {Location.LocationName} {selectedContainer?.ContainerNumber}
							</h3>
							<button
								onClick={() => setShowModal(false)}
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="staticModal"
							>
								<i className="fas fa-close text-md"></i>
							</button>
						</div>
						<div className="flex flex-col justify-between gap-2 items-center px-4">
							<InputFiles handleImport={handleImport} />
							{isLoading ? (
								<div>Cargando</div>
							) : (
								<div>
									<LoadFromExcelStats
										selectedContainer={selectedContainer}
										productList={productList}
									
									/>
									<div className="h-1/2 lg:h-[calc(100vh-250px)]">
										<ListProducts
											productList={productList}
											selectedContainer={selectedContainer}
											isLoading={isLoading}
											isError={isError}
										/>
										<div className="inline-flex gap-4 mx-auto text-xs p-4">
											<button
												onClick={() => handleUnGroupList()}
												className="border p-2 rounded-lg bg-blue-600 text-white"
											>
												Guardar
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
	);
};
