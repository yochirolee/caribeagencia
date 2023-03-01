import { useRef } from "react";
import { React } from "react";

export const InputHBL = ({ handleHBL, isLoadingProducts, placeHolder }) => {
	let HBL = useRef();

	const handleHBLAction = (e) => {
		e.preventDefault();
		if (HBL.current.value.trim().length > 3 && HBL.current.value.trim().length < 20) {
			handleHBL(HBL.current.value.toUpperCase().trim());
		} else {
			const splitter = HBL.current.value.split(",");
			HBL.current.value = splitter[1];
			handleHBL(HBL.current.value.toUpperCase().trim());
		}
		HBL.current.value = "";
	};
	return (
		<>
			<form onSubmit={handleHBLAction}>
				<h1>Buscar</h1>
				<div className="relative ">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<i className="fa fa-barcode"></i>
					</div>
					<input
						type="text"
						ref={HBL}
						id="input-group-1"
						className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder={placeHolder}
						disabled={isLoadingProducts}
					/>
				</div>
			</form>
		</>
	);
};
