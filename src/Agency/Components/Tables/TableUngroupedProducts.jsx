import { format, parseISO } from "date-fns";
import { React } from "react";
import { Table, TableHead, TableRow, TableCell, TableHeaderCell, TableBody } from "@tremor/react";
import { truncateString } from "../../Utils/truncateString";
export const TableUngroupedProducts = ({ productList, handleOnSelectedProduct }) => {
	if (!productList) return;
	return (
		<Table>
			<TableHead>
				<TableRow className="text-xs">
					<TableHeaderCell>Factura</TableHeaderCell>
					<TableHeaderCell>HBL</TableHeaderCell>
					<TableHeaderCell>Descripcion</TableHeaderCell>
					<TableHeaderCell>Fecha de Desagrupe</TableHeaderCell>
					<TableHeaderCell>Estado</TableHeaderCell>
				</TableRow>
			</TableHead>

			<TableBody className="text-xs">
				{productList.map((product, index) => (
					<TableRow key={index}>
						<TableCell>
							{" "}
							<span
								onClick={() => handleOnSelectedProduct(product)}
								className="hover:border  rounded-lg cursor-pointer  p-2 "
							>
								<i className="fa fa-file mx-2 text-gray-500"></i>
								{product.InvoiceId}
							</span>
						</TableCell>
						<TableCell>{product?.HBL.trim()}</TableCell>
						<TableCell>{truncateString(product.Description, 50)}</TableCell>
						<TableCell>
							{product.CreatedAt ? format(parseISO(product?.CreatedAt), "MMM d h:mm a") : ""}
						</TableCell>
						<TableCell>
							{product?.StatusId == 3 ? (
								<div className="flex flex-col ">
									<p className="text-[11px] grow-0 text-zinc-600  p-1 ">
										<span className="bg-red-100 text-red-700 rounded p-1">No Manifestado</span>
									</p>
								</div>
							) : (
								<div className="flex flex-col  text-center">
									<p className="text-[11px] grow-0 text-zinc-600  p-1 ">
										<span className="bg-green-100 text-green-700 rounded p-1">Correcto</span>
									</p>
								</div>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
