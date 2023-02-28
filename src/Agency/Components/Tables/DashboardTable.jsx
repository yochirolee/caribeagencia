import React, { useRef, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
	useExpanded,
	useFilters,
	useGroupBy,
	usePagination,
	useSortBy,
	useTable,
} from "react-table";

export const DashboardTable = ({ containerData }) => {
	if (!containerData) {
		return;
	}
	const tableRef = useRef();
	const columns = useMemo(
		() => [
			{ Header: "HBL", accessor: "HBL" },
			{ Header: "Agency", accessor: "Agency" },
			{ Header: "Lugar", accessor: "locations.LocationName" },
			{ Header: "Fecha", accessor: "locations.CreatedAt" },
			{ Header: "Factura", accessor: "InvoiceId" },
			{ Header: "Peso", accessor: "ProductWeight" },
			{ Header: "Descripcion", accessor: "Description" },
		],
		[],
	);

	const data = useMemo(() => containerData, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
		},
		useFilters,
		useGroupBy,
		useSortBy,
		useExpanded,
		usePagination,
	);

	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: "Reporte de Productos",
		sheet: "report",
	});

	return (
		<div className=" grid p-4">
			{/* Example using Grid's API */}
			<div className="inline-flex justify-end p-4  items-center text-xs gap-6 py-2 ">
				<button onClick={onDownload}>Export to Excel</button>
			</div>

			<div className="container  overflow-x-scroll sm:-mx-6 lg:-mx-8">
				<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden h-[calc(100vh-21rem)] overflow-y-auto ">
						<table className="min-w-full text-center " ref={tableRef} {...getTableProps()}>
							<thead className="border-b bg-gray-50">
								{headerGroups.map((headerGroup) => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column) => (
											<th
												{...column.getHeaderProps(column.getSortByToggleProps())}
												className="text-xs font-medium text-gray-900 px-6 py-4"
											>
												{column.render("Header")}
												<span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()}>
								{rows.map((row) => {
									prepareRow(row);
									return (
										<tr className="bg-white border-b " {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return (
													<td
														{...cell.getCellProps()}
														className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900 "
													>
														{cell.render("Cell")}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
