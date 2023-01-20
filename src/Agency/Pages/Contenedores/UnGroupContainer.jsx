import axios from "axios";
import { useState } from "react";
import { React } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { supabase } from "../../../Supabase/SupabaseClient";
import { UnGroupContainerForm } from "../../Components/ui/Forms/UngroupContainerForm";
import { ListProducts } from "../../Components/ui/List/ListProducts";
import { ListProductsInSelectedContainer } from "../../Components/ui/List/ListProductsInSelectedContainer";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { useFetchProductsInContainerByContainerId } from "../../hooks/useFetchProductsInContainerByContainerId";
import { ProductModalDetails } from "../Tracking/Components/ProductModalDetails";
import { useSetProductLocation } from "../../hooks/useSetProductLocation";
import { useFetchProductsByLocation } from "../../hooks/useFetchProductsByLocationId";

const findProductInContainer = (ProductsInContainer, HBL) => {
	const existProduct = ProductsInContainer?.find((findProduct) => findProduct?.HBL == HBL);
	return existProduct;
};

const isProductUnGrouped = (ListUnGroupedProducts, HBL) => {
	if (!!ListProductsInSelectedContainer | !!HBL) return;
	return ListUnGroupedProducts.find((product) => product.HBL == HBL) ? true : false;
};

const ProductExist = async (HBL) => {
	const data = await axios.get("https://caribe-cargo-api.vercel.app/api/items/" + HBL);
	return data.data;
};

export const UnGroupContainer = () => {
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const { user } = useSelector((state) => state.Auth);

	const mutationProduct = useSetProductLocation();

	const { data: unGroupProductList, isLoading: isLoadingProducts } = useFetchProductsByLocation(
		1,
		selectedContainer?.ContainerId,
	);

	const { isLoading: isLoading, data: productsInContainer } =
		useFetchProductsInContainerByContainerId(selectedContainer);

	//Implement isError
	const handleUngroupContainer = async (HBL) => {
		if (isProductUnGrouped(unGroupProductList, HBL)) return;
		const product = findProductInContainer(productsInContainer, HBL);
		let productToInsert = {};

		if (!product) {
			const isExist = await ProductExist(HBL);
			if (isExist.data.length == 0) return;
			productToInsert = {
				HBL: HBL,
				UserId: user?.email,
				ContainerId: selectedContainer.ContainerId,
				IsSpare: true,
			};
		} else {
			productToInsert = {
				HBL: product.HBL,
				UserId: user?.email,
				ContainerId: selectedContainer.ContainerId,
			};
		}
		mutationProduct.mutate(productToInsert);
	};

	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});

	const handleOnSelectedProduct = (HBL) => {
		setSelectedProduct(HBL);
		setShowModal(true);
	};

	return (
		<div className="flex flex-col  lg:h-[calc(100vh-60px)] md:flex-row relative   overflow-y-auto ">
			<aside className="min-w-[300px] lg:w-2/6  overflow-x-hidden flex flex-col  border-r p-4  text-sm overflow-y-auto bg-gray-50">
				<ContainerSelect
					selectedContainer={selectedContainer}
					setSelectedContainer={setSelectedContainer}
				/>
				{!!selectedContainer ? (
					<div className="flex   w-full bg-white  text-xs rounded-lg shadow-md items-center gap-4 mx-auto p-2  m-2">
						<div className="p-2 flex flex-col text-center border  rounded-lg">
							<span>Productos</span>
							<p>{selectedContainer?.ProductsQuantity}</p>
						</div>
						<div className="p-2 flex flex-col text-center border  rounded-lg">
							<span>Peso</span>
							<p>{selectedContainer?.Weight} Lbs </p>
						</div>
						<div className="p-2  flex flex-col text-center border  rounded-lg">
							<span>Master</span>
							<p>{selectedContainer?.Master} </p>
						</div>
					</div>
				) : (
					<></>
				)}

				<ListProductsInSelectedContainer
					isLoading={isLoading}
					productsInContainer={productsInContainer}
					unGroupProductList={unGroupProductList}
					handleOnSelectedProduct={handleOnSelectedProduct}
				/>
			</aside>
			<div className=" p-8 w-full  container ">
				{selectedContainer ? (
					<>
						<UnGroupContainerForm
							handleUngroupContainer={handleUngroupContainer}
							isLoadingProducts={isLoadingProducts}
						/>
						<ListProducts
							productList={unGroupProductList}
							handleOnSelectedProduct={handleOnSelectedProduct}
							selectedContainer={selectedContainer}
						/>
					</>
				) : (
					<div
						className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400"
						role="alert"
					>
						<span className="font-medium">
							<i className="fa fa-arrow-left mx-2"></i> Seleccione Contenedor
						</span>{" "}
						a Desagrupar
					</div>
				)}
			</div>
			<ProductModalDetails
				selectedProduct={selectedProduct}
				showModalDetails={showModal}
				setShowModalDetails={setShowModal}
			/>
		</div>
	);
};
