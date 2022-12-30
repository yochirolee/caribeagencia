import { React } from "react";
import { Locations } from "./Components/Locations";
export const TrackingProducts = () => {
	return (
		<div className="mx-10">
			<h1> ProductsTracking</h1>
			<div>
				<button>Create Location</button>
			</div>
			<div>
				<Locations />
			</div>
		</div>
	);
};
