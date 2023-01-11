import { React, useRef, useState } from "react";
import { supabase } from "../../../Supabase/SupabaseClient";

export const NewUserForm = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState(undefined);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let { data, error } = await supabase.auth.signUp({
				email: emailRef?.current.value.trim(),
				password: passwordRef?.current.value.trim(),
			});
			emailRef.current.value = "";
			passwordRef.current.value = "";
			if (error) throw new Error(error.message);
		} catch (error) {
			setError(error);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-10">
				<h3 className="font-semibold">Crear nuevo usuario</h3>
				<label htmlFor="input-email">Email</label>
				<input
					id="input-email"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder="Entre su Correo"
					type="email"
					ref={emailRef}
				/>

				<label htmlFor="input-password">Password</label>
				<input
					id="input-password"
					type="password"
					placeholder="Entre su Password"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					ref={passwordRef}
				/>

				<br />

				<button type="submit" className="bg-blue-500 text-white p-3  rounded-lg text-sm">
					Crear Usuario
				</button>
			</form>
			{error ? (
				<div
					class="p-4 mx-10 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400"
					role="alert"
				>
					<span class="font-medium text-xs ">{error.message}</span>
				</div>
			) : (
				""
			)}
		</>
	);
};
