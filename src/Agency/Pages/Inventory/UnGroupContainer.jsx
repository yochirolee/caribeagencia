import { React, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListProductsInSelectedContainer } from "../../Components/ui/List/ListProductsInSelectedContainer";
import { InputHBL } from "../../Components/ui/Forms/InputHBL";
import { setAlert } from "../../Store/Slices/Alert/AlertSlice";
import { UnGroupContainerStats } from "../../Components/ui/Stats/UnGroupContainerStats";
import ContainerOnPortSelect from "../../Components/ui/Selects/ContainerOnPortSelect";
import { useFetchUngroupedProductsByContainer } from "../../hooks/useContainers/useFetchUngroupedProductsByContainer";
import { useFetchProductByHBL } from "../../hooks/useFetchProductByHBL";
import { useFetchProductsInContainer } from "../../hooks/useContainers/useFetchProductsInContainer";
import { createUnGroupedProduct } from "../../Helpers/createUnGroupProduct";
import { useUnGroupProducts } from "../../hooks/useContainers/useUngroupProducts";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { TableUngroupedProducts } from "../../Components/Tables/TableUngroupedProducts";
import { ProductModalDetails } from "../../Components/Modal/ProductModalDetails";
import { Card } from "@tremor/react";

export const UnGroupContainer = () => {
	const dispatch = useDispatch();
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const [HBLToFind, setHBLToFind] = useState(undefined);
	const { data: HBLResult } = useFetchProductByHBL(HBLToFind);
	const { user } = useSelector((state) => state.Auth);
	const mutationDoUnGroupProduct = useUnGroupProducts();
	const { data: unGroupProductList, isLoading: isLoadingProducts } =
		useFetchUngroupedProductsByContainer(selectedContainer?.ContainerId);

	const { isLoading: isLoading, data: productsInContainer } = useFetchProductsInContainer(
		selectedContainer?.ContainerId,
	);

	//Implement isError
	const handleUngroupContainer = async (HBL) => {
		console.log(HBL);
		let productsToInsert = [];
		const productExist = unGroupProductList.find((product) => HBL == product.HBL);
		if (productExist) {
			dispatch(setAlert({ text: HBL + " Ya fue  Desagrupado", type: "Warning" }));
			setTimeout(() => {
				dispatch(setAlert({ text: "", type: "" }));
			}, 3000);
			return;
		}
		productsToInsert.push(
			await createUnGroupedProduct(productsInContainer, HBL, selectedContainer?.ContainerId),
		);
		console.log(productsToInsert);
		/* if (!product) {
			setHBLToFind(HBL);
			HBLResult.ContainerId = selectedContainer.ContainerId;
			console.log(HBLResult, "HBLRESUTL");
		} */
		//productsToInsert = [...productsToInsert, product ? product : HBLResult];

		mutationDoUnGroupProduct.mutateAsync({
			products: productsToInsert,
		});
		productsToInsert = [];
	};

	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});

	const handleOnSelectedProduct = (HBL) => {
		setSelectedProduct(HBL);
		setShowModal(true);
	};

	return (
		<div className="flex flex-col  lg:flex-row ">
			<aside className="lg:min-w-[300px] lg:max-w-[300px] lg:min-w-2/6  overflow-x-hidden flex flex-col  border-r p-4  text-sm overflow-y-auto bg-gray-50">
				<ContainerOnPortSelect
					selectedContainer={selectedContainer}
					setSelectedContainer={setSelectedContainer}
				/>
				{!!selectedContainer ? (
					<div className="flex-col  lg:flex bg-white  text-xs  rounded-lg shadow-md shrink-0 my-2 ">
						<div className="flex p-2 text-xs   items-center ">
							<p>Productos:</p>
							<span className=" mx-2 p-1 text-blue-700  bg-blue-100 rounded-lg">
								{selectedContainer?.ProductsQuantity}
							</span>
						</div>
						<div className=" px-2 text-xs flex items-center   text-center  ">
							Peso:
							<span className="  mx-2 rounded-lg">{selectedContainer?.Weight} Lbs</span>
						</div>

						<div className=" p-2 text-xs flex items-center   text-center  ">
							Contenedor:
							<span className=" mx-2  rounded-lg">{selectedContainer?.ContainerNumber}</span>
						</div>
					</div>
				) : (
					""
				)}
				{productsInContainer?.length == 0 ? (
					<div className="p-2 my-2 bg-green-100 text-center text-green-700 border rounded border-green-200 ">
						<span className="text-green-800 font-semibold">
							Contanedor {selectedContainer?.ContainerNumber}
						</span>
						<p>Esta en Puerto o ya fue Desagrupado</p>
					</div>
				) : (
					<ListProductsInSelectedContainer
						isLoading={isLoading}
						productsInContainer={productsInContainer}
						unGroupProductList={unGroupProductList}
						handleOnSelectedProduct={handleOnSelectedProduct}
						handleUngroupContainer={handleUngroupContainer}
					/>
				)}
			</aside>
			<div className="flex flex-col w-full  gap-2  p-4  ">
				{selectedContainer ? (
					isLoading ? (
						<SearchResultSkeleton />
					) : (
						<>
							<div className="flex flex-col  ">
								<InputHBL
									handleHBL={handleUngroupContainer}
									isLoadingProducts={isLoadingProducts}
									placeHolder="Producto a Desagrupar"
								/>
								<UnGroupContainerStats
									productList={unGroupProductList}
									productsInContainer={productsInContainer}
									selectedContainer={selectedContainer}
								/>
							</div>

							<Card className="grid max-h-screen overflow-y-auto">
								<TableUngroupedProducts
									isLoading={isLoading}
									productList={unGroupProductList}
									handleOnSelectedProduct={handleOnSelectedProduct}
								/>
							</Card>
						</>
					)
				) : (
					<div
						className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400"
						role="alert"
					>
						<span className="font-medium">
							<i className="fa fa-arrow-left mx-2"></i> Seleccione Contenedor
						</span>
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
