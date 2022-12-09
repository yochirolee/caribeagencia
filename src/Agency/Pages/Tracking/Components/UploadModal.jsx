import { React, useState } from "react";
import { read, utils } from "xlsx";
import axios from "axios";
import { supabase } from "../../../../Supabase/SupabaseClient";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRef } from "react";

export const UploadModal = ({ showModal, setShowModal, location,isLoading,setIsLoading }) => {
	
	const [itemsToUpdate, setItemsToUpdate] = useState([]);
	const inputFileRef = useRef();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setItemsToUpdate([]);
		inputFileRef.current.value = "";
	}, [showModal]);

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
						if (!!row) return { HBL: row.HBL, Location: location };
					});

					if (listItems.length > 0) {
						setItemsToUpdate(listItems);
					}
				}
			};
			reader.readAsArrayBuffer(file);
		}
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();
		if (data.TrackingId.length > 8) {
			let newTracking = { HBL: data.TrackingId, Location: location };

			setItemsToUpdate([...itemsToUpdate, newTracking]);

			reset();
		}
	};

	const handleOnSave = async () => {
		setIsLoading(true);
		console.log(itemsToUpdate, "ITEMS");
		const { data, error } = await supabase
			.from("tracking")
			.upsert(itemsToUpdate, { onConflict: "HBL" });
        console.log(data,"INSERTING ON HISTORY")
		const { data: history, error: errorHistory } = await supabase
			.from("trackingHistory")
			.insert(data);
		if (data) setShowModal(false);
		setIsLoading(false);
	};

	const ItemsExist = async (listItems) => {
		const dataSend = JSON.stringify(listItems);
		console.log(dataSend, "DATA SEND");
		const config = {
			headers: { "Content-Type": "application/json" },
		};
		try {
			const { data, status } = await axios.post(
				"https://caribe-cargo-api.vercel.app/api/items/",
				dataSend,
				config,
			);
			console.log(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={`${
				showModal
					? "absolute w-full z-10  h-screen  grid items-center  bg-gray-200/80 justify-center mx-auto"
					: "hidden"
			}  `}
		>
			<div
				id="staticModal"
				data-modal-backdrop="static"
				tabindex="-1"
				aria-hidden="true"
				className="top-0 left-0 right-0  w-full p-4   md:inset-0 h-modal md:h-full"
			>
				<div className="relative w-full h-full max-w-2xl  md:h-auto">
					<div className="relative flex flex-col gap-2 bg-white text-center rounded-lg shadow dark:bg-gray-700">
						<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Cambiar a {location}
							</h3>
							<button
								onClick={() => setShowModal(false)}
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="staticModal"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
							</button>
						</div>
						<div className=" p-10 ">
							<div className="border p-2 text-sm rounded-lg">
								<div className="py-2">
									<div className="custom-file">
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
										<label className="custom-file-label" htmlFor="inputGroupFile">
											Choose file
										</label>
									</div>
								</div>
							</div>
							<p>o</p>
							<div className="mt-5 border rounded-lg p-2">
								<form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center">
									<label>Ingrese HBL</label>
									<input {...register("TrackingId")} type="text"></input>
									<button
										type="submit"
										className="text-blue-400 border  border-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Adicionar
									</button>
								</form>
							</div>

							<div
								className={`${
									itemsToUpdate.length > 0 ? " mt-10 h-40  overflow-y-scroll text-xs" : "hidden"
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
										{itemsToUpdate.length ? (
											itemsToUpdate.map((item, index) => (
												<tr
													key={index}
													class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
												>
													<th
														scope="row"
														class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														{item.HBL}
													</th>
													<td class="py-4 px-6 ">
														<span className="border px-2 py-0.5 rounded-lg text-xs text-white bg-green-500">
															{item.Location}
														</span>
													</td>

													<td class="py-4 px-6">
														<a href="#" class="font-medium text-red-400 dark:text-red-500 ">
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
						</div>
						<span className=" w-1/2 mx-auto border p-2 bg-gray-100 rounded-lg text-sm">
							Total de Items: {itemsToUpdate.length}
						</span>
						<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={() => handleOnSave()}
								data-modal-toggle="staticModal"
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								{isLoading ? "Actualizando" : "Guardar"}
							</button>
							<button
								onClick={() => setShowModal(false)}
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
