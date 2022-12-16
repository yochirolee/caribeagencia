import { React } from "react";
import { format, parseISO } from "date-fns";

export const HorizontalTimeLine = ({ history }) => {
	return (
		<ol className="items-center sm:flex m-6">
			{history?.map((step) => (
				<li className="relative mb-6 sm:mb-0">
					<div className="flex items-center">
						<div className="flex z-10 justify-center items-center w-2 h-2 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"></div>
						<div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
					</div>
					<div className="mt-3 sm:pr-8">
						<h3 className="text-xs font-semibold text-gray-900 dark:text-white">{step.Location}</h3>
						<time className="block mb-2 text-xs font-xs leading-none text-gray-400 dark:text-gray-500">
							{format(parseISO(step?.CreatedAt), "MMM d h:mm a")}
						</time>
					</div>
				</li>
			))}
		</ol>
	);
};
