import { React, useState } from "react";
import { QrReader } from "react-qr-reader";
import { setRecieverInOrder } from "../../Store/Slices/Orders/OrdersSlice";

export const Tracking = () => {
	const [data, setData] = useState("No result");
	const [items, setItems] = useState([]);
	const [error, setError] = useState("noError");
	const [selected, setSelected] = useState("environment");
	const handleScan = (result) => {
		setItems((items) => [...items, result]);
		alert("scaned");
	};

	const handleError = (error) => {
		setRecieverInOrder(error);
	};

	return (
		<>
			{JSON.stringify(items, 0, 2)}
			<p>{data}</p>
			<p>{error}</p>
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
				onScan={()=>handleScan(result)}
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

			<div>
				<h1>List Items S{items.length}</h1>
				{items.map((item) => (
					<p>items:{item}</p>
				))}
			</div>
		</>
	);
};
