import { React } from "react";
export const ListProductsInOrder = ({ products }) => {
	return (
		<div>
			<div className="grid grid-cols-7 text-right gap-3 text-sm bg-gray-700 text-white px-1">
				<div className="col-span-3 text-center">Items</div>
				<div>Precio</div>
				<div>Peso</div>
				<div>Tarifa</div>
				<div>Precio de Envio</div>
			</div>
			{products.map((product) => (
				<div className="grid grid-cols-7 gap-3  items-center h-10 text-xs border-b  px-1">
					<div className="col-span-3 text-center ">{product.ProductName}</div>
					<div className="text-right">{product.UnitPrice}</div>
					<div className="text-right">{product.Weight}</div>
					<div className="text-right">{product.PricePerPound}</div>
					<div className="font-bold text-right">
						{Math.ceil(parseFloat(product.PricePerPound) * parseFloat(product.Weight)) +
							parseFloat(product.UnitPrice)}
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
				<div className="font-bold">0</div>
			</div>
		</div>
	);
};
