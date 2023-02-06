import { format, parseISO } from "date-fns";
import { Spinner } from "flowbite-react";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputHBL } from "../../Components/ui/Forms/InputHBL";
import { ListProducts } from "../../Components/ui/List/ListProducts";
import { useFetchProductsByLocation } from "../../hooks/useFetchProductsByLocationId";
import { useSetProductLocation } from "../../hooks/useSetProductLocation";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { ProductModalDetails } from "../Tracking/Components/ProductModalDetails";
import { setAlert } from "../../Store/Slices/Alert/AlertSlice";
import { useSetProductListLocation } from "../../hooks/useSetProductListLocation";

export const NationalizeProducts = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});
	const { user } = useSelector((state) => state.Auth);
	const dispatch = useDispatch();

	const handleOnSelectedProduct = (HBL) => {
		setSelectedProduct(HBL);
		setShowModal(true);
	};
	const { data: products, isLoading } = useFetchProductsByLocation(2);
	const { data: nationalizeProducts, isLoading: isLoadingNationalize } =
		useFetchProductsByLocation(3);
	const mutationProductList = useSetProductListLocation();

	const handleHBL = (HBL) => {
		const product = products.find((product) => product.HBL === HBL);

		if (nationalizeProducts.find((product) => product.HBL == HBL)) {
			dispatch(setAlert({ text: HBL + " ya fue Nacionalizado", type: "Warning" }));
			setTimeout(() => {
				dispatch(setAlert({ text: "", type: "" }));
			}, 3000);
			return;
		}
		if (!product) {
			dispatch(setAlert({ text: HBL + " No se Encuentra en Desagrupado", type: "Warning" }));
			setTimeout(() => {
				dispatch(setAlert({ text: "", type: "" }));
			}, 3000);
			return;
		}
		if (product) {
			let productsToInsert = [];

			productsToInsert = [...productsToInsert, product];
			mutationProductList.mutateAsync({ products: productsToInsert, locationId: 3, user: user });
			productsToInsert = [];
		}
	};

	if (isLoading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);
	return (
		<div className="flex flex-col  lg:h-[calc(100vh-60px)] md:flex-row relative   overflow-y-auto ">
			<aside className="min-w-[300px] lg:w-2/6  overflow-x-hidden flex flex-col  border-r p-4  text-sm overflow-y-auto bg-gray-50">
				<div className="my-2">Total de Desagrupados {products?.length}</div>
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
				<div className="flex justify-between items-center">
					<InputHBL handleHBL={handleHBL} placeHolder={"Producto a Nacionalizar"} />
					<div className="border-l px-10">
						<button
							onClick={() => setUploadFromExcelModal(true)}
							type="button"
							className="flex h-10 gap-4 px-2  items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
							aria-label="Toggle dark mode"
						>
							<i className="fa fa-file-excel text-md text-zinc-500 "></i>
							<span className="text-xs">Cargar desde Excel</span>
						</button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<h3 className="p-2 border-b font-semibold text-sm">Productos Nacionalizados</h3>
					<div className="text-xs flex gap-2 border p-1 rounded-lg">
						<h3>Nacionalizados:</h3>
						<span className="mx-2 px-2 py-1 text-green-700 bg-green-100 rounded-lg ">
							{nationalizeProducts?.length}
						</span>
					</div>
				</div>
				<ListProducts
					productList={nationalizeProducts}
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
