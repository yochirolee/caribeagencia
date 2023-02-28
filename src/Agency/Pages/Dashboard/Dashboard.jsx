import { React, useState } from "react";
import { useSelector } from "react-redux";
import ContainerStopsModal from "../../Components/Modal/ContainerStopsModal";
import ContainerStopModal from "../../Components/Modal/ContainerStopsModal";
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
				<DashboardStats />

				<div className="p-2  mt-4  ">
					<div className="">
						<InputHBL handleHBL={handleSearch} placeHolder="Buscar por Factura o HBL" />
						{isLoading ? (
							<SearchResultSkeleton />
						) : (
							<>
								<SearchResult selectedProductDetails={data} />
							</>
						)}
					</div>
					<div className=" lg:my-6  grid grid-flow-row items-center gap-6">
						<div className="">
							<ContainerSelect
								selectedContainer={selectedContainer}
								setSelectedContainer={setSelectedContainer}
							/>
							{selectedContainer?.ContainerId}
						</div>
						{isLoadingContainerData ? (
							<SearchResultSkeleton />
						) : (
							<ProductsTable
								productList={containerData}
								selectedContainer={selectedContainer}
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
