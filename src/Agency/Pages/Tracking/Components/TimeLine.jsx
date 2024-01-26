import { React } from "react";
import { format, parseISO } from "date-fns";
import { FaList, FaListUl, FaPallet, FaShip, FaShippingFast, FaTruckLoading } from "react-icons/fa";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";
import { GrUserPolice } from "react-icons/gr";
import { MdLocalPolice, MdOutlineDownloadDone } from "react-icons/md";

const getIcon = (status) => {
	switch (status) {
		case "Facturado":
			return <DocumentCheckIcon className="w-4 h-4  lg:w-5 lg:h-5 " />;
		case "Despacho":
			return <FaListUl className="w-4 h-4  lg:w-5 lg:h-5 " />;
		case "En Pallet":
			return <FaPallet className="w-4 h-4  lg:w-5 lg:h-5" />;
		case "En Contenedor":
			return <FaShip className="w-4 h-4  lg:w-5 lg:h-5 " />;
		case "Aduana Cuba":
			return <MdLocalPolice className="w-4  h-4  lg:w-5 lg:h-5 " />;
		case "Listo para Traslado":
			return <FaTruckLoading className="w-4 h-4  lg:w-5 lg:h-5 " />;
		case "En Traslado":
			return <FaShippingFast className="w-4 h-4  lg:w-5 lg:h-5 " />;

		case "Entregado":
			return <MdOutlineDownloadDone className="w-4 h-4  lg:w-6 lg:h-6 " />;
		default:
			return <FaShip className="w-4 h-4  lg:w-6 lg:h-6 " />;
	}
};

export const TimeLine = ({ history }) => {
	if (!history) return null;
	const reversed = [...history].reverse();
	return (
		<div className="h-40">
			<ol className="inline-flex items-center   p-4 w-full mb-4 sm:mb-5">
				{reversed.map(
					(step, index) =>
						step.createdAt &&
						(index < reversed.length - 1 ? (
							<li
								key={index}
								className="relative flex  w-full items-center text-gray-600 dark:text-gray-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:gray-blue-800"
							>
								<div className="flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full lg:h-10 lg:w-10 dark:bg-gray-800 shrink-0">
									{getIcon(step.location)}
								</div>
								<div className="absolute mt-20 -left-2 flex flex-col items-center">
									<div className="flex flex-col items-center text-xs  mt-6">
										<span>{step.location}</span>
										<p className="text-xs">{step?.container}</p>
										<p className="text-xs">{step?.pallet}</p>
										<p className="text-xs">{step?.dispatch}</p>
										<span className="text-slate-600">
											{step.createdAt ? format(parseISO(step?.createdAt), "MM/dd/Y ") : ""}
										</span>
									</div>
								</div>
							</li>
						) : (
							<li className="relative flex   text-blue-600 items-center w-full">
								<div className="flex items-center ring animate-pulse justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-10 lg:w-10 dark:bg-gray-700 shrink-0">
									{getIcon(step.location)}
								</div>
								<div className="absolute mt-20 -left-2 flex flex-col items-center">
									<div className="flex flex-col items-center text-xs mt-4">
										<span>{step.location}</span>
										<p className="text-xs">{step?.container}</p>
										<p className="text-xs">{step?.pallet}</p>
										<p className="text-xs">{step?.dispatch}</p>
										<span className="text-slate-600">
											{step.createdAt ? format(parseISO(step?.createdAt), "MM/dd/Y ") : ""}
										</span>
									</div>
								</div>
							</li>
						)),
				)}
			</ol>
		</div>
	);
};
