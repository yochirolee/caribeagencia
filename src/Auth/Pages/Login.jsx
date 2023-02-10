import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { startLoginWithEmailAndPassword } from "../../Agency/Store/Auth/Thunks";

export const Login = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const { user, errorMessage } = useSelector((state) => state.Auth);
	const isAuthenticated = useMemo(() => user.aud === "checking", [user.aud]);

	const onSubmit = (data) => {
		const { email, password } = data;
		dispatch(startLoginWithEmailAndPassword(email, password));
	};

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a
						href="#"
						className="flex items-center gap-4 mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<img className="w-16 h-16 object-contain " src="/ctelogo.png" alt="logo" />
						Caribe Travel Express
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										{...register("email")}
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required=""
									/>
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Contrasena
									</label>
									<input
										type="password"
										name="password"
										id="password"
										{...register("password")}
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
								</div>

								<div
									className={`flex text-xs justify-center items-center text-red-400 bg-red-200  border rounded-lg h-10 ${
										errorMessage ? "" : "hidden"
									}`}
								>
									{errorMessage}
								</div>

								<button
									disabled={isAuthenticated}
									type="submit"
									className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
								>
									Sign in
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
