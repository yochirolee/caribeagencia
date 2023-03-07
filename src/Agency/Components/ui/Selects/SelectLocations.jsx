import { React } from "react";
import { useFetchLocations } from "../../../hooks/useFetchLocations";

export const SelectLocations = ({ setLocation }) => {
	const { data: locations } = useFetchLocations();
	const handleSelection = (location) => {
		setLocation(location);
	};

	return (
		<div className="grid  container ">
			<div className="grid sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
				{locations &&
					locations?.map((location) => (
						<button
							onClick={() => handleSelection(location)}
							key={location?.LocationId}
							type="button"
							className="inline-flex flex-wrap  items-center gap-4   justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						>
							<span className="text-xs">{location?.LocationName}</span>
						</button>
					))}
			</div>
		</div>
	);
};
