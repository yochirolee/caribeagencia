import { React } from "react";
import { format, parseISO } from "date-fns";

export const HistoryTimeLine = ({ history }) => {
	return (
		<>
			<ol class="relative flex items-center  justify-between flex-row-reverse border-t border-gray-200 dark:border-gray-700">
				{history?.map((step,index) => (
					<li key={index} className="mb-10 ml-4 mt-4">
						<div className="absolute ml-8 items-center w-3 h-3 bg-gray-200 rounded-full mt-1.5  -top-3 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
						<h3 className="text-xs text-gray-900 dark:text-white">{step.Location}</h3>
						<p className="text-xs">{step?.Container}</p>
						<time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
							{step.CreatedAt ? format(parseISO(step?.CreatedAt), "MMM d h:mm a") : ""}
						</time>
					</li>
				))}
			</ol>
		</>
	);
};
