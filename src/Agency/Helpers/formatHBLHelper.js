export const formatHBLHelper =  (listHBL) => {
	if (!listHBL) return;

	let formattedListHBL =  listHBL.map((row) => {
		if (!row) return;
		if (row && row?.HBL?.toUpperCase().trim()) {
			let hbl = row?.HBL.toUpperCase().trim();
			if (hbl.length > 3 && hbl.length < 20) {
				return { HBL: hbl };
			} else {
				const splitter = hbl?.split(",");
				return { HBL: splitter[1] };
			}
		}
	});
	return formattedListHBL;
};
