import { React } from "react";
import { Navbar } from "../Components/ui/Navbar";
import { Sidebar } from "../Components/ui/Sidebar";

export const Layout = ({ children }) => {
	return (
		<div className="flex  ">
			<Sidebar />
			<div className=" w-full  h-screen overflow-y-auto ">
				<Navbar />
				<div className=" h-screen-[56px] mt-14  ">{children}</div>
			</div>
		</div>
	);
};
