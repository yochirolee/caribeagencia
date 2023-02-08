import { React } from "react";
import { format, parseISO } from "date-fns";
import { Spinner } from "flowbite-react";

export const ListProducts = ({ productList, handleOnSelectedProduct, isLoading, isError }) => {
	if (productList?.message) return;
	if (isLoading)
		return (
			<div>
				<Spinner />
			</div>
		);
	if (isError) return <div>{isError.message}</div>;
	return (
		<>
			<div className="h-1/2 lg:h-4/5 p-4 bg-gray-50 overflow-y-auto  ">
				{productList ? (
					productList?.map((product, index) => (
						<div
							key={index}
							className="flex px-4 bg-white  items-center text-xs py-4 rounded-lg shadow-sm m-2 hover:bg-gray-50  "
						>
							<button
								onClick={() => handleOnSelectedProduct(product)}
								type="button"
								className="flex cursor-pointer flex-col gap-2  p-2   items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
							>
								<i className="fa fa-file text-sm text-blue-300 hover:text-blue-500"></i>
								<span>{product.InvoiceId}</span>
							</button>
							<div className="flex flex-col gap-1 items-center px-2 text-center">
								<div className="flex flex-col mx-2 w-32">
									<p className="font-bold text-zinc-700 ">{product?.HBL}</p>
									<p className=" text-zinc-700  ">{product?.Description}</p>
								</div>
							</div>

							<div class="hidden  mx-2 md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>

							{product.CreatedAt ? (
								<div className="flex flex-col mx-4 w-32 text-center">
									<span className="text-xs">Fecha:</span>
									<p className="text-[11px] text-zinc-600 border p-1 rounded-lg font-semibold">
										{product.CreatedAt ? format(parseISO(product?.CreatedAt), "MMM d h:mm a") : ""}
									</p>
								</div>
							) : (
								""
							)}

							<div className="flex flex-col mx-4 w-44 text-center">
								<span className="text-xs">Container:</span>
								<p className="text-[11px] grow-0 text-zinc-600  p-1 ">
									{product?.ContainerName}
									<span className="bg-green-100 text-green-700 rounded p-1">
										{product?.ContainerId}
									</span>
								</p>
							</div>
							{product?.StatusId == 3 ? (
								<div className="flex flex-col mx-4 w-44 text-center">
									<p className="text-[11px] grow-0 text-zinc-600  p-1 ">
										<span className="bg-red-100 text-red-700 rounded p-1">No Manifestado</span>
									</p>
								</div>
							) : (
								<div className="flex flex-col mx-4 w-44 text-center">
									<p className="text-[11px] grow-0 text-zinc-600  p-1 ">
										<span className="bg-green-100 text-green-700 rounded p-1">Correcto</span>
									</p>
								</div>
							)}

							<i className="fa fa-angle-right text-zinc-500"></i>
						</div>
					))
				) : (
					<div className="flex px-4 bg-white  items-center h-10 animate-ping text-xs py-4 rounded-lg shadow-sm m-2 hover:bg-gray-50  ">
						<div className="flex flex-col mx-4 w-44 text-center"></div>
					</div>
				)}
			</div>
		</>
	);
};
