import { React, useDeferredValue, useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { setRecieverInOrder } from "../../Store/Slices/Orders/OrdersSlice";
import ScanSound from "../../../../public/ScanSound.mp3";
import useSound from "use-sound";

const scanData =
	"39996,CTE25062236460,CICLOMOTOR ELECTRICO ECCO BIKE E09 Lithium 35AMP (Online),260.00 Lb,1,ABEL GARCIA ,RIDEL HERRERA RODRIGUEZ,0 73010700207,58903924/58903924,Matanzas";

export const Tracking = () => {
	const [data, setData] = useState("No result");
	const [items, setItems] = useState([]);
	const [error, setError] = useState("noError");
	const [selected, setSelected] = useState("environment");
	const [play] = useSound(ScanSound);

	let splitter = "";
	play();
	const handleOnResult = async (scanText) => {
		splitter = await scanText.split(",");
		console.log(splitter);
		const item = {
			OrderId: splitter[0],
			TrackingId: splitter[1],
			Product: splitter[2],
			Weight: splitter[3],
			Service: splitter[4],
			Customer: splitter[5],
			Reciever: splitter[6],
			CustomerPhone: splitter[7],
			RecieverPhone: splitter[8],
			State: splitter[9],
		};
		play();
		setItems((items) => [...items, item]);
	};

	const handleError = (error) => {
		setRecieverInOrder(error);
	};
	//play();
	return (
		<>
			<p>{data}</p>

			<QrReader
				constraints={{ facingMode: "environment" }}
				delay={30000}
				onError={handleError}
				onResult={(result, error) => {
					if (!!result) {
						handleOnResult(result.text);
					}

					if (!!error) {
						handleError(error);
					}
				}}
				style={{ width: "100%" }}
			/>

			<div>
				<h1>
					Total: <span className="bg-green-500 px-2 rounded-lg text-white">{items.length}</span>
				</h1>
				{items.map((item) => (
					<div className="flex justify-around p-2 ">
						<p>{item.OrderId}</p>
						<p>{item.TrackingId}</p>
						<p>{item.Product}</p>
						<p>{item.Customer}</p>
						<p>{item.State}</p>
					</div>
				))}
			</div>
		</>
	);
};
