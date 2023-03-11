
export const sumFields = (containerData, key) => {
	console.log(containerData)
	if (!containerData) return 0;
	const initialValue = 0;
	const sumTotal = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue[key]);
	}, initialValue);

	return parseFloat(sumTotal).toFixed(2);
	// Expected output: 10
};
