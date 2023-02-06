import { useQuery } from "react-query";
import { supabase } from "../../../Supabase/SupabaseClient";

export const getContainersInPort = async () => {
	try {
		const { data: ContainersInPort, error } = await supabase.from("containers").select("*");
		if (!error) return ContainersInPort;
	} catch (error) {
		return error;
	}
};

export const useFetchContainersInPort = () =>
	useQuery({ queryKey: ["fetchContainersInPort"], queryFn: () => getContainersInPort() });
