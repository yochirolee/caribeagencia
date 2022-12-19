import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { AgencyRoutes } from "../Agency/Routes/AgencyRoutes";
import { login, logout } from "../Agency/Store/Auth/AuthSlice";
import { AuthRoutes } from "../Auth/Routes/AuthRoutes";
import { supabase } from "../Supabase/SupabaseClient";
// /user?.aud === "authenticated"
export const RouterApp = () => {
	const { user } = useSelector((state) => state.Auth);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("useEffect on RouterApp", user);
		//if (!user) return dispatch(logout());
		supabase.auth.onAuthStateChange((event, session) => {
			console.log(event, session, "SESSION EVENT");
			if (!session?.user) {
				dispatch(logout());
			} else {
				dispatch(login(session.user));
			}
		});
	}, []);

	return (
		<Routes>
			{true ? (
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
