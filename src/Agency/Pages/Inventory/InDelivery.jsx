import { format, parseISO } from "date-fns";
import { Spinner } from "flowbite-react";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { InputHBL } from "../../Components/ui/Forms/InputHBL";
import { ListProducts } from "../../Components/ui/List/ListProducts";
import { useFetchProductsByLocation } from "../../hooks/useFetchProductsByLocationId";
import { useSetProductListLocation } from "../../hooks/useSetProductListLocation";
import { useSetProductLocation } from "../../hooks/useSetProductLocation";
import { ProductModalDetails } from "../Tracking/Components/ProductModalDetails";
import { setAlert } from "../../Store/Slices/Alert/AlertSlice";

export const InDelivery = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});
	const handleOnSelectedProduct = (HBL) => {
		setSelectedProduct(HBL);
		setShowModal(true);
	};
	const dispatch = useDispatch();
	const { data: products, isLoading } = useFetchProductsByLocation(3);
	const { data: deliveryProducts, isLoadingDelivery } = useFetchProductsByLocation(5);
	const mutationProductList = useSetProductListLocation();

	const handleHBL = (HBL) => {
		const product = products.find((product) => product.HBL === HBL);

		if (product) {
			let productsToInsert = [];

			productsToInsert = [...productsToInsert, product];
			mutationProductList.mutateAsync({ products: productsToInsert, locationId: 5 });
			productsToInsert = [];
		}
	};
	if (isLoading) return <Spinner />;
	return (
		<div className="flex flex-col  lg:h-[calc(100vh-60px)] md:flex-row relative   overflow-y-auto ">
			<aside className="min-w-[300px] lg:w-2/6  overflow-x-hidden flex flex-col  border-r p-4  text-sm overflow-y-auto bg-gray-50">
		
				<h3 className="p-2 border-b font-semibold text-sm">Productos Nacionalizados</h3>
				<div className="mt-4 flex flex-col overflow-y-auto">
					{products?.map((product, index) => (
						<div
							key={product?.HBL}
							className="flex bg-white items-center  text-xs py-4 rounded-lg shadow-sm m-2 cursor-pointer hover:bg-gray-100  hover:ring-1"
						>
							<div
								onClick={() => handleOnSelectedProduct(product)}
								className="flex flex-col  items-center px-2 text-center"
							>
								<p className="  rounded-md  text-blue-500/90  font-semibold ">
									{product?.InvoiceId}
								</p>
								<span>Factura</span>
							</div>
							<div class="hidden mx-2 md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
							<div className="flex flex-col mx-2 ">
								<p className="font-bold  ">{product?.HBL}</p>

								<p className="text-[11px]">{product?.Description}</p>
							</div>
						</div>
					))}
				</div>
			</aside>
			<div className="container p-4 border bg-gray-100 overflow-y-auto">
				<InputHBL handleHBL={handleHBL} placeHolder={"Producto Para Traslado"} />
				<div className="flex items-center justify-between">
					<h3 className="p-2 border-b font-semibold text-sm">Productos En Traslado</h3>
					<div className="text-xs flex gap-2 border p-1 rounded-lg">
						<h3>En Traslado:</h3>
						<span>{deliveryProducts?.length}</span>
					</div>
				</div>
				<ListProducts
					productList={deliveryProducts}
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
