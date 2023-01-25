import { React } from "react";
import { format, parseISO } from "date-fns";

export const ListProducts = ({ productList, handleOnSelectedProduct }) => {
	return (
		<>
			<div className=" h-4/5 overflow-y-auto  ">
				{productList?.map((product, index) => (
					<div
						key={index}
						className="flex  bg-white  items-center text-xs py-4 rounded-lg shadow-sm m-2 hover:bg-gray-50  "
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
								<p className=" text-zinc-700 ">{product?.Description}</p>
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
