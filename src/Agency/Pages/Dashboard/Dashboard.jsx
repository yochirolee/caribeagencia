import { React, useState } from "react";
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
	const [search, setSearch] = useState("");
	const { data, isLoading } = useFetchByInvoiceOrHBL(search);
	const [selectedContainer, setSelectedContainer] = useState(undefined);

	const {
		data: containerData,
		isLoading: isLoadingContainerData,
		error,
	} = useFetchAllProductsByContainerId(selectedContainer?.ContainerId);

	const [showModal, setShowModal] = useState(false);
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
			<div className="container p-10">
				<DashboardStats />

				<div className="p-2 mt-4 ">
					<InputHBL handleHBL={handleSearch} placeHolder="Buscar por Factura o HBL" />
					<div>
						{isLoading ? (
							<SearchResultSkeleton />
						) : (
							<>
								<SearchResult selectedProductDetails={data} />
							</>
						)}
					</div>
					<div className=" my-6  grid grid-flow-row  gap-6">
						<div className="flex flex-row  items-center justify-between">
							<ContainerSelect
								selectedContainer={selectedContainer}
								setSelectedContainer={setSelectedContainer}
							/>
						</div>
						{isLoadingContainerData ? (
							<SearchResultSkeleton />
						) : (
							<ProductsTable
								productList={containerData}
								selectedContainer={selectedContainer}
								handleOnSelectedProduct={handleOnSelectedProduct}
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
		</div>
	);
};
