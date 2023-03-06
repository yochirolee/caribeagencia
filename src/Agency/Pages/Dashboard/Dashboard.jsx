import { React, useState, useMemo, useEffect } from "react";
import ContainerStopsModal from "../../Components/Modal/ContainerStopsModal";
import { SearchResult } from "../../Components/Search/searchResult";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { DashboardStats } from "../../Components/Stats/DashboardStats";
import { ProductsTable } from "../../Components/Tables/ProductsTable";
import { InputHBL } from "../../Components/ui/Forms/InputHBL";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { useFetchAllProductsByContainerId } from "../../hooks/useContainers/useFecthAllProductsByContainerId";
import { useFetchByInvoiceOrHBL } from "../../hooks/useFetchByInvoiceOrHBL";
import { ProductModalDetails } from "../Tracking/Components/ProductModalDetails";

export const Dashboard = () => {
	const [search, setSearch] = useState(undefined);
	const { data: searchResult, isLoadingSearch } = useFetchByInvoiceOrHBL(search);
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const [selectedAgency, setSelectedAgency] = useState(undefined);

	const { data: productList, isLoading: isLoadingContainerData } = useFetchAllProductsByContainerId(
		selectedContainer?.ContainerId,
	);

	const filteredProducts = useMemo(
		() =>
			selectedAgency
				? productList?.filter((product) => product.Agency == selectedAgency)
				: productList,
		[productList, selectedAgency],
	);
	useEffect(() => {
		setSearch(undefined);
	}, [selectedContainer]);

	const [showModal, setShowModal] = useState(false);
	const [openContainerStops, setOpenContainerStops] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});

	const handleOnSelectedProduct = (HBL) => {
		setSelectedProduct(HBL);
		setShowModal(true);
	};

	const handleSearch = (e) => {
		setSearch(e);
	};

	return (
		<div className="flex flex-col min-h-screen  relative   ">
			<div className="container  p-2 lg:p-10">
				{isLoadingContainerData ? (
					<SearchResultSkeleton />
				) : (
					<DashboardStats filteredProducts={filteredProducts} />
				)}

				<div className="p-2   mt-4  ">
					<div className=" lg:my-6  grid  items-center gap-6">
						<div className="bg-gray-50  p-4 rounded-lg">
							<InputHBL handleHBL={handleSearch} placeHolder="Buscar por Factura o HBL" />
							<ContainerSelect
								selectedContainer={selectedContainer}
								setSelectedContainer={setSelectedContainer}
								setSearch={setSearch}
							/>
						</div>
						{isLoadingContainerData || isLoadingSearch ? (
							<SearchResultSkeleton />
						) : searchResult ? (
							<SearchResult selectedProductDetails={searchResult} setSearch={setSearch} />
						) : (
							<ProductsTable
								productList={filteredProducts}
								selectedContainer={selectedContainer}
								setSelectedContainer={setSelectedContainer}
								setSelectedAgency={setSelectedAgency}
								selectedAgency={selectedAgency}
								filteredProducts={filteredProducts}
								handleOnSelectedProduct={handleOnSelectedProduct}
								setOpenContainerStops={setOpenContainerStops}
							/>
						)}
					</div>
				</div>
			</div>
			<ProductModalDetails
				selectedProduct={selectedProduct}
				showModalDetails={showModal}
				setShowModalDetails={setShowModal}
			/>
			<ContainerStopsModal
				selectedContainer={selectedContainer}
				open={openContainerStops}
				setOpen={setOpenContainerStops}
			/>
		</div>
	);
};
