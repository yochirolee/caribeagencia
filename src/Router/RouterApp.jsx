import { Routes, Route, Navigate } from "react-router-dom";
import { AgencyRoutes } from "../Agency/Routes/AgencyRoutes";
import { AuthRoutes } from "../Auth/Routes/AuthRoutes";

export const RouterApp = () => {
	const status = "authenticated";

	return (
		<Routes>
			{status === "authenticated" ? (
				<Route path="/*" element={<AgencyRoutes />} />
			) : (
				<Route path="/auth/*" element={<AuthRoutes />} />
			)}

			<Route path="/*" element={<Navigate to="/auth/login" />} />

			{/*Login and Register */}
			{/*<Route path="/auth/*" element={<AuthRoutes />}></Route>
			{/*Journal App */}
			{/*<Route path="/*" element={<JournalRoutes />}></Route>
			 */}
		</Routes>
	);
};
