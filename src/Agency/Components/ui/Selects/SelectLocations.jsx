import { BellSlashIcon } from "@heroicons/react/20/solid";
import { Toggle, ToggleItem } from "@tremor/react";
import { React } from "react";
import { MdLocationPin } from "react-icons/md";
import { useFetchLocations } from "../../../hooks/useFetchLocations";

export const SelectLocations = ({ setLocation }) => {
	const { data: locations } = useFetchLocations();
	const handleSelection = (location) => {
		setLocation(location);
	};

	return (
		<>
			<Toggle
				defaultValue={location[0]}
				className="my-4 flex py-4"
				onValueChange={(value) => handleSelection(value)}
			>
				{locations &&
					locations?.map((location) => (
						<ToggleItem
							value={location}
							className="text-sm"
							text={location?.LocationName}
							icon={MdLocationPin}
						/>
					))}
			</Toggle>
		</>
	);
};
