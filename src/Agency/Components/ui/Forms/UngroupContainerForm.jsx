import { Spinner } from "flowbite-react";
import { useRef } from "react";
import { React } from "react";

export const UnGroupContainerForm = ({ handleUngroupContainer, isLoadingProducts }) => {
	let unGroupHBLRef = useRef();

	const handleUngroupHBL = async (e) => {
		e.preventDefault();
		if(unGroupHBLRef.current.value.trim().length>10 && unGroupHBLRef.current.value.trim().length<20 )
		await handleUngroupContainer(unGroupHBLRef.current.value.trim());
		unGroupHBLRef.current.value = "";
	};
	return (
		<>
			<form onSubmit={handleUngroupHBL}>
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Desagrupe de Contenedor
				</label>
				<div className="relative mb-6">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<i className="fa fa-barcode"></i>
					</div>
					<input
						type="text"
						ref={unGroupHBLRef}
						id="input-group-1"
						className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Producto a Desagrupar"
					/>
					{isLoadingProducts ? (
						<div className="text-center">
							<Spinner />
						</div>
					) : (
						""
					)}
				</div>
			</form>
		</>
	);
};
