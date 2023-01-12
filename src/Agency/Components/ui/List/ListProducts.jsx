import { React } from "react";
import { format, parseISO } from "date-fns";

export const ListProducts = ({
	unGroupProductList,
	handleOnSelectedProduct,
	selectedContainer,
}) => {
	const filterResult = unGroupProductList?.filter((product) => product?.IsSpare == true);
	console.log(filterResult);

	return (
		<>
			<div className="flex border-b py-2 items-center gap-6   ">
				<div className=" p-2 text-xs  ">
					En Contenedor:
					<span className="mx-2 px-2 py-1  text-violet-700 bg-violet-100  rounded-lg ">
						{selectedContainer?.ProductsQuantity
							? selectedContainer?.ProductsQuantity -
							  (unGroupProductList?.length - filterResult?.length)
							: "0"}{" "}
					</span>
				</div>
				<div className=" p-2 text-xs  ">
					Desagrupados:
					<span className="mx-2 px-2 py-1  text-blue-700 bg-blue-100  rounded-lg ">
						{unGroupProductList?.length ? unGroupProductList?.length : "0"}{" "}
					</span>
				</div>
				<div className=" p-2 text-xs  ">
					Correctos:
					<span className="mx-2 px-2 py-1 text-green-700 bg-green-100 rounded-lg ">
						{unGroupProductList?.length ? unGroupProductList?.length - filterResult?.length : "0"}{" "}
						de {selectedContainer?.ProductsQuantity}
					</span>
				</div>
				<div className="  p-2 text-xs  ">
					No Manifestados:
					<span className=" mx-2 py-1 px-2 text-red-700 bg-red-100 rounded-lg">
						{filterResult?.length}
					</span>
				</div>
			</div>

			<div className="h-3/5 overflow-y-auto ">
				{unGroupProductList?.map((product, index) => (
					<div
						onClick={() => handleOnSelectedProduct(product)}
						key={index}
						className="flex  bg-white  items-center text-xs py-4 rounded-lg shadow-sm m-2 hover:bg-gray-50 cursor-pointer "
					>
						<button
							type="button"
							className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
						>
							<i className="fa fa-file text-sm text-blue-300 hover:text-blue-500"></i>
						</button>
						<div className="flex flex-col gap-1 items-center px-2 text-center">
							<div className="flex flex-col mx-2 w-32">
								<p className="font-bold text-zinc-700 ">{product?.HBL}</p>
							</div>
						</div>
						<div class="hidden  mx-2 md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>

						<div className="flex flex-col mx-4 w-32 text-center">
							<span className="text-xs">Fecha:</span>
							<p className="text-[11px] text-zinc-600 border p-1 rounded-lg font-semibold">
								{product.CreatedAt ? format(parseISO(product?.CreatedAt), "MMM d h:mm a") : ""}
							</p>
						</div>
						<div className="flex flex-col mx-4 w-44 text-center">
							<span className="text-xs">Desagrupado por:</span>
							<p className="text-[11px] grow-0 text-zinc-600 border p-1 rounded-lg font-semibold">
								{product?.UserId}
							</p>
						</div>
						<div
							className={`p-4 mx-10   mb-2 text-xs ${
								product.IsSpare ? "text-red-700 bg-red-100" : "text-green-700 bg-green-100"
							}  rounded-lg dark:bg-gray-800 dark:text-green-400`}
							role="alert"
						>
							<span class="font-medium ">
								{product.IsSpare ? "No Manifestado Correctamente" : "Desagrupado Correctamente"}
							</span>
						</div>
						<i className="fa fa-angle-right text-zinc-500"></i>
					</div>
				))}
			</div>
		</>
	);
};
