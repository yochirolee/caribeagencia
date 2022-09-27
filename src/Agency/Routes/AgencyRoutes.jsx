import { React } from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import { Dashboard } from "../Pages/Dashboard";

export const AgencyRoutes = () => {
	return (
		<Routes>
			<Route path="/*" element={<Dashboard />} />
		</Routes>
	);
};
