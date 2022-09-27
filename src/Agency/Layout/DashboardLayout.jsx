import { React } from "react";

import { DashboardNavbar } from "../Components/DashboardNavBar";
import { DashboardSidebar } from "../Components/DashboardSidebar";
export const DashboardLayout = ({ children }) => {
	return (
		<main className="bg-gray-50/40 dark:bg-gray-800 h-full relative">
			<div className="flex items-start justify-between">
				<DashboardSidebar />
				<div className="flex flex-col h-screen w-full md:space-y-4">
					<DashboardNavbar />
					<div className=" pb-24 h-screen px-4 md:px-6">{children}</div>
				</div>
			</div>
		</main>
	);
};
