import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db_getProducts } from "../../../Supabase/Products_db/Products_db";
import { productThunks_getProducts } from "../../Store/Slices/Products/ProductsThunks";
import { ProductsTable } from "./ProdcutsTables/ProductsTables";
import { CreateProductForm } from "./ProductsForm/CreateProductForm";

export const CreateProduct = () => {
	const { products } = useSelector((state) => state.ProductsSlice);
    const dispatch=useDispatch()
	useEffect(()=>{
       dispatch(productThunks_getProducts())
	},[])

	return (
		<div className="flex justify-between ">
			<div className="m-2 p-2 w-1/3  ">
				<CreateProductForm />
			</div>
			<div className="m-2 w-full">
				<ProductsTable products={products} />
			</div>
		</div>
	);
};
