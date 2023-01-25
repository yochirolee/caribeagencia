import { React } from "react";
export const AsideLayout = ({ children, children2 }) => {
	return (
		<aside className="min-w-[300px] lg:w-2/6  overflow-x-hidden flex flex-col  border-r p-4  text-sm overflow-y-auto bg-gray-50">
			{children}
			<div className="bg-red">{children2}</div>
		</aside>
	);
};
