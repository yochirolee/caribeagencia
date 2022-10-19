import { React, useMemo } from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from "react-table";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";

// Define a default UI for filtering
function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = React.useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<span>
			Search:{" "}
			<input
				value={value || ""}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`${count} records...`}
				style={{
					fontSize: "1.1rem",
					border: "0",
				}}
			/>
		</span>
	);
}
export const CustomersTable = ({ customers }) => {
	const data = useMemo(
		() => customers.map((cust) => ({ name: cust.name, last_name: cust.last_name })),
		[],
	);
	const columns = useMemo(
		() => [
			{
				Header: "Nombre",
				accessor: "name", // accessor is the "key" in the data
			},
			{
				Header: "Apellidos",
				accessor: "last_name",
			},
		],
		[],
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		visibleColumns,
		preGlobalFilteredRows,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
		},
		useFilters, // useFilters!
		useGlobalFilter, // useGlobalFilter!
	);
	return (
		<>
			<GlobalFilter
				preGlobalFilteredRows={preGlobalFilteredRows}
				globalFilter={state.globalFilter}
				setGlobalFilter={setGlobalFilter}
			/>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()} className="text-sm text-center">
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()} className="text-sm border p-2">
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
