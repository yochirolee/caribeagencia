import { React, useState } from "react";
import { QrReader } from "react-qr-reader";

export const Tracking = () => {
	const [data, setData] = useState("No result");
	const [selected, setSelected] = useState("environment");

	return (
		<>
			<select onChange={(e) => setSelected(e.target.value)}>
				<option value={"environment"}>Back Camera</option>
				<option value={"user"}>Front Camera</option>
				<option value={"rear"}>Back Camera</option>
			</select>
			<p>{selected}</p>
			<QrReader
				facingMode={selected}
				delay={500}
				onResult={(result, error) => {
					if (!!result) {
						setData(result?.text);
					}

					if (!!error) {
						console.info(error);
					}
				}}
				style={{ width: "100%" }}
			/>
			<p>{data}</p>
		</>
	);
};
