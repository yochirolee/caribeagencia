import { React, useMemo, useState } from "react";
export const ListProductsInOrder = ({ products }) => {
	const [total, setTotal] = useState(0);

	useMemo(() => {
		let totalSum = 0;
		products.map((product) => {
			let val = 0;
			val =
				parseFloat(product.PricePerPound) * parseFloat(product.Weight) +
				parseFloat(product.UnitPrice);
			console.log(val, "val");
			totalSum = totalSum + val;
		});
		console.log(total, "total");
		setTotal(totalSum);
	}, [products]);

	return (
		<div>
			<div className="grid grid-cols-8 text-right gap-3 text-sm bg-gray-700 text-white px-1">
				<div className=""></div>
				<div className="col-span-3 text-center">Items</div>
				<div>Precio</div>
				<div>Peso (Lbs)</div>
				<div>Tarifa</div>
				<div>Precio de Envio</div>
			</div>
			{products.map((product, index) => (
				<div key={index} className="grid grid-cols-8   items-center h-10 text-xs border-b  px-1">
					<div className=" text-center">
						<i className="fa fa-trash text-gray-400 "></i>
					</div>
					<div className="col-span-3 text-lef ">{product.ProductName}</div>
					<div className="text-right">{product.UnitPrice.toFixed(2)}</div>
					<div className="text-right">{product.Weight.toFixed(2)}</div>
					<div className="text-right">{product.PricePerPound.toFixed(2)}</div>
					<div className="font-bold text-right">
						{(
							Math.ceil(parseFloat(product.PricePerPound) * parseFloat(product.Weight)) +
							parseFloat(product.UnitPrice)
						).toFixed(2)}
					</div>
				</div>
			))}

			<div className="grid grid-cols-7 text-right gap-3 items-center h-10 text-xs   px-1">
				<div className="col-start-6 ">SubTotal:</div>
				<div className="font-bold">SubTotal:</div>
			</div>
			<div className="grid grid-cols-7 text-right gap-3 items-center h-10 text-xs   px-1">
				<div className="col-start-6 ">Seguro:</div>
				<div className="font-bold">0</div>
			</div>
			<div className="grid grid-cols-7 text-right gap-3 items-center h-10 text-xs  px-1">
				<div className="col-start-6  ">Cargo Extra:</div>
				<div className="font-bold ">0</div>
			</div>
			<div className="grid grid-cols-7 text-right gap-3 items-center h-10 text-xs   px-1">
				<div className="col-start-6  ">Descuento</div>
				<div className="font-bold">0</div>
			</div>
			<div className="grid grid-cols-7 text-right border-t border-dashed font-bold text-md gap-3 items-center h-10    px-1">
				<div className="col-start-6  ">Total</div>
				<div className="font-bold">$ {total.toFixed(2)}</div>
			</div>
		</div>
	);
};
