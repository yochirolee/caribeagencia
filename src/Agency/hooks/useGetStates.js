import { useEffect, useState } from "react";
import { supabase } from "../../Supabase/SupabaseClient";

export const useGetStates = () => {
	const [states, setStates] = useState([]);
	const [isLoadingStates, setIsLoadingStates] = useState(false);
	const [selectedState, setSelectedState] = useState({});

	const getStates = async () => {
		let { data: states, error } = await supabase.from("states").select("*");
		if (!error) {
			setIsLoadingStates(true);
			setStates(states);
			setSelectedState(states[0]);
			setIsLoadingStates(false);
		}
		return error;
	};

	useEffect(() => {
		getStates();
	}, []);

	return { states, selectedState, setSelectedState, isLoadingStates };
};
