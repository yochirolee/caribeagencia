import { React } from "react";
import { format, parseISO } from "date-fns";

export const HistoryTimeLine = ({ history }) => {
	console.log(history, "history");
	if (!history) return null;
	const reversed = [...history].reverse();
	return (
		<>
			<ol className="flex overflow-x-auto  w-full">
				{reversed.map(
					(step, index) =>
						step.createdAt && (
							<li key={index} className="relative h-20 text-xs p-2 mb-6">
								<div className="flex  items-center w-28">
									<div className="z-10 flex items-center justify-center w-4 h-4 bg-blue-200 rounded-full  dark:bg-blue-900  dark:ring-gray-900 shrink-0">
										<span className="flex w-2 h-2 bg-blue-600 rounded-full"></span>
									</div>
									<div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
								</div>
								<div className="mt-3  text-left ">
									<h3 className="text-xs  text-gray-900 dark:text-white">{step.location}</h3>
									<p className="text-xs">{step?.container}</p>
									<p className="text-xs">{step?.pallet}</p>
									<p className="text-xs">{step?.dispatch}</p>
									<time className=" text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
										{step.createdAt ? format(parseISO(step?.createdAt), "MM/dd/Y ") : ""}
									</time>
								</div>
							</li>
						),
				)}
			</ol>
		</>
	);
};
