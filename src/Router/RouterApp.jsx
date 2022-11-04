import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../Agency/Layout/Layout";
import { AgencyRoutes } from "../Agency/Routes/AgencyRoutes";
import { setUser } from "../Agency/Store/Slices/Users/UserSlice";
import { AuthRoutes } from "../Auth/Routes/AuthRoutes";
import { supabase } from "../Supabase/SupabaseClient";

export const RouterApp = () => {
	const [status, setStatus] = useState("no-authenticated");
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("useEffect on RouterApp");
		supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				setStatus(session.user.aud);
				dispatch(setUser(session.user));
			}
		});
	}, []);

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
