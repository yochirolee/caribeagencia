import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/AuthSlice";
import { setToggleSideBar } from "../../Store/Slices/Ui/uiSlice";
export const Navbar = () => {
	const { user } = useSelector((state) => state.Auth);
	const dispatch = useDispatch();

	const handleToggle = () => {
		dispatch(setToggleSideBar());
	};
	return (
		<div className="flex justify-between px-6 items-center text-sm sticky z-10 h-14 p-2 top-0 bg-gray-200  ">
			<i
				onClick={() => handleToggle()}
				className="fas fa-bars cursor-pointer text-lg text-gray-500 p-2 lg:hidden"
			></i>

			<div>
				<button onClick={() => dispatch(logout())}>Salir</button>
			</div>
		</div>
	);
};
