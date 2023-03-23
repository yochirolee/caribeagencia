import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import { formatHBLHelper } from "../../Helpers/formatHBLHelper";

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
};
