import { useEffect, useState } from "react";
import { supabase } from "../../Supabase/SupabaseClient";

export const useGetCities = (StateId) => {
	const [cities, setCities] = useState([]);
	const [isLoadingCities, setIsLoadingCities] = useState(false);
	const [selectedCity, setSelectedCity] = useState({});

	const getCities = async () => {
		let { data: cities, error } = await supabase.from("cities").select("*").eq("StateId", StateId).order("CityName");
		if (!error) {
			setCities(cities);
			setSelectedCity(cities[0]);
		}
		return error;
	};

	useEffect(() => {
		setIsLoadingCities(true);
		getCities();
		setIsLoadingCities(false);
	}, [StateId]);

	return { cities, selectedCity, setSelectedCity, isLoadingCities };
};
