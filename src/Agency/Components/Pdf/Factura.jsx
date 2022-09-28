import { React } from "react";
import { useSelector } from "react-redux";
import { json } from "react-router-dom";

export const Factura = () => {
	const { currentOrder } = useSelector((state) => state.OrdersSlice);
	return (
		<>
			<h1> Factura</h1>
			<pre><code>{JSON.stringify(currentOrder,0,2)}</code></pre>
		</>
	);
};
