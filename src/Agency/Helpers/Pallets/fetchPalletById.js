import axios from "axios";

export const fetchPalletById = async (id) => {
    console.log(id,"ID TO FETCH")
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/pallets/" + id);

	return data.pallet;
};
