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
		const newItem = {
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

		const exist = null;
		exist = items.find((item) => item.TrackingId == newItem.TrackingId);
		if (!exist) {
			play();
			setData("Agregado");
			setItems((items) => [...items, newItem]);
		} else {
			setData("Agregado Anteriormente");
		}
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

			<div className="col-start-3 col-end-10">
				<div className="overflow-x-auto relative">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="py-3 px-6">
									OrderId
								</th>
								<th scope="col" className="py-3 px-6">
									TrackingId
								</th>
								<th scope="col" className="py-3 px-6">
									Product
								</th>
								<th scope="col" className="py-3 px-6">
									Customer
								</th>
							</tr>
						</thead>
						<tbody>
							{items?.map((item) => (
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{item.OrderId}
									</th>
									<td className="py-4 px-6  ">
										<small className=" text-center rounded-lg px-2 text-white ring ring-green-300 font-bold bg-green-500">
											{item.TrackingId}
										</small>
									</td>
									<td className="py-4 px-6"> {item.Product}</td>
									<td className="py-4 px-6">{item.Customer}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
