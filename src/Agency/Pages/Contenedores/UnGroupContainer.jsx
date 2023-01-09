import { useState } from "react";
import { useEffect } from "react";
import { React } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { supabase } from "../../../Supabase/SupabaseClient";
import { UnGroupContainerForm } from "../../Components/ui/Forms/UngroupContainerForm";
import { ListProducts } from "../../Components/ui/List/ListProducts";
import { ListProductsInSelectedContainer } from "../../Components/ui/List/ListProductsInSelectedContainer";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { useFetchProductsInContainerByContainerId } from "../../hooks/useFetchProductsInContainerByContainerId";
import { ProductModalDetails } from "../Tracking/Components/ProductModalDetails";

const findProductInContainer = (ProductsInContainer, HBL) => {
	const existProduct = ProductsInContainer.find((findProduct) => findProduct.HBL == HBL);
	return existProduct;
};

const isProductUnGrouped = (ListUnGroupedProducts, HBL) => {
	if (!!ListProductsInSelectedContainer | !!HBL) return;
	return ListUnGroupedProducts.find((product) => product.HBL == HBL) ? true : false;
};

const getProducts = async (selectedContainer) => {
	let { data: products, error } = await supabase
		.from("trackingHistory_duplicate")
		.select("*")
		.eq("ContainerId", selectedContainer.ContainerId)
		.order("CreatedAt", { ascending: false });

	return products;
};

export const UnGroupContainer = () => {
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const queryClient = useQueryClient();

	const { data: unGroupProductList, isLoading: isLoadingProducts } = useQuery(
		["getUnGroupProducts", selectedContainer],
		() => getProducts(selectedContainer),
		{ enabled: !!selectedContainer },
	);

	const {
		isLoading: isLoading,
		isError: isError,
		data: productsInContainer,
		error: errorProducts,
	} = useFetchProductsInContainerByContainerId(selectedContainer);

	const handleOnSave = async (product) => {
		const productToInsert = {
			HBL: product.HBL,
			Location: "Desagrupe",
			HBLLocation: product.HBL + "-" + 9,
			ContainerId: selectedContainer.ContainerId,
		};

		await supabase
			.from("trackingHistory_duplicate")
			.upsert(productToInsert, { onConflict: "HBLLocation" })
			.select();
	};

	const mutation = useMutation((product) => handleOnSave(product), {
		onSuccess: (data, error, variables, context) => {
			queryClient.invalidateQueries("getUnGroupProducts");
			console.log(data, error, variables, context);
			// Will execute only once, for the last mutation (Todo 3),
			// regardless which mutation resolves first
		},
	});

	//Implement isError
	const handleUngroupContainer = (HBL) => {
		if (isProductUnGrouped(unGroupProductList, HBL)) return;
		const product = findProductInContainer(productsInContainer, HBL);
		if (product) {
			mutation.mutate(product);
		}
		return;
	};

	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});

	const handleOnSelectedProduct = (HBL) => {
		setSelectedProduct(HBL);
		setShowModal(true);
	};

	return (
		<div className="flex relative   ">
			<aside
				className="lg:w-1/3  flex flex-col  border-r p-4 h-screen  bg-gray-50"
				aria-label="Sidebar"
			>
				<ContainerSelect
					selectedContainer={selectedContainer}
					setSelectedContainer={setSelectedContainer}
				/>
				{!!selectedContainer ? (
					<div className="flex text-xs justify-between p-2 bg-white m-2">
						<div>{selectedContainer?.ProductsQuantity}</div>
						<div>{selectedContainer?.Weight} Lbs</div>
						<div>{selectedContainer?.Master} </div>
					</div>
				) : (
					<></>
				)}

				<ListProductsInSelectedContainer
					isLoading={isLoading}
					productsInContainer={productsInContainer}
				/>
			</aside>
			<div className=" p-8 container ">
				<UnGroupContainerForm
					handleUngroupContainer={handleUngroupContainer}
					isLoadingProducts={isLoadingProducts}
				/>
				<ListProducts
					unGroupProductList={unGroupProductList}
					handleOnSelectedProduct={handleOnSelectedProduct}
					selectedContainer={selectedContainer}
				/>
			</div>
			<ProductModalDetails selectedProduct={selectedProduct} showModalDetails={showModal} setShowModalDetails={setShowModal} />
		</div>
	);
};
