import { format, parseISO } from "date-fns";
import { Spinner } from "flowbite-react";
import { React, useState } from "react";
import { InputHBL } from "../../Components/ui/Forms/InputHBL";
import { ListProducts } from "../../Components/ui/List/ListProducts";
import { useFetchProductsByLocation } from "../../hooks/useFetchProductsByLocationId";
import { useSetProductLocation } from "../../hooks/useSetProductLocation";
import { ProductModalDetails } from "../Tracking/Components/ProductModalDetails";

export const PendingDelivery = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});
	const handleOnSelectedProduct = (HBL) => {
		setSelectedProduct(HBL);
		setShowModal(true);
	};

	const { data: products, isLoading } = useFetchProductsByLocation(2);
	const { data: PendingDeliveryProducts, isLoadingNationalize } = useFetchProductsByLocation(3);
	const mutationProduct = useSetProductLocation(null);

	const handleHBL = (HBL) => {
		const product = products.find((product) => product.HBL === HBL);
		if (product) {
			mutationProduct.mutate(product);
		}
	};
	if (isLoading) return <Spinner />;
	return (
		<div className="flex flex-col  lg:h-[calc(100vh-60px)] md:flex-row relative   overflow-y-auto ">
			<aside
				className="lg:w-2/6  flex flex-col  border-r p-4  text-sm overflow-y-auto bg-gray-50"
				aria-label="Sidebar"
			>
				<h3 className="p-2 border-b font-semibold text-sm">Productos Nacionalizados</h3>
				{products?.map((product, index) => (
					<div
						key={index}
						className="flex p-2 text-xs border my-1 rounded-lg shadow-sm items-center cursor-pointer hover:bg-gray-100"
					>
						<div className="flex flex-col  items-center px-1 text-center">
							<p className="font-semibold rounded text-blue-500 text-xs  ">{product?.HBL}</p>
						</div>
						<div class="hidden  mx-2 md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>

						<div className="flex flex-col gap-2 mx-4 w-full text-left">
							<span className="text-[10px]">
								Fecha:
								<span className="border p-1 mx-1 rounded-lg ">
									{product.CreatedAt ? format(parseISO(product?.CreatedAt), "MMM d h:mm a") : ""}
								</span>
							</span>
							<span className="text-[10px]">Usuario: {product?.UserId}</span>
						</div>

						<i className="fa fa-angle-right text-zinc-500"></i>
					</div>
				))}
			</aside>
			<div className="container p-4 border bg-gray-100 overflow-y-auto">
				<InputHBL handleHBL={handleHBL} placeHolder={"Producto Pendiente Traslado"} />
				<div className="flex items-center justify-between">
					<h3 className="p-2 border-b font-semibold text-sm">Productos Pendientes de Traslado</h3>
					<div className="text-xs flex gap-2 border p-1 rounded-lg">
						<h3>Pendientes de Traslado:</h3>
						<span>{PendingDeliveryProducts?.length}</span>
					</div>
				</div>
				<ListProducts
					productList={PendingDeliveryProducts}
					selectedContainer={products}
					handleOnSelectedProduct={handleOnSelectedProduct}
				/>
			</div>
			<ProductModalDetails
				selectedProduct={selectedProduct}
				showModalDetails={showModal}
				setShowModalDetails={setShowModal}
			/>
		</div>
	);
};
