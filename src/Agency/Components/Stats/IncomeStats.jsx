import { React, useMemo } from "react";
import { useFetchContainerIncome } from "../../hooks/useReports/useFetchContainerIncome";

const calculateTotalPaidByAgencies = (containerData) => {
	if (!containerData) return 0;
	const initialValue = 0;
	const sumWithInitial = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.AgencyPayment);
	}, initialValue);

	return parseFloat(sumWithInitial).toFixed(2);
	// Expected output: 10
};

const calculateTotalweight = (containerData) => {
	if (!containerData) return 0;
	const initialValue = 0;
	const sumTotalWeight = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.Weight);
	}, initialValue);

	return parseFloat(sumTotalWeight).toFixed(2);
	// Expected output: 10
};

/* const calculateTotalDiscount = (containerData) => {
	if (!containerData) return 0;
	const initialValue = 0;
	const sumTotalDiscount = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.Discount);
	}, initialValue);

	return parseFloat(sumTotalDiscount).toFixed(2);
	// Expected output: 10
};
 */
const calculateDiscountByInvoices = (containerData) => {
	if (!containerData) return 0;
	const key = "Discount";
	const uniqueInvoices = [...new Map(containerData.map((item) => [item[key], item])).values()];
	const initialValue = 0;
	const sumTotalDiscount = uniqueInvoices.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.Discount);
	}, initialValue);
	return parseFloat(sumTotalDiscount).toFixed(2);
};

export const IncomeStats = ({ selectedContainer }) => {
	const {
		data: containerData,
		isError: isErrorFetchingContainer,
		isLoading: isLoadingContainer,
	} = useFetchContainerIncome(selectedContainer);

	const totalPaidByAgencies = useMemo(
		() => calculateTotalPaidByAgencies(containerData),
		[containerData?.length],
	);

	const totalWeight = useMemo(() => calculateTotalweight(containerData), [containerData?.length]);
	const totalDiscount = useMemo(
		() => calculateDiscountByInvoices(containerData),
		[containerData?.length],
	);

	if (isLoadingContainer) return <div className='h-8 w-xl bg-gray-50 rounde-lg animate-pulse'></div>;
	return (
		<div className="flex flex-col gap-4 text-xs  ">
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="flex items-center justify-end gap-4 mx-6 ">
					<div className="font-semibold flex justify-end items-center gap-2">
						Total Facturado:
						<span className="px-2 py-0.5 bg-blue-200 rounded-lg text-blue-800">
							{parseFloat(totalPaidByAgencies - totalDiscount).toFixed(2)}
						</span>
					</div>
					<div className="font-semibold flex justify-end items-center gap-2">
						Total por Descuento:
						<span className="px-2 py-0.5 bg-green-200 rounded-lg text-green-800">
							{" "}
							{totalDiscount ? totalDiscount : 0}
						</span>
					</div>
					<div className="font-semibold flex justify-end items-center gap-2">
						Peso Total:
						<span className="px-2 py-0.5 bg-green-200 rounded-lg text-green-800">
							{totalWeight ? totalWeight : 0}
						</span>
					</div>
					<div className="font-semibold justify-end flex items-center gap-2">
						Total Pagado por Agencias:
						<span className="px-2 py-0.5 bg-yellow-200 rounded-lg text-yellow-800">
							{totalPaidByAgencies ? totalPaidByAgencies : 0}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
