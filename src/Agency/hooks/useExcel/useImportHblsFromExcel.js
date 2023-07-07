import { useEffect, useState, useMemo } from "react";
import { read, utils } from "xlsx";
import { formatHBLHelper, formatInvoicesHelper } from "../../Helpers/formatHBLHelper";
import readXlsxFile from "read-excel-file";

/* const readFromExcel = (files, setData) => {
	if (!files?.length || !files) return;

	const reader = new FileReader();
	reader.readAsArrayBuffer(files[0]);

	reader.onload = (e) => {
		const workbook = read(e.target.result, { type: "binary" });
		let result = [];
		workbook.SheetNames.forEach((sheet) => {
			const worksheet = workbook.Sheets[sheet];
			const data = utils.sheet_to_row_object_array(worksheet);
			if (data.length > 0) result = result.concat(result, data);
		});
		setData(result);
	};
};

export const useImportHblsFromExcel = (files) => {
	const [readedHbls, setReadedHbls] = useState([]);

	useEffect(() => {
		readHBLS();
	}, [files]);

	const readHBLS = () => {
		try {
			if (files?.length) {
				const file = files[0];
				const reader = new FileReader();
				reader.onload = (event) => {
					const wb = read(event.target.result);
					const sheets = wb.SheetNames;
					if (sheets.length) {
						const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);

						let itemsReaded = formatHBLHelper(rows);
						setReadedHbls(itemsReaded);
					}
				};
				reader.readAsArrayBuffer(file);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return readedHbls;
}; */

const schema = {
	HBL: {
		// JSON object property name.
		prop: "HBL",
		type: String,
	},
	HBLS: {
		// JSON object property name.
		prop: "HBLs",
		type: Number,
	},

	Invoices: {
		// JSON object property name.
		prop: "InvoiceId",
		type: String,
	},
	Telefono: {
		// JSON object property name.
		prop: "Telefono",
		type: String,
	},
};

export const importFromExcel = (files) => {
	if (!files) return;
	const importedFromExcel = [];
	readXlsxFile(files[0], { schema }).then((rows) => {
		rows.rows.forEach((row) => {
			if (row.InvoiceId) {
				importedFromExcel.push({ InvoiceId: row.InvoiceId.replace("-CTE", "") });
			} else {
				importedFromExcel.push({ HBL: row.HBL });
			}
		});
		return importedFromExcel;
	});

	/* 	const [data, setData] = useState([]);
	const invoicesNumbers = [];

	const formatedData = useMemo(() => {
		return data.reduce((acc, curr) => {
			if (curr.HBLS) {
				console.log(curr)
				invoicesNumbers.push(curr.Invoices);
				return acc + curr.HBLS;
			}
			return acc;
		}, 0);
	}, [data]);

	console.log(formatedData, "FORMATED DATA");
	console.log(invoicesNumbers, "FORMATED Invocies");

	const readedData = () => readFromExcel(files, setData);
	useEffect(() => {
		readedData();
	}, [files]);

	console.log(data, "result2 ON useIkportInvoicesFromExcel"); */

	/* console.log(files, "files readed from excel");
	let invoicesIdList = [];
	const invoicesNumbers = [];
	let cantHBL = 0;
	if (!files?.length) return;

	const reader = new FileReader();
	const file = files[0];
	reader.onload = (e) => {
		const workbook = read(e.target.result, { type: "binary" });

		// organize xlsx data into desired format
		console.log(workbook, "workbook");

		workbook.SheetNames.forEach((sheet) => {
			const worksheet = workbook.Sheets[sheet];
			const data = utils.sheet_to_json(worksheet);
			console.log(data, "data");

			cantHBL = data.reduce((acc, curr) => {
				if (curr.HBLS) {
					invoicesNumbers.push(curr.Invoices);
					return acc + curr.HBLS;
				}
				return acc;
			}, 0);
		});
	};
	reader.readAsArrayBuffer(file);
	invoicesIdList = formatInvoicesHelper(invoicesNumbers);
	console.log(cantHBL, "cantHBL", invoicesNumbers);
	console.log(invoicesIdList, "invoicesIdList"); */
};
