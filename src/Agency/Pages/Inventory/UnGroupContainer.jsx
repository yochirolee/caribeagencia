import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListProducts } from "../../Components/ui/List/ListProducts";
import { ListProductsInSelectedContainer } from "../../Components/ui/List/ListProductsInSelectedContainer";
import { ProductModalDetails } from "../Tracking/Components/ProductModalDetails";
import { useFetchProductsByLocation } from "../../hooks/useFetchProductsByLocationId";
import { InputHBL } from "../../Components/ui/Forms/InputHBL";
import { setAlert } from "../../Store/Slices/Alert/AlertSlice";
import { UnGroupContainerStats } from "../../Components/ui/Stats/UnGroupContainerStats";
import { LoadFromExcelModal } from "../../Components/Modal/LoadFromExcelModal";
import { useSetProductListLocation } from "../../hooks/useSetProductListLocation";
import ContainerOnPortSelect from "../../Components/ui/Selects/ContainerOnPortSelect";
import { useFetchUngroupedProductsByContainer } from "../../hooks/useContainers/useFetchUngroupedProductsByContainer";
import { useFetchProductByHBL } from "../../hooks/useFetchProductByHBL";
import { useFetchProductsInContainer } from "../../hooks/useContainers/useFetchProductsInContainer";
import { createUnGroupedProduct } from "../../Helpers/createUnGroupProduct";
import { useUnGroupProducts } from "../../hooks/useContainers/useUngroupProducts";

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
	const [showUploadFromExcelModal, setUploadFromExcelModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});

	const handleOnSelectedProduct = (HBL) => {
		setSelectedProduct(HBL);
		setShowModal(true);
	};

	return (
		<div className="flex flex-col  lg:max-h-[calc(100vh-60px)] md:flex-row relative   overflow-y-auto ">
			<aside className="w-[300px] lg:w-2/6  overflow-x-hidden flex flex-col  border-r p-4  text-sm overflow-y-auto bg-gray-50">
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
			<div className=" container p-4 border bg-gray-100 overflow-y-auto ">
				{selectedContainer ? (
					<>
						<div className="flex gap-2 items-center justify-between my-4">
							<InputHBL
								handleHBL={handleUngroupContainer}
								isLoadingProducts={isLoadingProducts}
								placeHolder="Producto a Desagrupar"
							/>
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

						<UnGroupContainerStats
							productList={unGroupProductList}
							productsInContainer={productsInContainer}
							selectedContainer={selectedContainer}
						/>

						<ListProducts
							isLoading={isLoading}
							productList={unGroupProductList}
							handleOnSelectedProduct={handleOnSelectedProduct}
						/>
					</>
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

			<LoadFromExcelModal
				showModal={showUploadFromExcelModal}
				setShowModal={setUploadFromExcelModal}
				selectedContainer={selectedContainer}
			/>
		</div>
	);
};
