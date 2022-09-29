import { React } from "react";
export const VerticalTimeLine = ({ handleSetFormStep, formStep }) => {
	return (
		<div className="md:w-1/2 mx-auto">
			<ol className="grid grid-cols-4  mt-6 gap-4   border-t border-gray-200 dark:border-gray-700">
				<li
					className="mb-10 mt-6 relative  flex-col cursor-pointer "
					onClick={() => handleSetFormStep(0)}
				>
					<span className=" absolute -top-7 left-14   w-2 h-2 rounded-full bg-blue-300 ring ring-blue-600 dark:ring-gray-900 dark:bg-blue-900"></span>
					<time className="flex flex-col text-center  mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						<small>Cliente</small>
					</time>
				</li>
				<li
					className="mb-10 mt-6 relative  flex-col cursor-pointer"
					onClick={() => handleSetFormStep(1)}
				>
					<span className=" absolute -top-7 left-14   w-2 h-2 rounded-full bg-blue-300 ring ring-blue-600 dark:ring-gray-900 dark:bg-blue-900"></span>
					<time className="flex flex-col text-center  mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						<small>Destinatario</small>
					</time>
				</li>
				<li
					className="mb-10 mt-6 relative  flex-col cursor-pointer"
					onClick={() => handleSetFormStep(2)}
				>
					<span
						className={`absolute -top-7 left-14   w-2 h-2 rounded-full  dark:ring-gray-900 dark:bg-blue-900 ${
							formStep === 3 ? "bg-blue-300 ring ring-blue-600" : "bg-white ring ring-blue-200"
						}`}
					></span>
					<time className="flex flex-col text-center  mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						<small>Productos</small>
					</time>
				</li>
				<li
					className="mb-10 mt-6 relative text-center flex-col cursor-pointer"
					onClick={() => handleSetFormStep(3)}
				>
					<span className=" absolute -top-7 left-14   w-2 h-2 rounded-full bg-white ring ring-blue-200 dark:ring-gray-900 dark:bg-blue-900"></span>
					<time className="flex flex-col text-center  mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						<small>Servicio</small>
					</time>
				</li>
			</ol>
		</div>
	);
};
