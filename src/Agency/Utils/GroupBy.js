export const GroupBy = (array, key) => {
    if(!array) return [];
	return array.reduce((previous, currentItem) => {
		const group = currentItem[key];
		if (!previous[group]) previous[group] = [];
		previous[group].push(currentItem);
		return previous;
	}, []);
};
