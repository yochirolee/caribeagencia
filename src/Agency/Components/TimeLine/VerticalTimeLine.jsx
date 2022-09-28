import { React } from "react";
export const VerticalTimeLine = () => {
	return (
		<ol className="grid grid-cols-3  mt-6 gap-4   border-t border-gray-200 dark:border-gray-700">
			<li className="mb-10 mt-6 relative  flex-col">
				<span className=" absolute -top-7 left-16   w-2 h-2 rounded-full bg-blue-300 ring ring-blue-600 dark:ring-gray-900 dark:bg-blue-900"></span>
				<time className="flex flex-col text-center  mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
					Paso 1: <small>Datos del Cliente</small>
				</time>
			</li>
			<li className="mb-10 mt-6 relative  flex-col">
				<span className=" absolute -top-7 left-16   w-2 h-2 rounded-full bg-white ring ring-blue-200 dark:ring-gray-900 dark:bg-blue-900"></span>
				<time className="flex flex-col text-center  mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
					Paso 2: <small>Datos del Cliente</small>
				</time>
			</li>
			<li className="mb-10 mt-6 relative  flex-col">
				<span className=" absolute -top-7 left-16   w-2 h-2 rounded-full bg-white ring ring-blue-200 dark:ring-gray-900 dark:bg-blue-900"></span>
				<time className="flex flex-col text-center  mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
					Paso 3: <small>Datos del Cliente</small>
				</time>
			</li>
		</ol>
	);
};
