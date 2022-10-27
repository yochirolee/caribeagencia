import { React, useState } from "react";
import { QrReader } from "react-qr-reader";
import { setRecieverInOrder } from "../../Store/Slices/Orders/OrdersSlice";

export const Tracking = () => {
	const [data, setData] = useState("No result");
	const [items, setItems] = useState([]);
	const [error, setError] = useState("noError");
	const [selected, setSelected] = useState("environment");
	const handleScan = (data) => {
		setItems(...items, data);
		data = "";
	};

	const handleError = (error) => {
		setRecieverInOrder(error);
	};

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
				constraints={{ facingMode: selected }}
				delay={500}
				onScan={handleScan}
				onError={handleError}
				onResult={(result, error) => {
					if (!!result) {
						setData(result?.text);
					}

					if (!!error) {
						handleError(error);
					}
				}}
				style={{ width: "100%" }}
			/>
			<p>{data}</p>
			<p>{error}</p>
			<div>
				{items.map((item) => (
					<p>{item}</p>
				))}
			</div>
		</>
	);
};
