import { React, useState } from "react";
import { QrReader } from "react-qr-reader";

export const Tracking = () => {
	const [data, setData] = useState("No result");
	return (
		<>
			<QrReader
				facingMode={"environment"}
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
