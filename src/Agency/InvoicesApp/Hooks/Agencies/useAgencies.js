import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { queryKeys } from "../QueryKeys/queryKeys";

const development_URL = "http://localhost:3001/api/v1";
const production_URL = "https://caribeagencia-backend.vercel.app/api/v1";
axios.defaults.baseURL = development_URL;

const getAgencies = async () => {
	const response = await axios.get("/agencies");
	console.log(response, "axios response");
	if (response.status === 404) throw new Error("No se encontraron agencias");
	return response.data;
};

const createAgency = async (newAgency) => {
	if (!newAgency) throw new Error("newAgency is required");
	const { data } = await axios.post("/agencies", newAgency);
	return data;
};

const updateAgency = async (agency) => {
	if (!agency) throw new Error("agency is required");
	const { data } = await axios.put(`/agencies/${agency.id}`, agency);
	return data;
};

const deleteAgency = async (id) => {
	if (!id) throw new Error("id is required");
	const { data } = await axios.delete(`/agencies/${id}`);
	return data;
};

const getServicesByAgencyId = async (id) => {
	const { data } = await axios.get(`/services/getByAgencyId/${id}`);
	return data;
};

const getServicesProvidersByAgencyId = async (id) => {
	const { data } = await axios.get(`/servicesProviders/getByAgencyId/${id}`);
	return data;
};

export const useFetchAgencies = () => {
	return useQuery([queryKeys.fetchAgencies], () => getAgencies());
};

export const useCreateAgency = (setIsOpen) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (newAgency) => createAgency(newAgency),
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.fetchAgencies]);
			setIsOpen(false);
		},
	});
};

export const useUpdateAgency = (setIsOpen, setSelectedAgency) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (agency) => updateAgency(agency),
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.fetchAgencies]);
			setIsOpen(false);
		},
	});
};

export const useDeleteAgency = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteAgency(id),
		onSuccess: () => {
			queryClient.invalidateQueries(queryKeys.fetchAgencies);
		},
	});
};

export const useFetchEmployeesByAgencyId = (id) => {
	return useQuery(["fetchEmployeesByAgencyId", id], () =>
		fetch(`https://caribeagencia-backend.vercel.app/api/v1/employees/getByAgencyId/${id}`).then(
			(res) => res.json(),
		),
	);
};

export const useFetchServicesByAgency = (id) => {
	if (!id) throw new Error("id is required");
	return useQuery([queryKeys.fetchServiceById, id], () => getServicesByAgencyId(id));
};

export const useFetchServicesProvidersByAgencyId = (id) => {
	if (!id) throw new Error("id is required");
	return useQuery(["fetchServicesProvidersByAgencyId", id], () =>
		getServicesProvidersByAgencyId(id),
	);
};
