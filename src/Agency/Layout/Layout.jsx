import { React } from "react";
import { Navbar } from "../Components/ui/Navbar";
import { Sidebar } from "../Components/ui/Sidebar";

export const Layout = ({ children }) => {
	console.log("Layout")
	return (
		<div className="flex  ">
			<div className='relative  z-30'>
			<Sidebar /></div>
			<div className=" w-full  h-screen overflow-y-auto ">
				<Navbar />
				<div className="    relative top-10 ">{children}</div>
			</div>
		</div>
	);
};
