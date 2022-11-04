import { React } from "react";

const steps = [
	{ id: 0, name: "Cliente" },
	{ id: 1, name: "Destinatario" },
	{ id: 2, name: "Productos" },
	{ id: 3, name: "Servicio" },
];

export const VerticalTimeLine = ({ handleSetFormStep, formStep }) => {
	return (
		<div className={`md:w-1/2  mx-auto py-4 ${formStep == 5 ? "hidden" : ""}`}>
			<div className="grid grid-cols-4  ">
				{steps.map((step) => (
					<span
						className={`  relative ${step.id === 3 ? "border-none" : "border-t"} `}
						key={step.id}
						onClick={() => handleSetFormStep(step.id)}
					>
						<span
							className={`absolute -top-1     w-2 h-2 rounded-full bg-blue-300 ring ${
								formStep >= step.id ? "ring-blue-600" : ""
							}  dark:ring-gray-900 dark:bg-blue-900`}
						></span>
						<p className="mt-4 text-xs leading-none text-gray-400">{step.name}</p>
					</span>
				))}
			</div>
		</div>
	);
};
