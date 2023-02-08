import { Spinner } from "flowbite-react";
import { React } from "react";
import { useFetchLocations } from "../../../hooks/useFetchLocations";

export const Locations = ({ setLocation, setShowModal }) => {
	const { data: locations, isLoading } = useFetchLocations();
	const handleSelection = (location) => {
		setLocation(location);
		setShowModal(true);
	};

	if (!locations) return <Spinner />;
	return (
		<div className="flex flex-col  md:items-left container ">
			<h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
				Seleccione Ubicacion:
			</h3>

			<div className="flex flex-col  md:flex-row gap-4 mb-4">
				{locations &&
					locations?.map((location) => (
						<button
							onClick={() => handleSelection(location)}
							key={location?.LocationId}
							type="button"
							className="relative inline-flex items-center px-5 py-1.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							<i className="fas fa-plus mx-2 "></i>
							<span className="sr-only">Notifications</span>
							{location?.LocationName}
							<div class="absolute inline-flex items-center justify-center w-auto px-2 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -right-2 dark:border-gray-900">
								1228
							</div>
						</button>
					))}
			</div>
		</div>
	);
};
