import { Spinner } from "flowbite-react";
import { React } from "react";
import { useFetchLocations } from "../../../hooks/useFetchLocations";

export const SelectLocations = ({ setLocation, setShowModal }) => {
	const { data: locations, isLoading } = useFetchLocations();
	const handleSelection = (location) => {
		setLocation(location);
		setShowModal(true);
	};

	if (!locations) return <Spinner />;
	return (
		<div className="grid  container ">
			<h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
				Seleccione Ubicacion:
			</h3>

			<div className="grid sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
				{locations &&
					locations?.map((location) => (
						<button
							onClick={() => handleSelection(location)}
							key={location?.LocationId}
							type="button"
							className="inline-flex  items-center gap-4   justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						>
							<i className="fas fa-plus mx-2 "></i>
							<span className="text-xs">{location?.LocationName}</span>
							<div className=" inline-flex items-center justify-center w-auto px-2 h-6 text-xs  text-white bg-green-500 border-2 border-white rounded-full -top-4 -right-2 dark:border-gray-900">
								1228
							</div>
						</button>
					))}
			</div>
		</div>
	);
};
