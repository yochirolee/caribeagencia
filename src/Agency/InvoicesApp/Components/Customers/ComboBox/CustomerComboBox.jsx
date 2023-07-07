import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon, MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "react-query";
import { InvoiceStore } from "../../../Store/InvoiceStore";
import useDebounce from "../../../Hooks/useDebounce";

const searchCustomer = async (searchParam) => {
	const res = await fetch(
		`https://caribeagencia-backend.vercel.app/api/v1/customers/search/${searchParam}`,
	);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	// Recommendation: handle errors
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}
	const data = await res.json();
	console.log(data, "DATA SEARCH RESULT");
	return data;
};
const useSearchCustomers = (searchParam) => {
	return useQuery(["searchCustomer", searchParam], () => searchCustomer(searchParam), {
		enabled: Boolean(searchParam, 1000),
	});
};

export default function CustomerComboBox() {
	const [query, setQuery] = useState("");
	const debounceValue = useDebounce(query);

	let invoice = InvoiceStore((state) => state.invoice);
	let { data: customers, isError, isLoading } = useSearchCustomers(debounceValue);

	const handleSelect = (customer) => {
		InvoiceStore.setState({ invoice: { customer: customer } });
	};

	isLoading && <div>Loading...</div>;

	return (
		<div className="z-10 w-full  py-4">
			<Combobox value={invoice.customer} onChange={handleSelect}>
				<div className="relative mt-1 ">
					<div className="flex gap-2">
						<div className="relative w-full cursor-default overflow-hidden rounded-lg border bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
							<Combobox.Input
								className="relative w-full border-none py-2 pl-10 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
								displayValue={(selected) =>
									selected
										? `${selected.firstName} ${selected.lastName} - ${selected.mobile}`
										: "  "
								}
								type="search"
								onChange={(event) => setQuery(event.target.value.trim())}
								placeholder="Seleccione un Cliente"
							/>

							<MagnifyingGlassIcon
								className="absolute inset-y-0 left-2 top-2 z-40 h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>

							<Combobox.Button className="absolute inset-y-0 right-0 z-40 flex items-center pr-2">
								<ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</Combobox.Button>
						</div>
					</div>

					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery("")}
					>
						<Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{customers?.length === 0 && query !== "" ? (
								<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
									Cliente No Encontrado.
								</div>
							) : (
								customers?.map((customer) => (
									<Combobox.Option
										key={customer.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-blue-500 text-white" : "text-gray-900"
											}`
										}
										value={customer}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
												>
													{customer?.firstName +
														" " +
														customer?.lastName +
														" - " +
														customer?.mobile}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? "text-white" : "text-blue-600"
														}`}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
}
