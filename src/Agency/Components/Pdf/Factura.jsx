import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListProductsInOrder } from "../../Pages/Orders/ListProductsInOrder/ListProductsInOrder";
import { action_createOrder } from "../../Store/Slices/Orders/OrdersActions";
import { resetOrder } from "../../Store/Slices/Orders/OrdersSlice";

export const Factura = () => {
	const { currentOrder } = useSelector((state) => state.OrdersSlice);
	const { customer, reciever, products } = currentOrder;
	const dispatch = useDispatch();

	const handleCreateOrder = () => {
		dispatch(action_createOrder(currentOrder));
		dispatch(resetOrder());
	};
	return (
		<>
			<div className="grid grid-flow-col my-4 justify-center text-center">
				<div className="flex flex-col">
					<h2 className="text-xl font-bold">Caribe Cargo Inc.</h2>
					<span className="text-sm">10230 NW 80th Ave Hialeah Gardens FL 33016</span>
					<span className="text-sm">Telefono: +1 (305)-851-3004</span>
				</div>
			</div>
			<div className="grid grid-flow- grid-cols-4  my-4 justify-between">
				<div className=" flex flex-col items-center place-content-center  col-start-1 col-end-3 col-span-2">
					<h2 className=" font-bold">Factura/Invoice</h2>
					<h3 className="text-2xl">3343 - PM</h3>
					<span className="text-sm">{Date.now().toLocaleString()}</span>
				</div>
				<div className="p-4 ">
					<h3 className="font-bold mb-2">Cliente/Shipper</h3>
					<div className="">
						<i className="fas fa-user w-4  text-xs text-gray-500"></i>
						<span className="mx-2 text-sm">{customer.FirstName + " " + customer.LastName}</span>
					</div>
					<div>
						<i className="fa fa-id-card w-4  text-xs text-gray-500"></i>
						<span className="mx-2 text-sm">{customer.Document}</span>
					</div>
					<div>
						<i className="fas fa-mobile w-4  text-xs text-gray-500"></i>
						<span className="mx-2 text-sm">{customer.Mobile}</span>
					</div>
					<div>
						<i className="fas fa-phone w-4  text-xs  text-gray-500"></i>
						<span className="mx-2 text-sm">{customer.Mobile}</span>
					</div>
					<div>
						<i className="fas fa-map-marker w-4  text-xs text-gray-500"></i>
						<span className="mx-2 text-sm">{customer.Address}</span>
					</div>
				</div>
				<div className="p-4 ">
					<h3 className="font-bold mb-2">Destinatario/Reciever</h3>
					<div className="">
						<i className="fas fa-user w-4 text-xs text-gray-500"></i>
						<span className="mx-2 text-sm">{reciever.FirstName + " " + reciever.LastName}</span>
					</div>
					<div>
						<i className="fa fa-id-card w-4  text-xs text-gray-500"></i>
						<span className="mx-2 text-sm">{reciever.CI}</span>
					</div>
					<div className="">
						<i className="fas fa-mobile w-4 text-xs text-gray-500"></i>
						<span className="mx-2 text-sm">{reciever.Mobile}</span>
					</div>
					<div>
						<i className="fas fa-phone w-4  text-xs  text-gray-500"></i>
						<span className="mx-2 text-sm">{reciever.Mobile}</span>
					</div>
					<div>
						<i className="fas fa-map-marker w-4   text-xs text-gray-500"></i>
						<span className="mx-2 text-sm">{reciever.Address}</span>
					</div>
				</div>
			</div>
			{<ListProductsInOrder products={products} />}
			<button onClick={() => handleCreateOrder()}>Facturar</button>
		</>
	);
};
