export const groupAndMerge = (arr, groupBy, mergeWith) => {
	if (!arr) return [];
	return Array.from(
		arr
			.reduce(
				(m, o) =>
					m.set(o[groupBy], {
						...o,
						[mergeWith]: [...(m.get(o[groupBy])?.[mergeWith] ?? []), o[mergeWith]],
					}),
				new Map(),
			)
			.values(),
	);
};
