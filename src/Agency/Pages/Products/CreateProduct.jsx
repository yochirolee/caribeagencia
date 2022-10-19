import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_getProducts } from "../../Store/Slices/Products/ProductsActions";
import { CreateProductModal } from "./Modals/createProductModal";
import { ProductsTable } from "./ProdcutsTables/ProductsTables";
import { ProductSearch } from "./ProductSearch/ProductSearch";
import { TableSkeleton } from "./Skeleton/TableSkeleton";

export const CreateProduct = () => {
	const [isVisible, setIsVisible] = useState(false);

	const [actions, setActions] = useState("insert");

	const { products, isLoading } = useSelector((state) => state.ProductsSlice);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(action_getProducts());
	
	}, []);

	return (
		<div className="m-2 w-full">
			<ProductSearch setIsVisible={setIsVisible} />
			{isLoading ? (
				<TableSkeleton />
			) : (
				<>
					<ProductsTable products={products} />
					<CreateProductModal isVisible={isVisible} setIsVisible={setIsVisible} actions={actions} />
				</>
			)}
		</div>
	);
};
