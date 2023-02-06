import { React, useRef } from "react";

export const InputFiles = ({ handleImport }) => {
	const inputFileRef = useRef();
	return (
		<>
			<div className="py-2 flex flex-left px-6">
				<div className=" ">
					<input
						ref={inputFileRef}
						type="file"
						name="file"
						className="custom-file-input"
						id="inputGroupFile"
						required
						onChange={(event) => handleImport(event)}
						accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					/>
				</div>
			</div>
		</>
	);
};
