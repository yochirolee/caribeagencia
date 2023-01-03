import { React, useState } from "react";
import { useForm } from "react-hook-form";

export const FillContainer = ({ selectedPallet, ProductsInPallet }) => {
	const [productsInContainer, setProductsInContainer] = useState([]);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data.HBL);
        if(findProductInPallet(data.HBL))
		setProductsInContainer([...productsInContainer, data.HBL]);
		reset();
	};

	const findProductInPallet = (HBL) => {
		return ProductsInPallet.Products.find((product) => product.HBL === HBL);
	};
	return (
		<div>
			<div className="flex flex-col md:flex-row gap-4 justify-between items-center ">
				<div className="w-full lg:w-1/3">
					<form onSubmit={handleSubmit(onSubmit)}>
						<label
							for="input-group-1"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Adicionar Productos al Contenedor
						</label>
						<div className="relative mb-6">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<i className="fa fa-barcode"></i>
							</div>
							<input
								type="text"
								{...register("HBL", { required: true })}
								id="input-group-1"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Adicionar Producto a Contenedor"
							/>
						</div>
					</form>
				</div>
				<div className="flex justify-start gap-4 text-xs p-2 border rounded-lg">
					<div className="flex items-center gap-2   bg-green-500 text-white text-center p-2 border rounded-lg">
						<span className="h-8 w-auto z-10 bg-gray-50/30 justify-center flex items-center  p-2 rounded-lg ">
							<p className="text-white z-20 font-bold text-sm">0</p>
						</span>
						<p>Productos en Contenedor</p>
					</div>
					<div className="flex items-center gap-2   bg-yellow-400 text-white text-center p-2 border rounded-lg">
						<span className="h-8 w-auto z-10 bg-gray-50/30 justify-center flex items-center  p-2 rounded-lg ">
							<p className="text-white z-20 font-bold text-sm">
								{selectedPallet?.ProductsInPallet ? selectedPallet.ProductsInPallet : 0}
							</p>
						</span>
						<p>Productos en Pallet</p>
					</div>
					<div className="flex items-center gap-2   bg-red-500 text-white text-center p-2 border rounded-lg">
						<span className="h-8 w-auto z-10 bg-gray-50/30 justify-center flex items-center  p-2 rounded-lg ">
							<p className="text-white z-20 font-bold text-sm">0</p>
						</span>
						<p>Faltantes</p>
					</div>
				</div>
			</div>
			<h3 className="text-sm font-semibold text-gray-600 my-2">
				Listado de Productos en Contenedor:
			</h3>
			<div className="border rounded-lg ">
				<div className=" flex flex-col p-2 text-xs ">
					{productsInContainer.map((productInContainer) => (
						<div className="flex justify-between my-2 map-2">
							<span className="text-gray-500">HBL: {productInContainer}</span>
							<span className="text-gray-600">Descripcion: Neumaticos de Auto</span>
							<span>HBL</span>
							<span>HBL</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
