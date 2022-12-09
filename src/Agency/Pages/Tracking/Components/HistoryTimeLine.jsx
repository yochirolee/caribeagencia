import { React } from "react";
import { format, parseISO } from "date-fns";

export const HistoryTimeLine = ({ history }) => {
	return (
		<>
			<ol class="relative border-l border-gray-200 dark:border-gray-700">
				{history?.map((step) => (
					<li key={step.TrackingHistoryId} className="mb-10 ml-4">
						<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
						<time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
							{format(parseISO(step.CreatedAt), "MMM d h:mm a").toUpperCase()}
						</time>
						<h3 className="text-sm text-gray-900 dark:text-white">{step.Location}</h3>
					</li>
				))}
			</ol>
		</>
	);
};
