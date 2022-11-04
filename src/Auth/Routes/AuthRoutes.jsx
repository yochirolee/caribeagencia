import { React } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
export const AuthRoutes = () => {
	return (
		<Routes>
			<Route path="/*" element={<Login />} />
		</Routes>
	);
};
