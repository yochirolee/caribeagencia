import { React } from "react";
import { format, parseISO } from "date-fns";

export const HistoryTimeLine = ({ history }) => {
	return (
		<>
			<ol className=" flex  overflow-x-auto p-4 flex-row-reverse items-center">
				{history?.map((step, index) => (
					<li key={index} className="relative h-20 text-xs p-2 mb-6">
						<div className="flex items-center w-28">
							<div className="z-10 flex items-center justify-center w-4 h-4 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
								<span className="flex w-2 h-2 bg-blue-600 rounded-full"></span>
							</div>
							<div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
						</div>
						<div className="mt-3 mx-4 text-left ">
							<h3 className="text-xs  text-gray-900 dark:text-white">{step.Location}</h3>
							<p className="text-xs">{step?.Container}</p>
							<time className=" text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
								{step.CreatedAt ? format(parseISO(step?.CreatedAt), "MMM d h:mm a") : ""}
							</time>
						</div>
					</li>
				))}
			</ol>
		</>
	);
};
