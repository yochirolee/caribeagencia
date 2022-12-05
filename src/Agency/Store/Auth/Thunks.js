import { supabase } from "../../../Supabase/SupabaseClient";
import { checkingCredentials, login, logout } from "./AuthSlice";

export const checkingAuth = (email, password) => {
	return async (dispatchEvent) => {
		dispatchEvent(checkingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatchEvent) => {
		dispatchEvent(checkingCredentials());
		const result = await signInWithGoogle();
		if (!result.ok) return dispatchEvent(logout(result.errorMessage));

		dispatchEvent(login(result));
	};
};

export const startCreatingUserWithEmailPassword = (email, password, displayName) => {
	return async (dispatchEvent) => {
		dispatchEvent(checkingCredentials());
		const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword(
			email,
			password,
			displayName,
		);
		if (!ok) return dispatchEvent(logout({ errorMessage }));
		dispatchEvent(login({ uid, displayName, email, photoURL }));
	};
};

export const startLoginWithEmailAndPassword = (email, password) => {
	return async (dispatchEvent) => {
		dispatchEvent(checkingCredentials());
		const { user, error } = await supabase.auth.signIn({
			email,
			password,
		});
		if (!user) return dispatchEvent(logout({ error }));

		dispatchEvent(login(user));
	};
};

export const startLogOut = () => {
	return async (dispatch) => {
		await supabase.auth.signOut();
		dispatch(logout());
	};
};
