import { React, useState } from "react";
import { read, utils } from "xlsx";
import { supabase } from "../../../../Supabase/SupabaseClient";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { QrReader } from "react-qr-reader";

export const UploadModal = ({ showModal, setShowModal, Location, isLoading, setIsLoading }) => {
	const [itemsToUpdate, setItemsToUpdate] = useState([]);
	const [isScanning, setIsScanning] = useState(false);
	const inputFileRef = useRef();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const handleImport = async (event) => {
		const files = event.target.files;

		if (files.length) {
			const file = files[0];
			const reader = new FileReader();
			reader.onload = (event) => {
				const wb = read(event.target.result);
				const sheets = wb.SheetNames;
				console.log(sheets, wb);

				if (sheets.length) {
					const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);

					let listItems = rows.map((row) => {
						if (!!row) return { HBL: row.HBL, Location: Location.Location };
					});
					console.log(listItems, "LIST ITEMS");
					if (listItems.length > 0) {
						setItemsToUpdate(listItems);
						console.log(listItems);
					}
				}
			};
			reader.readAsArrayBuffer(file);
		}
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();
		if (data.TrackingId.length > 8) {
			let newTracking = { HBL: data.TrackingId, Location: Location.Location };

			setItemsToUpdate([...itemsToUpdate, newTracking]);
			console.log(itemsToUpdate);

			reset();
		}
	};

	const handleOnSave = async () => {
		setIsLoading(true);
		const response = await supabase
			.from("tracking")
			.upsert(itemsToUpdate, { onConflict: "HBL" })
			.select("*");
		const { data, status, statusText } = response;
		console.log(response, "RESPONSE");
		console.log(data, status, statusText, "tracking SElecting");

		const dataToInsert = itemsToUpdate.map((product) => {
			product.HBLLocation = product.HBL + "-" + Location.LocationId;
			product.Location = Location.Location;
			return product;
		});

		const {
			data: history,
			error: errorHistory,
			statusText: statusText2,
		} = await supabase
			.from("trackingHistory")
			.upsert(dataToInsert, { onConflict: "HBLLocation" })
			.select();
		if (data) setShowModal(false);

		setIsLoading(false);
		setItemsToUpdate([]);
		inputFileRef.current.value = "";
	};

	const handleCloseModal = () => {
		setItemsToUpdate([]);
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
				<div className="relative w-full h-full max-w-2xl  md:h-auto">
					<div className="relative flex flex-col gap-2 bg-white text-center rounded-lg shadow dark:bg-gray-700">
						<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Cambiar a {Location.Location}
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
						{isScanning ? (
							"<QrReader />"
						) : (
							<div className="p-2 lg:p-10 ">
								<div className="border p-2 text-sm rounded-lg">
									<div className="py-2">
										<div className=" ">
											<input
												ref={inputFileRef}
												type="file"
												name="file"
												className="custom-file-input"
												id="inputGroupFile"
												required
												onChange={(event) => handleImport(event)}
												accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
											/>
										</div>
									</div>
								</div>
								<p>o</p>
								<div className="mt-5 border rounded-lg p-4">
									<form
										onSubmit={handleSubmit(onSubmit)}
										className="flex flex-col lg:flex-row gap-2 items-center"
									>
										<label className="text-xs">Ingrese HBL</label>
										<input {...register("TrackingId")} type="text" className="rounded-lg "></input>

										<div className="flex  gap-2">
											<button
												type="submit"
												className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
											>
												Adicionar
											</button>
											<button className="border rounded-lg">
												<i className="fa fa-camera text-blue-500 text-lg p-1.5 px-2"></i>
											</button>
										</div>
									</form>
								</div>
							</div>
						)}
						<div
							className={`${
								itemsToUpdate?.length > 0 ? " mt-10 h-40  overflow-y-scroll text-xs" : "hidden"
							} `}
						>
							<table className="w-full">
								<thead>
									<tr>
										<th>HBL</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{itemsToUpdate?.length ? (
										itemsToUpdate.map((item, index) => (
											<tr
												key={index}
												className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
											>
												<th
													scope="row"
													className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
												>
													{item.HBL}
												</th>
												<td className="py-4 px-6 ">
													<span className="border px-2 py-0.5 rounded-lg text-xs text-white bg-green-500">
														{item.Location}
													</span>
												</td>

												<td className="py-4 px-6">
													<a href="#" className="font-medium text-red-400 dark:text-red-500 ">
														<i className="fas fa-trash"></i>
													</a>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td className="text-center text-sm">No Found.</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						<span className=" w-1/2 mx-auto border p-2 bg-gray-100 rounded-lg text-sm">
							Total de Items: {itemsToUpdate?.length}
						</span>
						<div className="flex justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={() => handleOnSave()}
								data-modal-toggle="staticModal"
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								{isLoading ? "Actualizando" : "Guardar"}
							</button>
							<button
								onClick={() => handleCloseModal()}
								data-modal-toggle="staticModal"
								type="button"
								className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
