import { React } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../../Supabase/SupabaseClient";
export const Navbar = () => {
	const { user } = useSelector((state) => state.UserSlice);

	return (
		<div className="flex justify-between px-6 items-center text-sm sticky z-10 h-14 p-2 top-0 bg-gray-200  ">
			<i className="fas fa-bars cursor-pointer text-lg text-gray-500 p-2 lg:hidden"></i>

			<div>
				<button onClick={() => supabase.auth.signOut()}>Salir</button>
			</div>
		</div>
	);
};
