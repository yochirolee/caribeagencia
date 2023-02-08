import { React, useRef } from "react";

export const InputFiles = ({ handleImport }) => {
	const inputFileRef = useRef();
	return (
		<>
					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						ref={inputFileRef}
						type="file"
						name="file"
						id="inputGroupFile"
						required
						onChange={(event) => handleImport(event)}
						accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					/>
		</>
	);
};
