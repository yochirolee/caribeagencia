import { React, useEffect, useState } from "react";
import { supabase } from "../../Supabase/SupabaseClient";
import { Layout } from "../Layout/Layout";
import { NewRecieverForm } from "../Components/Recievers/NewRecieverForm";
import { ActionsReciever } from "../Components/Recievers/ActionsReciever";
export const AddReciever = () => {
	const [recievers, setRecievers] = useState([]);

	const getRecievers = async () => {
		const { data: recieversList } = await supabase.from("recievers").select("*");
		setRecievers(recieversList);
		console.log(recieversList);
	};

	useEffect(() => {
		getRecievers();
	}, []);

	return (
		<div className="grid ">
			<NewRecieverForm />

			<div className="sm:px-6 w-full ">
				<div className="px-4 md:px-10 lg:flex ">
					<div className="flex items-center justify-between">
						<p
							tabIndex="0"
							className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
						>
							Recievers
						</p>
						<div className="relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 absolute mt-2 mr-2 text-gray-500  right-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>

							<input
								type="text"
								id="search"
								className="bg-gray-50 border pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder=""
								required=""
							/>
						</div>
					</div>
				</div>
				<div className="bg-white  px-4 md:px-8 xl:px-10">
					<div className="mt-7 overflow-x-auto">
						<table className="w-full whitespace-nowrap">
							<tbody>
								{recievers.map((reciever) => (
									<tr
										key={reciever.RecieverId}
										tabIndex="0"
										className="focus:outline-none h-16 border mb-3 border-gray-100 rounded"
									>
										<td className="">
											<div className="flex items-center pl-5">
												<p className="text-sm leading-none text-gray-700 mr-2">
													{reciever.FirstName + " " + reciever.LastName}
												</p>
											</div>
										</td>
										<td className="pl-10">
											<div className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
													/>
												</svg>

												<p className="text-xs leading-none text-gray-600 ml-2">{reciever.Mobile}</p>
											</div>
										</td>
										<td className="pl-5">
											<div className="flex items-center ">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
													/>
												</svg>

												<p className="text-xs leading-none text-gray-600 ml-2">{reciever.CI}</p>
											</div>
										</td>
										<td className="pl-5">
											<div className="flex items-center ">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="currentColor"
													className="w-5 h-5"
												>
													<path
														fillRule="evenodd"
														d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
														clipRule="evenodd"
													/>
												</svg>

												<p className="text-xs leading-none text-gray-600 ml-2">
													{reciever.Address}
												</p>
											</div>
										</td>

										<td>
											<ActionsReciever />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
