import { React } from "react";
import { AlertPopup } from "../Components/Alert/AlertPopup";
import { Navbar } from "../Components/ui/Navbar";
import { Sidebar } from "../Components/ui/Sidebar";

export const Layout = ({ children }) => {
	return (
		<div className="flex">
			<Sidebar />
			<div className=" w-full  h-screen overflow-y-auto ">
				<Navbar />
				<div className="container h-screen-[56px]   relative  ">
					<AlertPopup />
					{children}
				</div>
			</div>
		</div>
	);
};
