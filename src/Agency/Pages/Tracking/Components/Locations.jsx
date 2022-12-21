import { React } from "react";

const LocationsData = [
	{
		locationId: 1,
		Location: "Aduana Cuba",
	},
	{
		locationId: 2,
		Location: "Almacen Transcargo",
	},
	{
		locationId: 3,
		Location: "Transportando",
	},
	{
		locationId: 4,
		Location: "Entregado",
	},
];

export const Locations = ({ setLocation, setShowModal }) => {
	const handleSelection = (e) => {
		setLocation(e.target.value);
		setShowModal(true);
	};
	return (
		<div className="flex flex-col  md:items-left container ">
			<h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
				Seleccione Ubicacion:
			</h3>

			<div className="flex flex-col  md:flex-row gap-4 mb-4">
				{LocationsData.map((location) => (
					<button
						onClick={(e) => handleSelection(e)}
						type="button"
						key={location.locationId}
						value={location.Location}
						className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-blue-600 border border-blue-400  rounded-lg focus:text-white focus:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:first-letter:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						{location.Location}
						<span className="inline-flex justify-center items-center ml-2 p-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
							<i className="fas fa-plus "></i>
						</span>
					</button>
				))}
			</div>
		</div>
	);
};
